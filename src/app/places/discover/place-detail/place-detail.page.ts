import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: false
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  placeDetails!: Place;
  private destroySub!: Subscription;

  constructor(private placesService: PlacesService, private navCtrl: NavController, private activateRoute: ActivatedRoute, private modalCtrl: ModalController, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      const placeId:any = paramMap.get('placeId');
      this.destroySub = this.placesService.getPlaces(placeId).subscribe(places => {
        this.placeDetails = places;
      })
    })

  }

  onBooking() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        { text: 'Select date', handler: () => {
          this.onBookingModal('select');
        } },
        { text: 'Random date', handler: () => {
          this.onBookingModal('random');
        } },
        { text: 'Cancel', role: 'cancel' }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  onBookingModal(mode: 'select' | 'random') {
    console.log('mode:', mode);
    this.modalCtrl.create({ component:CreateBookingComponent, componentProps: { selectedPlace: this.placeDetails, selectedMode: mode } }).then(modEl => {
      modEl.present();
      return modEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data, resultData.role);
      if(resultData.role === 'confirm') {
        console.log('BOOKED!');
      }
    })
  }

  ngOnDestroy(): void {
    if(this.destroySub) {
      this.destroySub.unsubscribe();
    }
  }

}

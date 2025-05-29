import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../places.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
  standalone: false
})
export class OfferBookingsPage implements OnInit, OnDestroy {

  bookingOffers!: Place;
  private destroySub!: Subscription;

  constructor(private placesService: PlacesService, private navCtrl: NavController, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId:any = paramMap.get('placeId');
      // this.bookingOffers = this.placesService.getPlaces(placeId) as Place;
      this.destroySub = this.placesService.getPlaces(placeId).subscribe(places => {
        this.bookingOffers = places;
      });
    })
  }

  ngOnDestroy(): void {
    if(this.destroySub) {
      this.destroySub.unsubscribe();
    }
  }

}

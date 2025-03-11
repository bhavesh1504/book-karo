import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  standalone: false
})
export class EditOfferPage implements OnInit {

  editOffers!: Place;

  constructor(private placesService: PlacesService, private navCtrl: NavController, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
     this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId:any = paramMap.get('placeId');
      this.editOffers = this.placesService.getPlaces(placeId) as Place;
    })
  }

}

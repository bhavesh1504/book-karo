import { Component, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  standalone: false
})
export class EditOfferPage implements OnInit {

  editOffers!: Place;
  editOfferPageForm!: FormGroup

  constructor(private placesService: PlacesService, private navCtrl: NavController, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  ngOnInit() {
     this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId:any = paramMap.get('placeId');
      this.editOffers = this.placesService.getPlaces(placeId) as Place;
      this.editOfferPageForm = this._formBuilder.group ({
        title: [this.editOffers.title, Validators.compose([Validators.required, Validators.maxLength(50)])],
        description: [this.editOffers.description, Validators.compose([Validators.required, Validators.maxLength(180)])],
      })
    });
  }

  onEditOffer() {
    if(!this.editOfferPageForm.valid) {
      return
    }
    else {
      console.log('editOfferForm >> ', this.editOfferPageForm);
    }
  }

}

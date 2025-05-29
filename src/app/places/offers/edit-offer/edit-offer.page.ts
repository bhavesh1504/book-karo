import { Component, OnDestroy, OnInit } from '@angular/core';
import { Place } from '../../places.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
  standalone: false
})
export class EditOfferPage implements OnInit, OnDestroy {

  editOffers!: Place;
  editOfferPageForm!: FormGroup;
  private destroySub!: Subscription;

  constructor(private placesService: PlacesService, private navCtrl: NavController, private activateRoute: ActivatedRoute, private _formBuilder: FormBuilder, private loadingCtrl: LoadingController, private _router: Router) { }

  ngOnInit() {
     this.activateRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      const placeId:any = paramMap.get('placeId');
      // this.editOffers = this.placesService.getPlaces(placeId) as Place;
      this.destroySub = this.placesService.getPlaces(placeId).subscribe(places => {
        this.editOffers = places;
      });
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
      this.loadingCtrl.create({
        message: 'Editing offer.....'
      }).then(loadingEl => {
        loadingEl.present();
        this.placesService.updatePlaces(this.editOffers.id, this.editOfferPageForm.controls['title'].value, this.editOfferPageForm.controls['description'].value).subscribe(() => {
          loadingEl.dismiss();
          this.editOfferPageForm.reset();
      this._router.navigate(['/places/tabs/offers']); 
        });
  } 

    )}

  }

  ngOnDestroy(): void {
    if(this.destroySub) {
      this.destroySub.unsubscribe();
    }
  }

}

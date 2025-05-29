import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
  standalone: false
})
export class OffersPage implements OnInit, OnDestroy {

  loadedOffers!: Place[];
  private destroySub!: Subscription;

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.destroySub = this.placesService.places.subscribe(places => {
      this.loadedOffers = places;
    })
  }

  onEdit(offerId:string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

  ngOnDestroy(): void {
    if(this.destroySub) {
      this.destroySub.unsubscribe();
    }
  }

}

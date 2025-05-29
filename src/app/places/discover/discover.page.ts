import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../places.model';
import { MenuController, SegmentChangeEventDetail } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
  standalone: false
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces!: Place[];
  relevantPlaces!: Place[];
  listedLoadedPlaces!: Place[];
  private destroySub!: Subscription;
  constructor(private placesService: PlacesService, private menuCtrl: MenuController, private _authService: AuthService) { }

  ngOnInit() {
    this.destroySub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    })
    // this.loadedPlaces = this.placesService.places;
    // console.log('_loadedPlaces>> ',this.loadedPlaces);
    
  }

  openSideMenu () {
    this.menuCtrl.toggle();
  }

  onChangeUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
    if(event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
    else {
      this.relevantPlaces = this.loadedPlaces.filter(place => {
        place.userId !== this._authService.userId;
      });
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy(): void {
    if(this.destroySub) {
      this.destroySub.unsubscribe();
    }
  }

}

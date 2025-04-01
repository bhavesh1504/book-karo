import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../places.model';

@Component({
  selector: 'app-offer-items',
  templateUrl: './offer-items.component.html',
  styleUrls: ['./offer-items.component.scss'],
  standalone: false
})
export class OfferItemsComponent  implements OnInit {

  @Input() offers!: Place

  constructor() { }

  ngOnInit() {}

  getDummyDate() {
    return new Date();
  }

}

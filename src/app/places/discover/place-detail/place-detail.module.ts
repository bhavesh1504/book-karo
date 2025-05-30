import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule
  ],
  declarations: [PlaceDetailPage, CreateBookingComponent]
  // entryComponents: [CreateBookingComponent]
})
export class PlaceDetailPageModule {}

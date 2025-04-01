import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Bookings } from './booking.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone: false
})
export class BookingsPage implements OnInit {
  _loadedBookings!: Bookings[];
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this._loadedBookings = this.bookingService.bookings;
  }

  editBookings(bookingId: string, slideBooking: IonItemSliding) {
    slideBooking.close();
  }

}

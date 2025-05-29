import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Place } from '../../places/places.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  standalone: false
})
export class CreateBookingComponent  implements OnInit {

  @Input() selectedPlace!: Place;
  @Input() selectedMode!: 'select' | 'random';
  createBookingForm!: FormGroup;
  startDate: string = '';
  endDate: string = '';

  constructor(private modalCtrl: ModalController, private _formBuilder: FormBuilder) { }

  ngOnInit() {

    const availableFrom = new Date(this.selectedPlace.fromDate);
    const availableTo = new Date(this.selectedPlace.toDate);

    if (this.selectedMode === 'random') {
      this.startDate = new Date(availableFrom.getTime() + Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
      ).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6 * 24 * 60 * 1000 - new Date(this.startDate).getTime())
      ).toISOString();
    }

    console.log(this.startDate,this.endDate)

    this.createBookingForm = this._formBuilder.group ({
      fName: [''],
      lName: [''],
      guestNumber: ['2'],
      fromDate: [this.startDate],
      toDate: [this.endDate]

    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({ message: 'This is a Dummy Message!'}, 'confirm');
  }

}
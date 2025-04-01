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
  createBookingForm!: FormGroup;

  constructor(private modalCtrl: ModalController, private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.createBookingForm = this._formBuilder.group ({
      fName: [''],
      lName: [''],
      guestNumber: ['2'],
      fromDate: [null],
      toDate: [null]

    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({ message: 'This is a Dummy Message!'}, 'confirm');
  }

}
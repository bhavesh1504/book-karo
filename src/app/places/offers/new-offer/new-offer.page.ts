import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
  standalone: false
})
export class NewOfferPage implements OnInit {

  newOfferPageForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.newOfferPageForm = this._formBuilder.group({
      title: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(180)])],
      price: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    })

  }

  onCreateOffer() {
    console.log('newOfferForm >> ', this.newOfferPageForm.controls['title'].valid,
      this.newOfferPageForm.controls['description'].valid,
      this.newOfferPageForm.controls['price'].valid,
      this.newOfferPageForm.controls['fromDate'].valid,
      this.newOfferPageForm.controls['toDate'].valid, this.newOfferPageForm)
      // this.newOfferPageForm.controls['title'].valid
  }

}

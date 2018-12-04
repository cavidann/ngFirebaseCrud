import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, ValidationErrors } from '@angular/forms';
import { CustomValidation } from '../classes/custom.validations';

@Component({
  selector: 'app-new-user-reactive',
  templateUrl: './new-user-reactive.component.html',
  styleUrls: ['./new-user-reactive.component.scss']
})
export class NewUserReactiveComponent implements OnInit {

  userForm: FormGroup;
  get name() {
    return this.userForm.get('name');
  }
  get username() {
    return this.userForm.get('username');
  }

  constructor() { }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl('John Doe', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('John Doe')
      ]),
      username: new FormControl('johndoe', null, CustomValidation.asyncUnique),
      email: new FormControl('john.doe@example.com'),
      phone: new FormControl('1234567890'),
      website: new FormControl('john.com'),

      address: new FormGroup({
        street: new FormControl('123 NE st'),
        suite: new FormControl('Suite 1400'),
        city: new FormControl('Bellevue'),
        zipcode: new FormControl('98004'),
        geo: new FormGroup({
          lat: new FormControl('122.32434'),
          lang: new FormControl('-12321.234')
        }),
      }),

      company: new FormGroup({
        name: new FormControl('Beatiful Destinations'),
        catchPrase: new FormControl('See world differently'),
        bs: new FormControl('About this company')
      }),
      hobbies: new FormArray([])
    });
  }

  addHobby() {
    (<FormArray>this.userForm.get('hobbies')).push(new FormControl(''));
  }


  deleteHobby(index) {
    (<FormArray>this.userForm.get('hobbies')).removeAt(index);

  }

  resetForm() {
    this.userForm.reset();
  }

  submit() {}
}

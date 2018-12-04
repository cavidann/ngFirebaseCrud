import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { NgForm } from '@angular/forms';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  communicationModes: string [];
  genders: string[];
  userList: IUser[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.genders = ['Male', 'Female', 'Other'];
    this.communicationModes = ['Phone', 'Mail'];
  }

  submit(userForm: NgForm) {
    console.log(userForm);
    // this.userService.addUserToFirebase(userForm.value);
    this.userService.addUserToFirebase(userForm.value);
  }

  getUsers() {
    this.userService.getUsersFromFirebase().snapshotChanges().forEach(usersSnapshot => {
      this.userList = [];
      usersSnapshot.forEach(userSnapshot => {
        const user = userSnapshot.payload.toJSON();
        user['$key'] = userSnapshot.key;
        this.userList.push(user as IUser);
      });
    });
  }

  updateUser(userForm: NgForm) {
    this.userList[1].name = userForm.value.name;
    this.userService.updateAUserOnFirebase(this.userList[1]);
  }

  deleteUser() {
    this.userService.deleteUserFromFirebase(this.userList[1].$key);
  }
}

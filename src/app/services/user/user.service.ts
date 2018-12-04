import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) {
    this.userList = this.firebase.list('users');
  }

  getUsersFromFirebase () {
    return this.userList;
  }

  addUserToFirebase (user) {
    this.userList.push(user);
  }

  updateAUserOnFirebase(user: IUser) {
    const $key = user.$key;
    delete user.$key;
    this.userList.update($key, user);
  }

  deleteUserFromFirebase($key: string) {
    this.userList.remove($key);
  }

}

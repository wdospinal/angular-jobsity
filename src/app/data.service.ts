import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userSource = new BehaviorSubject<User>(new User('', '', '', ''));
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: User) {
    this.userSource.next(user)
  }

}
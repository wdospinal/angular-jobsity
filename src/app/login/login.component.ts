import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenProfileValidator } from '../forbidden-profile.directive';
import { UserService } from '../user.service';
import { User } from '../user';
import { DataService } from "../data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fail = { show: false, name: '' };
  maxDate: Date = new Date();
  loginForm: FormGroup;
  user:User;

  constructor(private data: DataService, private userService: UserService) { }

  newUser(user: User) {
    this.data.changeUser(user)
  }

  ngOnInit(): void {
    this.data.currentUser.subscribe(user => this.user = user)
    
    this.loginForm = new FormGroup({
      'name': new FormControl(this.user.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      'email': new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      'profile': new FormControl(this.user.profile, [
        Validators.required,
        forbiddenProfileValidator(['user', 'admin']),
      ]),
      'dni': new FormControl(this.user.dni, [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern("^[0-9]*$"),
      ]),
    });
  }

  login(): void {
    const { name, email, profile, dni } = this.loginForm.value;
    const user = new User(dni, name, profile, email);
    console.log(user)
    this.fail = { show: false, name: '' };
    this.newUser(user);
    this.userService.addUser(user)
      .subscribe(
        data => {
          console.log(data);
          return true;
        },
        error => {
          const { status } = error;
          if (status === 200) {
            this.fail = { show: false, name };
          } else {
            this.fail = { show: true, name: '' };
          }
        }
      );
  }

  get name() { return this.loginForm.get('name'); }
  get dni() { return this.loginForm.get('dni'); }
  get email() { return this.loginForm.get('email'); }
  get profile() { return this.loginForm.get('profile'); }

}

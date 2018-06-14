import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input('message') message: Message;
  @Input('user') user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.message);
  }

  delete(): void {
    const { id } = this.message;
    this.userService.deleteMessage(id)
      .subscribe(
        data => {
          console.log(data);
          return true;
        },
        error => {
          const { status } = error;
          console.error(error);
        }
      );
  }
}

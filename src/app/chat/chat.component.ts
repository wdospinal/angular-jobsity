import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { DataService } from "../data.service";
import { User } from '../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private data: DataService, private userService: UserService) { }
  messages: any;
  user: User;

  getMessages(): void {
    const { dni } = this.user;
    const limit = 2;
    this.userService.getChat(limit, dni)
      .subscribe(
        data => {
          console.log(data);
          this.messages = data;
          return true;
        },
        error => {
          const { status } = error;
          console.error(status + error);
        }
      );
  }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user)
    this.getMessages();
  }

  send(event: any): void {
    const newMessage = event.target.value;
    const messageObject = { dni: this.user.dni, message: newMessage, name: this.user.name };
    this.userService.sendMessage(messageObject)
      .subscribe(
        data => {
          console.log(data);
          this.messages.push(data);
          return true;
        },
        error => {
          const { status } = error;
          if (status === 200) {
            console.log(error);
            this.messages.push(messageObject);            
          } else {
            console.error(error);
            console.log(status);
          }
        }
      );
  }
}

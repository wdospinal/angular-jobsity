import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Message } from './message';
import { Response } from './response';
import { Observable, of } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverUrl = 'https://us-central1-jobsity-api.cloudfunctions.net/';
  userPath = 'user/';
  chatPath = 'chat/';
  messagePath = 'messages/';
  constructor(private http: HttpClient) { }

  addUser(user: User) {
    const body = JSON.stringify(user);
    const url = `${this.serverUrl}${this.userPath}`;
    return this.http.post(url, body, httpOptions);
  }

  getUser(): Observable<User> {
    const url = `${this.serverUrl}${this.userPath}`;
    return this.http.get<User>(url, httpOptions);
  }

  getChat(limit, dni): Observable<Object> {
    const url = `${this.serverUrl}${this.chatPath}`;
    return this.http.get(url, { params: { limit, dni } });
  }

  deleteMessage(id: string) {
    const body = JSON.stringify(id);
    const url = `${this.serverUrl}${this.userPath}`;
    return this.http.delete(url, { params: { id } });
  }

  sendMessage({ dni, message, name }): Observable<string> {
    const body = JSON.stringify({ dni, message, name });
    const url = `${this.serverUrl}${this.messagePath}`;
    return this.http.post<string>(url, body, httpOptions);
  }
}
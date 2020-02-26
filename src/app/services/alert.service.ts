import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public messages: Alert[] = [];

  constructor() { }

  add(notification: Alert) {
    this.messages.push(notification);
  }

  clear() {
    this.messages = [];
  }

  removeFirst() {
    this.messages.splice(0, 1);
  }

}

export class Alert {

  public message: string;
  public status: Status;

  constructor(message: string, status: Status) {
    this.message = message;
    this.status = status;
  }

}

export enum Status {
  SUCCESS,
  DANGER,
}
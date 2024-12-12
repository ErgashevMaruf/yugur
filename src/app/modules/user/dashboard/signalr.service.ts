import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor() { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://yugurbot.devel.uz/chathub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addReceiveMessageListener() {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      console.log(user + ' ' + message);
    });
  }

  public sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }
}

import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { EnvService } from 'services/env.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(
    private envService: EnvService
  ) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.envService.API_URL + '/notifyHub')
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.receiveMessage();
  }
  sendMessage() {
    this.hubConnection.send("sendMessage", 'username', 'test');
  }
  private receiveMessage = () => {
    this.hubConnection.on('receiveMessage', (user: string, message: string) => {
      alert(user + '  ' + message);
    });
  }
  getConnectionStatus = (): any => {
    return this.hubConnection.state;
  }
}

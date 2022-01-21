import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IMessage } from 'interfaces/inon-manage';
import { EnvService } from 'services/env.service';

import { JwtService } from '../auth/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(
    private envService: EnvService,
    private jwtService: JwtService
  ) { }

  public startConnection = () => {
    const authToken = { accessTokenFactory: () => this.jwtService.getAuthorizationToken() };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.envService.API_URL + ENInterfaces.signalRStartConnection, authToken)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.receiveMessage();
  }
  sendSimpleMessage = () => {
    this.hubConnection.send("sendMessage", 'username', 'test');
  }
  sendBroadcastMessage = (method: ENInterfaces, data: IMessage) => {
    this.hubConnection.send(method, data);
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

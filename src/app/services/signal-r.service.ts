import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IMessage } from 'interfaces/inon-manage';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { InteractionService } from 'services/interaction.service';
import { ILatestReads } from 'src/app/Interfaces/imoment';

import { JwtService } from '../auth/jwt.service';
import { SnackWrapperService } from './snack-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(
    private envService: EnvService,
    private jwtService: JwtService,
    private snackBarService: SnackWrapperService,
    private interactionService: InteractionService
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
    this.broadcastMessage();
    this.momentAddReadingRow();
  }
  public disconnectConnection = () => {
    this.hubConnection.stop();
  }
  sendSimpleMessage = () => {
    this.hubConnection.send(ENInterfaces.signalRSendMessage, 'username', 'test');
  }
  sendBroadcastMessage = (method: ENInterfaces, data: IMessage) => {
    this.hubConnection.send(method, data.time, data.title, data.message, data.color);
  }
  reconnectManualy = async () => {
    try {
      await this.hubConnection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log(err);
    }
  }
  private receiveMessage = () => {
    this.hubConnection.on(ENInterfaces.signalRReceiveMessage, (user: string, message: string) => {
      this.snackBarService.openSnackBarSignal(user + '   ' + message, ENSnackBarTimes.tenMili);
    });
  }
  private broadcastMessage = () => {
    this.hubConnection.on(ENInterfaces.signalRBroadcastMessage, (time: number, title: string, message: string, color: ENSnackBarColors) => {
      this.snackBarService.openSnackBarSignal(title + '\n' + message, time, color);
    });
  }
  private momentAddReadingRow = () => {
    this.hubConnection.on(ENInterfaces.signalRMomentSystemAddReadingRow, (r: ILatestReads) => {
      this.interactionService.startLoading(r);
    })
  }
  getConnectionStatus = (): any => {
    return this.hubConnection.state;
  }
}

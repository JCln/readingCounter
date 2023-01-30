import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IMessage } from 'interfaces/inon-manage';
import { ENSnackBarTimes } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { ILatestReads } from 'src/app/interfaces/imoment';

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
    private interactionService: InteractionService,
    private interfaceManagerService: InterfaceManagerService
  ) { }

  public startConnection = () => {
    const authToken = { accessTokenFactory: () => this.jwtService.getAuthorizationToken() };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.envService.API_URL + ENInterfaces.signalRStartConnection, authToken)
      .withAutomaticReconnect()
      // .configureLogging(signalR.LogLevel.Information)
      // .configureLogging(signalR.LogLevel.Debug)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    console.log(1);
    this.receiveMessage();
    this.receiveTextWithTimer();
    this.ReceiveDirectMessage();
    this.momentAddReadingRow();
  }
  public disconnectConnection = () => {
    this.hubConnection.stop();
  }
  sendSimpleMessage = () => {
    this.hubConnection.send(ENInterfaces.signalRSendMessage, 'username', 'test');
  }
  sendBroadcastMessage = (method: ENInterfaces, val: IMessage) => {
    const a = { seconds: val.seconds, title: val.title, text: val.message, color: val.color };
    return new Promise(() => {
      this.interfaceManagerService.POSTBODY(method, a).toPromise();
    });
  }
  reconnectManualy = async () => {
    try {
      await this.hubConnection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.log(err);
    }
  }
  /* TODO:
  Implement Call server our Methods
*/
  private receiveMessage = () => {
    this.hubConnection.on(ENInterfaces.signalRReceiveMessage, (user: string, message: string) => {
      this.snackBarService.openSnackBarSignal(user + '   ' + message, ENSnackBarTimes.tenMili);
    });
  }
  receiveTextWithTimer = () => {
    this.hubConnection.on(ENInterfaces.receiveTextWithTimer, (a: IMessage) => {
      this.snackBarService.openSnackBarSignal(a.title + '\n' + a.text, a.seconds, a.color);
    });
  }
  ReceiveDirectMessage = () => {
    this.hubConnection.on(ENInterfaces.ReceiveDirectMessage, (a: IMessage) => {
      this.snackBarService.openToastSignal(a);
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
// To Send Data to Server ACross WebSocket
  // sendBroadcastMessage = (method: ENInterfaces, data: IMessage) => {
  //   this.hubConnection.send(method, data.time, data.title, data.message, data.color);
  // }

  // private broadcastMessage = () => {
  //   this.hubConnection.on(ENInterfaces.signalRBroadcastMessage, (time: number, title: string, message: string, color: ENSnackBarColors) => {
  //     this.snackBarService.openSnackBarSignal(title + '\n' + message, time, color);
  //   });
  // }
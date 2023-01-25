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

    this.receiveMessage();
    // this.broadcastMessage();
    this.receiveTextWithTimer();
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
    // this.hubConnection.send(method, { seconds: val.time, title: val.title, text: val.message, color: val.color });
  }
  // sendBroadcastMessage = (method: ENInterfaces, data: IMessage) => {
  //   this.hubConnection.send(method, data.time, data.title, data.message, data.color);
  // }
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
  /* TODO:
    Implement Call server our Methods
  */
  // private broadcastMessage = () => {
  //   this.hubConnection.on(ENInterfaces.signalRBroadcastMessage, (time: number, title: string, message: string, color: ENSnackBarColors) => {
  //     this.snackBarService.openSnackBarSignal(title + '\n' + message, time, color);
  //   });
  // }
  receiveTextWithTimer = () => {
    this.hubConnection.on('receiveTextWithTimer', (a: IMessage) => {
      this.snackBarService.openSnackBarSignal(a.title + '\n' + a.text, a.seconds, a.color);
    });

    // this.hubConnection.on(ENInterfaces.signalRBroadcastMessage, (time: number, title: string, message: string, color: ENSnackBarColors) => {
    //   this.snackBarService.openSnackBarSignal(title + '\n' + message, time, color);
    // });
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

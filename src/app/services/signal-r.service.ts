import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IMessage } from 'interfaces/inon-manage';
import { ENSnackBarTimes } from 'interfaces/ioverall-config';
import { EnvService } from 'services/env.service';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { ILatestReads } from 'interfaces/imoment';

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
    this.receiveTextWithTimer();
    this.ReceiveDirectMessage();
    this.receiveImageWithCaptionMessage();
    this.receiveVideoWithCaptionMessage();
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
  getConnectionStatus = (): any => {
    return this.hubConnection.state;
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
  private receiveTextWithTimer = () => {
    this.hubConnection.on(ENInterfaces.receiveTextWithTimer, (a: IMessage) => {
      const toast = {
        severity: a.color,
        summary: a.title,
        detail: a.text,
        icon: 'pi pi-info',
        key: 'text',
        life: a.seconds
      }
      this.snackBarService.openToastSignal(toast);
    });
  }
  private ReceiveDirectMessage = () => {
    this.hubConnection.on(ENInterfaces.ReceiveDirectMessage, (a: any) => {
      const custom = {
        severity: a.color,
        summary: a.title,
        detail: a.text,
        sticky: true,
        icon: 'pi pi-envelope',
        key: 'text'
      }
      this.snackBarService.openToastSignal(custom);
    });
  }
  private receiveImageWithCaptionMessage = () => {
    this.hubConnection.on(ENInterfaces.ReceiveImageWithCaption, (a: any) => {
      const custom = {
        severity: 'info',
        summary: 'تصویری از',
        detail: '',
        sticky: true,
        icon: 'pi pi-image',
        key: 'imageOrVideo',
        fileRepositoryId: a.fileRepositoryId,
        sender: a.sender,
        caption: a.caption,
        clickName: 'openImgDialog'
      }
      this.snackBarService.openToastSignal(custom);
    });
  }
  private receiveVideoWithCaptionMessage = () => {
    this.hubConnection.on(ENInterfaces.ReceiveVideoWithCaption, (a: any) => {
      const custom = {
        severity: 'info',
        summary: 'ویدیویی از',
        detail: '',
        sticky: true,
        icon: 'pi pi-video',
        key: 'imageOrVideo',
        fileRepositoryId: a.fileRepositoryId,
        sender: a.sender,
        caption: a.caption,
        clickName: 'openVideoDialog'
      }
      this.snackBarService.openToastSignal(custom);
    });
  }

  private momentAddReadingRow = () => {
    this.hubConnection.on(ENInterfaces.signalRMomentSystemAddReadingRow, (r: ILatestReads) => {
      this.interactionService.startLoading(r);
    })
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
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IMessage } from 'interfaces/inon-manage';
import { InteractionService } from 'services/interaction.service';
import { NotificationMediaTypeIds } from 'interfaces/build';
import { ENHubMessages, ENSnackBarTimes, ENToastColors, EN_messages } from 'interfaces/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private readonly retryTimes: number[] = [2, 4, 8, 16];

  constructor(
    public utilsService: UtilsService,
    private interactionService: InteractionService,
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  hideSpinnersAndRefreshPage() {
    this.utilsService.spinnerWrapperService.stopAll();
    const url = this.utilsService.compositeService.getRouterUrl();
    this.interactionService.setRefresh(url);
  }
  private onReconnecting() {
    this.hubConnection.onreconnecting(error => {
      console.log('try to reconnect...');
      const toast = {
        summary: EN_messages.networkError,
        severity: ENToastColors.warn,
        detail: 'درحال اتصال مجدد..',
        icon: 'pi pi-info',
        key: 'text',
        sticky: false,
        hasReadMore: true
      }
      this.utilsService.snackWrapperService.openToastSignal(toast);
    })
  }
  private onReConnected() {
    this.hubConnection.onreconnected(connected => {
      console.log('we are connected');
      this.hideSpinnersAndRefreshPage();
      const toast = {
        severity: ENToastColors.success,
        summary: 'ارتباط با شبکه برقرار شد',
        detail: '',
        icon: 'pi pi-info',
        key: 'text',
        sticky: false,
        hasReadMore: true
      }
      this.utilsService.snackWrapperService.openToastSignal(toast);
    })
  }
  private disconnected() {
    this.hubConnection.onclose(disconnected => {
      this.hideSpinnersAndRefreshPage();
      const toast = {
        severity: ENToastColors.warn,
        summary: ENHubMessages.toastDisconnected,
        icon: 'pi pi-info',
        key: 'text',
        sticky: false,
        hasReadMore: true
      }
      this.utilsService.snackWrapperService.openToastSignal(toast);
    })
  }
  public startConnection = () => {
    const authToken = { accessTokenFactory: () => this.utilsService.compositeService.jwtService.getAccessToken() };
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.utilsService.envService.API_URL + ENInterfaces.signalRStartConnection, authToken)
      .withAutomaticReconnect(this.retryTimes)
      // .configureLogging(signalR.L82ogLevel.Information)
      // .configureLogging(signalR.LogLevel.Debug)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.onReconnecting();
    this.onReConnected();
    this.disconnected();

    this.receiveMessage();
    this.receiveTextWithTimer();
    this.ReceiveDirectMessage();
    this.receiveImageWithCaptionMessage();
    this.receiveVideoWithCaptionMessage();
    this.momentAddReadingRow();
    this.receiveNotificationUnreadCount();
  }
  public disconnectConnection = () => {
    this.hubConnection.stop();
  }
  sendSimpleMessage = () => {
    this.hubConnection.send(ENInterfaces.signalRSendMessage, 'username', 'test');
  }
  sendBroadcastMessage = (method: ENInterfaces, val: IMessage) => {
    const a = { seconds: val.seconds, title: val.title, text: val.message, color: val.color };
    return this.ajaxReqWrapperService.postDataSourceByObject(method, a);
  }
  getConnectionStatus = (): any => {
    return this.hubConnection.state;
  }
  reconnectManualy = async () => {
    try {
      await this.hubConnection.start();
      console.log("SignalR Connected.");
      this.hideSpinnersAndRefreshPage();
    } catch (err) {
      console.log(err);
    }
  }
  /* TODO:
  Implement Call server our Methods
*/
  private receiveMessage = () => {
    this.hubConnection.on(ENInterfaces.signalRReceiveMessage, (user: string, message: string) => {
      this.utilsService.snackWrapperService.openSnackBarSignal(user + '   ' + message, ENSnackBarTimes.tenMili);
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
      this.utilsService.snackWrapperService.openToastSignal(toast);
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
        key: 'text',
        clickName: NotificationMediaTypeIds.text
      }
      this.utilsService.snackWrapperService.openToastSignal(custom);
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
        clickName: NotificationMediaTypeIds.image
      }
      this.utilsService.snackWrapperService.openToastSignal(custom);
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
        clickName: NotificationMediaTypeIds.video
      }
      this.utilsService.snackWrapperService.openToastSignal(custom);
    });
  }
  private receiveNotificationUnreadCount = () => {
    this.hubConnection.on(ENInterfaces.receiveNotificationUnreadCount, (a: any) => {
      console.log(a);
    })
  }

  private momentAddReadingRow = () => {
    this.hubConnection.on(ENInterfaces.signalRMomentSystemAddReadingRow, (r) => {
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
//     this.utilsService.snackWrapperService.openSnackBarSignal(title + '\n' + message, time, color);
//   });
// }
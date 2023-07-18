import { EN_messages } from 'interfaces/enums.enum';
import { ENClientServerErrors, ENManageServers, IManageServer, IManageServerErrors } from 'interfaces/iserver-manager';

export const serverTasts: IManageServer[] = [

    { name: 'ریست IIS', clickFunction: ENManageServers.resetIIS, icon: 'fa fa-repeat', background: '#F68038', color: '', description: EN_messages.confirmResetIIS },
    { name: 'ریست اپلیکیشن', clickFunction: ENManageServers.resetApp, icon: 'fa fa-desktop', background: '#969696', color: '', description: EN_messages.confirmResetApp },
    { name: 'حذف خطاها', clickFunction: ENManageServers.serverDelete, icon: 'fa fa-eraser', background: '#006c75', color: '', description: EN_messages.confirmServerDelete },
    { name: 'آفلاین کردن اَپ', clickFunction: ENManageServers.offlineTheAPP, icon: 'fa fa-stop-circle', background: '#0057a2', color: '', description: EN_messages.confirmOfflineApp },
    { name: 'Health', clickFunction: ENManageServers.linkToHealthCheck, icon: 'fas fa-hand-holding-heart', background: '#582940', color: '' },
    { name: 'Jobs', clickFunction: ENManageServers.linkToHangfire, icon: 'fa fa-tasks', background: '#4b8c38', color: '' },
    { name: 'افزایش زمان', clickFunction: ENManageServers.extendLicenseTime, icon: 'fas fa-expand-arrows-alt', background: '#3c79f5', color: '', description: EN_messages.confirmExtendLicenseTime },
    { name: 'کاهش زمان', clickFunction: ENManageServers.compressLicenseTime, icon: 'fas fa-compress-arrows-alt', background: '#431866', color: '', description: EN_messages.compressExpireLicense },
    { name: 'پایان زمان', clickFunction: ENManageServers.expireLicense, icon: 'pi pi-stopwatch', background: '#f63e38', color: '', description: EN_messages.confirmExpireLicense },
    { name: 'اعتبار سنجی', clickFunction: ENManageServers.checkAuthenticiy, icon: 'pi pi-check-square', background: '#914900', color: '', description: EN_messages.checkAuthenticity },
]
export const serverErrors: IManageServerErrors[] = [
    { name: 'خطای 400', errorType: ENClientServerErrors.cs400 },
    { name: 'خطای 401', errorType: ENClientServerErrors.cs401 },
    { name: 'خطای 403', errorType: ENClientServerErrors.cs403 },
    { name: 'خطای 404', errorType: ENClientServerErrors.cs404 },
    { name: 'خطای 405', errorType: ENClientServerErrors.cs405 },
    { name: 'خطای 408', errorType: ENClientServerErrors.cs408 },
    { name: 'خطای 409', errorType: ENClientServerErrors.cs409 },
    { name: 'خطای 410', errorType: ENClientServerErrors.cs410 },
    { name: 'خطای 422', errorType: ENClientServerErrors.cs422 },
    { name: 'خطای 0', errorType: ENClientServerErrors.cs0 },
    { name: 'خطای 500', errorType: ENClientServerErrors.cs500 },
    { name: 'خطای 501', errorType: ENClientServerErrors.cs501 },
    { name: 'خطای 502', errorType: ENClientServerErrors.cs502 },
    { name: 'خطای 504', errorType: ENClientServerErrors.cs504 },
]
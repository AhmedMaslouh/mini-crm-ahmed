import {SettingsService} from "../../core/settings/settings.service";
import {Router} from "@angular/router";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {ServiceLocator} from "../../core/service-locator";
import "rxjs/add/operator/catch";

const swalConst = require('sweetalert2');

export abstract class BaseComponent {
  protected settings: SettingsService;
  protected router: Router;
  protected toasterService: ToasterService;
  protected toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true,
    mouseoverTimerStop: false,
    timeout: 5000
  });
  protected swal: any = swalConst;

  constructor() {
    this.toasterService = ServiceLocator.injector.get(ToasterService);
    this.router = ServiceLocator.injector.get(Router);
  }

  protected showError(error: any) {
    let status = error.status;
    switch (status) {
      case 500:
        this.toasterService.pop('error', 'Erreur 500', 'Merci de réessayer plus tard');
        break;
      case 401:
        this.toasterService.pop('error', 'Erreur 401', 'Merci de réessayer plus tard');
        break;
      default:
        this.showErrorToast('Merci de réessayer plus tard');
    }
  }

  protected showInfo(info: string | any) {
    this.toasterService.pop('success', 'Information', info);
  }

  protected showSwalError(info: string | any) {
    this.swal("Erreur ! ...", info, "error");
  }

  protected showWarning(info: string | any) {
    this.swal("Attention ! ...", info, "warning");
  }

  protected showErrorToast(info: string | any) {
    this.toasterService.pop('error', 'Erreur', info);
  }

  protected goBackHome() {
    this.router.navigate(['/']);
  }

}

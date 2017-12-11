import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactDetailComponent} from './contact-detail.component';
import {ProgressService} from '../../../core/services/progress.service';
import {ValidateService} from '../../../core/services/validate.service';

@Component({
  selector: 'dk-contact-detail-route',
  template: '<router-outlet></router-outlet>',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class ContactDetailRouteComponent {

  constructor(route: ActivatedRoute, router: Router, progressService: ProgressService, dialog: MatDialog,
              validate: ValidateService) {

    const id = route.snapshot.params.id;
    if (!id || !validate.guid(id)) {
      return;
    }

    route.data.subscribe(data => {
      progressService.hideProgressBar();
      const config = <MatDialogConfig> {
        data: {contact: data.contact},
        width: '300px',
        backdropClass: 'bg-modal-backdrop'
      }
      dialog.open(ContactDetailComponent, config)
        .afterClosed()
        .subscribe(result => {
          // dankfix: update contact list with new value??
          router.navigateByUrl('/');
        });
    });

  }

}

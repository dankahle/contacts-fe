import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ContactDetailComponent} from './contact-detail.component';
import {ProgressService} from '../../../core/services/progress.service';
import {ValidateService} from '../../../core/services/validate.service';


/**
 * ContactDetailRouteComponent
 * @desc - no longer used, initially you were putting up contact detail dialog on route change: /:contactId
 * so needed a router component for the router to create, that then put up the dialog.
 */
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
      };
      dialog.open(ContactDetailComponent, config)
        .afterClosed()
        .subscribe(result => {
          router.navigateByUrl('/');
        });
    });

  }

}

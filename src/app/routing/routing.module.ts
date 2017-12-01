import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from '../shared/components/page-not-found/page-not-found.component';
import {InitializationGuard} from './guards/initialization.guard';
import {AuthGuard} from './guards/auth.guard';
import {ContactListComponent} from '../contacts-page/main/contact-list/contact-list.component';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: ContactListComponent, canActivate: [AuthGuard, InitializationGuard]},
  { path: ':id', component: ContactListComponent, canActivate: [AuthGuard, InitializationGuard]},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  providers: []
})
export class RoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageNotFoundComponent} from '../shared/components/page-not-found/page-not-found.component';
import {InitializationGuard} from './guards/initialization.guard';
import {AuthGuard} from './guards/auth.guard';
import {ContactListComponent} from '../contacts/main/contact-list/contact-list.component';
import {RouterModule, Routes} from '@angular/router';
import {ContactListResolve} from './resolves/contact-list.resolve';

const appRoutes: Routes = [
  { path: '', component: ContactListComponent, canActivate: [AuthGuard, InitializationGuard], resolve: {contacts: ContactListResolve}},
  { path: ':id', component: ContactListComponent, canActivate: [AuthGuard, InitializationGuard], resolve: {contacts: ContactListResolve}},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
  ],
  providers: [ContactListResolve]
})
export class RoutingModule { }

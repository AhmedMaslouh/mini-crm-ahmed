import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {ContactComponent} from "./contact-list/contact-list.component";
import {ContactService} from "../api/rest/contact.service";
import {ApiModule} from "../api/api.module";
import {ContactFormComponent} from "./contact-form/contact-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard'},
  {path: 'list', component: ContactComponent},
  {path: 'new', component: ContactFormComponent},
  { path: ':id/edit', component: ContactFormComponent},

];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ApiModule,
  ],
  declarations: [
    ContactComponent,
    ContactFormComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ContactService
  ]

})
export class ContactModule {
}

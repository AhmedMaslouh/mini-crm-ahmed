import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
  { path: 'login', component: LoginComponent }
  
  
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    RouterModule,
    LoginComponent
  ],
  providers: []
})
export class LoginModule {
}

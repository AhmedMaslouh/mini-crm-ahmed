import {LayoutComponent} from "./layout/layout.component";

import {AuthGuardService} from "./api/guards/auth-guard.service";

export const routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivate: [AuthGuardService], loadChildren: './home/home.module#HomeModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'contact' , canActivate: [AuthGuardService], loadChildren: './contacts/contact.module#ContactModule' },
    ]
  },

  // Not lazy-loaded routes

  // Not found
  { path: '**', redirectTo: 'home' }

];

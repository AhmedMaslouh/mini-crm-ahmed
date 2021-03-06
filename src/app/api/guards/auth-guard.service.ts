import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {JwtHelper} from "angular2-jwt";

@Injectable()
export class AuthGuardService implements CanActivate{

  public token: string;
  public jwtHelper: JwtHelper = new JwtHelper();

  constructor(private router: Router) {}

  canActivate() {
    const token = sessionStorage.getItem('token');
    if (token) {
      console.log(this.jwtHelper.isTokenExpired(token));
      if (this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}

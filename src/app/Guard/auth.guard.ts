import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root' 
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
     private router: Router,
     private message: NzMessageService) {}
canActivate(): boolean {
  if (this.authService.isLoggedIn() && !this.authService.isTokenExpired()) {
    return true;
  } else {
    this.authService.logout(); 
    this.router.navigate(['/login']);
    return false;
  }
}

}
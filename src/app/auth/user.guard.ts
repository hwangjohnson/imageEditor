import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { isAuth } from '../service/auth';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = isAuth();
    if (role && role === 'user') {
      return true;
    }
    this.router.navigateByUrl('/signin');
    localStorage.removeItem('token');
    return false;
  }
}

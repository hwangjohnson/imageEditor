import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { isAuth } from '../service/auth';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = isAuth();
    if (role && role === 'admin') {
      return true;
    }
    this.router.navigateByUrl('/admin/login');
    localStorage.removeItem('token');
    return false;
  }
}

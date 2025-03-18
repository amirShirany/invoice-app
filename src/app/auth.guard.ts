import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.checkUserLogin(); // بررسی وضعیت کاربر

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // اگر کاربر وارد نشده باشد، به صفحه ورود هدایت شود
      return false;
    }

    return true; // دسترسی به مسیر داده شود
  }

  private checkUserLogin(): boolean {
    // اینجا بررسی کنید که آیا کاربر وارد شده است یا خیر
    return !!localStorage.getItem('user'); // مثال ساده با استفاده از localStorage
  }
}

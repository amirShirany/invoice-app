import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://api.example.com/auth/login'; // آدرس API واقعی

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.apiUrl, { email, password }).pipe(
      catchError((err) => {
        return throwError(() => new Error('خطا در ارتباط با سرور'));
      })
    );
  }
}

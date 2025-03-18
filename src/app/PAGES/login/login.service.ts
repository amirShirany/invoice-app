import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (username == 'amirhossein@gmail.com' && password == '123456') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styles: ` img {
    border-radius : 50%
  } `,
  styleUrls: ['./login.page.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  @Input()
  username: string = null;

  @Output()
  Submit: EventEmitter<any> = new EventEmitter();

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('اطلاعات غلط وارد شده!');
      return;
    }
    this.Submit.emit({
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const token = 'user-auth-token'; // فرض کنید از سرور توکن معتبر دریافت کرده‌اید

      this._loginService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .then((res) => {
          // ذخیره اطلاعات کاربر در localStorage
          localStorage.setItem(
            'user',
            JSON.stringify({ email, password, token })
          );
          console.log('Login successful:', res);
          this.router.navigate(['/invoice']);
          alert('با موفقیت وارد شدید');
        })

        .catch((err) => {
          console.error('Login error:', err);
          alert('لطفاً اطلاعات فرم را به درستی وارد کنید!');
        });
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.loginForm.patchValue({
      password: '',
    });
  }
}

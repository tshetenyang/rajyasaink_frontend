import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { MaterialModule } from '../../mat-element';
import { CommonService } from '../shared_service/common.service';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  username!: string;
  password!: string;
  captcha: any = { key: '', image_url: '' };
  captchaimage: any = { image_url: '' };
  captchaValid: boolean = false;
  testdata: any;


  constructor(private fb: FormBuilder, private router: Router, private toaster: ToastrService, private authService: CommonService) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      captcha_response: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCaptcha();
  }

  loadCaptcha(): void {
    this.authService.getCaptcha().subscribe((response: HttpResponse<any>) => {
      this.captcha = response;
      this.captchaimage = `http://127.0.0.1:8000${response.body.image_url}`;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      const loginData = {
        email: formData.username,
        password: formData.password,
        hashkey: this.captcha.body.key,
        response: this.form.get('captcha_response')?.value
      };
      this.authService.login(loginData).subscribe(
        response => {
          const userRole = response.response.role;
          if (userRole) {
            switch (userRole) {
              case 1:
                this.router.navigate(['/admin']);
                break;
              case 2:
                this.router.navigate(['/manager']);
                break;
              case 3:
                this.router.navigate(['/employee']);
                break;
              default:
                // Handle unknown role
                this.router.navigate(['/']);
                break;
            }
          }

        },
        error => {
          console.error('Login error:', error);
          this.toaster.error('Invalid Credentials');
          this.loadCaptcha();
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}

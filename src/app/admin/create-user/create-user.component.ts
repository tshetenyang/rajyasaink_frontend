
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin-service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  userForm: FormGroup;

  roles = [
    { value: 1, viewValue: 'Admin' },
    { value: 2, viewValue: 'Manager' },
    { value: 3, viewValue: 'Employee' }
  ];

  constructor(private fb: FormBuilder, private adminService: AdminService, private toastr: ToastrService,) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void { }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value
      ? null : { mismatch: true };
  }

  onSubmit() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once Submitted, Cannot modified',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((submit: any) => {
      if (submit.isConfirmed) {

        if (this.userForm.valid) {
          this.adminService.createuser(this.userForm.value).subscribe(
            response => {
              this.toastr.success('User created sucessfully ');
              this.userForm.reset();
            },
            error => {
              this.toastr.error('User Creation  Error');
            }
          );

        }
      }
    }
    );
  }
}

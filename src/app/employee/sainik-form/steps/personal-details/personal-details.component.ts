import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../mat-element';
import { EmployeeService } from '../../../employee-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  districts: any[] = [];
  isLoading = true;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.get_districts();
    this.setupExpiryDateLogic();
  }

   get_districts(): void {
    this.isLoading = true;
    this.employeeService.getDistricts().subscribe(districts => {
      this.districts = districts; 
    });
  }
      

  setupExpiryDateLogic(): void {
    const isAliveControl = this.formGroup.get('is_alive');
    const expiryDateControl = this.formGroup.get('expiry_date');

    if (isAliveControl && expiryDateControl) {
      isAliveControl.valueChanges.subscribe(isAlive => {
        if (isAlive) {
          expiryDateControl.disable();
          expiryDateControl.reset();
        } else {
          expiryDateControl.enable();
        }
      });

      // Initialize state
      if (isAliveControl.value) {
        expiryDateControl.disable();
      }
    }
  }
}
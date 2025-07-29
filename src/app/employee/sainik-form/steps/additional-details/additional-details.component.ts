import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../mat-element';
import { EmployeeService } from '../../../employee-service'
import { provideNativeDateAdapter } from '@angular/material/core';
import { AwardDetails } from '../../models/sainik.models';
@Component({
  selector: 'app-additional-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './additional-details.component.html',
  styleUrl: './additional-details.component.css'
})
export class AdditionalDetailsComponent implements OnInit {
   @Input() formGroup!: FormGroup;
 qualificationList: any[] = [];
  esmIssuePlaces: any[] = [];
  awardTypes: any[] = [];

    constructor(private fb: FormBuilder,private employeeService: EmployeeService) {}
    ngOnInit(): void {
    this.loadESMIssuePlaces();
    this.loadQualifications();
    this.loadAwardTypes();
  }

  loadESMIssuePlaces(): void {
    this.employeeService.getEsmIssuePlaces().subscribe(data => {
      this.esmIssuePlaces = data;
    });
  }

  loadQualifications(): void {
    this.employeeService.getQualifications().subscribe(data => {
      this.qualificationList = data;
    });
  }
   loadAwardTypes(): void {
    this.employeeService.getAwardTypes().subscribe(data => {
      this.awardTypes = data;
    });
  }


}

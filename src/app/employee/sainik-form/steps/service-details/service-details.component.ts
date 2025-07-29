import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../mat-element';
import { EmployeeService } from '../../../employee-service'
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css'
})
export class ServiceDetailsComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() serviceRecords: any[] = [];

  @Output() addRecord = new EventEmitter<void>();
  @Output() recordAdded = new EventEmitter<void>();

  corpsList: any[] = [];
  commissionTypes: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadCorps();
    this.loadCommissionTypes();
  }

  loadCorps(): void {
    this.employeeService.getCorps().subscribe(data => {
      this.corpsList = data;
    });
  }

  loadCommissionTypes(): void {
    this.employeeService.getCommissionTypes().subscribe(data => {
      this.commissionTypes = data;
    });
  }

 add() {
  if (this.formGroup.valid) {
    this.serviceRecords.push(this.formGroup.value);
    this.recordAdded.emit();  // Notify parent
    this.clearForm();
  }
}
clearForm() {
  this.formGroup.reset();
  this.formGroup.markAsPristine();
  this.formGroup.markAsUntouched();
}


deleteRecord(index: number): void {
  this.serviceRecords.splice(index, 1);
}

}

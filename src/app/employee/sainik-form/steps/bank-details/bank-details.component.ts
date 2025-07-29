import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../mat-element';
@Component({
  selector: 'app-bank-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.css'
})
export class BankDetailsComponent {
  @Input() formGroup!: FormGroup;
  @Input() bankRecords: any[] = [];

  @Output() recordAdded = new EventEmitter<void>();

  accountTypes: string[] = ['Savings', 'Current', 'Salary'];
  
addBankRecord(): void {
    if (this.formGroup.valid) {
      this.bankRecords.push(this.formGroup.value);
      this.recordAdded.emit();
      this.clearForm();
    }
  }

  clearForm(): void {
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
  }

  deleteBankRecord(index: number): void {
    this.bankRecords.splice(index, 1);
  }
}


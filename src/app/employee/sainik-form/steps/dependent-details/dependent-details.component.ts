import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../mat-element';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dependent-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './dependent-details.component.html',
  styleUrl: './dependent-details.component.css'
})
export class DependentDetailsComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() dependentRecords: any[] = [];

  @Output() addRecord = new EventEmitter<void>();
   relations: string[] = ['Father', 'Mother', 'Wife', 'Son', 'Daughter', 'Other'];

  constructor() {}

  ngOnInit(): void {}

  add() {
    if (this.formGroup.valid) {
      this.addRecord.emit();
    }
  }

  deleteRecord(index: number): void {
    this.dependentRecords.splice(index, 1);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-award-type',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './award-type.component.html',
  styleUrl: './award-type.component.css'
})
export class AwardTypeComponent implements OnInit {
  awardTypeForm!: FormGroup;
  awardTypes: any[] = []; // Array to hold awardType data
  displayedColumns: string[] = ['id', 'name']; // Columns for the table

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_awardTypes();
    this.awardTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.awardTypeForm.valid) {
      const awardTypeName = this.awardTypeForm.value.name;

      // Prompt the user to confirm before submitting the awardType
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to add the awardType "${awardTypeName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Submitting awardType:', awardTypeName);

          this.adminService.saveAwardType({ name: awardTypeName }).subscribe({
            next: (response) => {
              console.log('awardType added successfully:', response);
              this.awardTypeForm.reset();
              // Refresh the awardType list after adding new one
              this.get_awardTypes();
            },
            error: (error) => {
              console.error('Error adding awardType:', error);
            }
          });
        } else {
          console.log('awardType addition cancelled.');
        }
      });
    }
  }
  get_awardTypes(): void {
    this.adminService.getAwardTypes().subscribe(awardTypes => {
      console.log('awardTypes:', awardTypes);
      this.awardTypes = awardTypes; // Store fetched awardTypes in array
    });
  }

}

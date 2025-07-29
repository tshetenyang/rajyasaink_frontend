import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qualifications',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './qualifications.component.html',
  styleUrl: './qualifications.component.css'
})

export class qualificationComponent implements OnInit {
  qualificationForm!: FormGroup;
  qualifications: any[] = []; // Array to hold qualification data
  displayedColumns: string[] = ['id', 'name', 'is_active']; // Columns for the table

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_qualifications();
    this.qualificationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.qualificationForm.valid) {
      const qualificationName = this.qualificationForm.value.name;

      // Prompt the user to confirm before submitting the qualification
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to add the qualification "${qualificationName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Submitting qualification:', qualificationName);

          this.adminService.saveQualification({ name: qualificationName }).subscribe({
            next: (response) => {
              console.log('qualification added successfully:', response);
              this.qualificationForm.reset();
              // Refresh the qualification list after adding new one
              this.get_qualifications();
            },
            error: (error) => {
              console.error('Error adding qualification:', error);
            }
          });
        } else {
          console.log('qualification addition cancelled.');
        }
      });
    }
  }
  get_qualifications(): void {
    this.adminService.getQualifications().subscribe(qualifications => {
      console.log('qualifications:', qualifications);
      this.qualifications = qualifications; // Store fetched qualifications in array
    });
  }

  onToggleStatus(qualification: any, event: any): void {
    const newStatus = event.checked;
    if (!newStatus) {
      // If the user is deactivating the qualification, show the confirmation prompt
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to deactivate the qualification "${qualification.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, deactivate it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`qualification ${qualification.name} deactivated`);
          // Make the API call to deactivate the qualification here
          // You can call an API service to update the qualification's status
          this.deactivatequalification(qualification);
        } else {
          // Revert the toggle back to active if the user cancels
          event.source.checked = true;
        }
      });
    } else {
      console.log(`qualification ${qualification.name} activated`);
      // You can also make an API call to activate the qualification if needed
      this.activatequalification(qualification);
    }
  }

  deactivatequalification(qualification: any): void {
    // Make an API call to deactivate the qualification
    //this.adminService.updatequalificationStatus(qualification.id, { is_active: false }).subscribe({
    //  next: (response) => {
        console.log('qualification deactivated successfully');
     //   this.get_qualifications(); // Refresh the qualification list after the change
     // },
    //  error: (error) => {
    //    console.error('Error deactivating qualification:', error);
    //  }
    //});
  }

  activatequalification(qualification: any): void {
    console.log('qualification turned OFF')
    // Make an AP' I call to activate the qualification
   // this.adminService.updatequalificationStatus(qualification.id, { is_active: true }).subscribe({
   //   next: (response) => {
    //    console.log('qualification activated successfully:', response);
    //    this.get_qualifications(); // Refresh the qualification list after the change
    //  },
     // error: (error) => {
      //  console.error('Error activating qualification:', error);
     // }
  //  });
  }
}


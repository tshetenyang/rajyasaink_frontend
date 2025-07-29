import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-esm-issue-place',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './esm-issue-place.component.html',
  styleUrl: './esm-issue-place.component.css'
})
export class EsmIssuePlaceComponent implements OnInit {
  esmIssuePlaceForm!: FormGroup;
  esmIssuePlaces: any[] = []; // Array to hold esmIssuePlace data
  displayedColumns: string[] = ['id', 'name', 'is_active']; // Columns for the table

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_esmIssuePlaces();
    this.esmIssuePlaceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.esmIssuePlaceForm.valid) {
      const esmIssuePlaceName = this.esmIssuePlaceForm.value.name;

      // Prompt the user to confirm before submitting the esmIssuePlace
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to add the esmIssuePlace "${esmIssuePlaceName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Submitting esmIssuePlace:', esmIssuePlaceName);

          this.adminService.saveEsmIssuePlace({ name: esmIssuePlaceName }).subscribe({
            next: (response) => {
              console.log('esmIssuePlace added successfully:', response);
              this.esmIssuePlaceForm.reset();
              // Refresh the esmIssuePlace list after adding new one
              this.get_esmIssuePlaces();
            },
            error: (error) => {
              console.error('Error adding esmIssuePlace:', error);
            }
          });
        } else {
          console.log('esmIssuePlace addition cancelled.');
        }
      });
    }
  }
  get_esmIssuePlaces(): void {
    this.adminService.getEsmIssuePlaces().subscribe(esmIssuePlaces => {
      console.log('esmIssuePlaces:', esmIssuePlaces);
      this.esmIssuePlaces = esmIssuePlaces; // Store fetched esmIssuePlaces in array
    });
  }

  onToggleStatus(esmIssuePlace: any, event: any): void {
    const newStatus = event.checked;
    if (!newStatus) {
      // If the user is deactivating the esmIssuePlace, show the confirmation prompt
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to deactivate the esmIssuePlace "${esmIssuePlace.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, deactivate it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`esmIssuePlace ${esmIssuePlace.name} deactivated`);
          // Make the API call to deactivate the esmIssuePlace here
          // You can call an API service to update the esmIssuePlace's status
          this.deactivateesmIssuePlace(esmIssuePlace);
        } else {
          // Revert the toggle back to active if the user cancels
          event.source.checked = true;
        }
      });
    } else {
      console.log(`esmIssuePlace ${esmIssuePlace.name} activated`);
      // You can also make an API call to activate the esmIssuePlace if needed
      this.activateesmIssuePlace(esmIssuePlace);
    }
  }

  deactivateesmIssuePlace(esmIssuePlace: any): void {
    // Make an API call to deactivate the esmIssuePlace
    //this.adminService.updateesmIssuePlaceStatus(esmIssuePlace.id, { is_active: false }).subscribe({
    //  next: (response) => {
        console.log('esmIssuePlace deactivated successfully');
     //   this.get_esmIssuePlaces(); // Refresh the esmIssuePlace list after the change
     // },
    //  error: (error) => {
    //    console.error('Error deactivating esmIssuePlace:', error);
    //  }
    //});
  }

  activateesmIssuePlace(esmIssuePlace: any): void {
    console.log('esmIssuePlace turned OFF')
    // Make an AP' I call to activate the esmIssuePlace
   // this.adminService.updateesmIssuePlaceStatus(esmIssuePlace.id, { is_active: true }).subscribe({
   //   next: (response) => {
    //    console.log('esmIssuePlace activated successfully:', response);
    //    this.get_esmIssuePlaces(); // Refresh the esmIssuePlace list after the change
    //  },
     // error: (error) => {
      //  console.error('Error activating esmIssuePlace:', error);
     // }
  //  });
  }
}

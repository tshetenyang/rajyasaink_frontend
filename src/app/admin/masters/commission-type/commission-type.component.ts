import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-commission-type',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './commission-type.component.html',
  styleUrl: './commission-type.component.css'
})
export class CommissionTypeComponent implements OnInit {
  commisiontypeForm!: FormGroup;
  commisiontypes: any[] = []; // Array to hold commision-type data
  displayedColumns: string[] = ['id', 'name', 'is_active']; // Columns for the table

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_commisiontypes();
    this.commisiontypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.commisiontypeForm.valid) {
      const commisiontypeName = this.commisiontypeForm.value.name;

      // Prompt the user to confirm before submitting the commision-type
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to add the commision-type "${commisiontypeName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Submitting commision-type:', commisiontypeName);

          this.adminService.saveCommissionType({ name: commisiontypeName }).subscribe({
            next: (response) => {
              console.log('commision-type added successfully:', response);
              this.commisiontypeForm.reset();
              // Refresh the commision-type list after adding new one
              this.get_commisiontypes();
            },
            error: (error) => {
              console.error('Error adding commision-type:', error);
            }
          });
        } else {
          console.log('commision-type addition cancelled.');
        }
      });
    }
  }
  get_commisiontypes(): void {
    this.adminService.getCommissionTypes().subscribe(commisiontypes => {
      console.log('commision-types:', commisiontypes);
      this.commisiontypes = commisiontypes; // Store fetched commision-types in array
    });
  }

  onToggleStatus(commisiontype: any, event: any): void {
    const newStatus = event.checked;
    if (!newStatus) {
      // If the user is deactivating the commision-type, show the confirmation prompt
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to deactivate the commision-type "${commisiontype.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, deactivate it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`commision-type ${commisiontype.name} deactivated`);
          // Make the API call to deactivate the commision-type here
          // You can call an API service to update the commision-type's status
          this.deactivatecommisiontype(commisiontype);
        } else {
          // Revert the toggle back to active if the user cancels
          event.source.checked = true;
        }
      });
    } else {
      console.log(`commision-type ${commisiontype.name} activated`);
      // You can also make an API call to activate the commision-type if needed
      this.activatecommisiontype(commisiontype);
    }
  }

  deactivatecommisiontype(commisiontype: any): void {
    // Make an API call to deactivate the commision-type
    //this.adminService.updatecommision-typeStatus(commision-type.id, { is_active: false }).subscribe({
    //  next: (response) => {
        console.log('commision-type deactivated successfully');
     //   this.get_commision-types(); // Refresh the commision-type list after the change
     // },
    //  error: (error) => {
    //    console.error('Error deactivating commision-type:', error);
    //  }
    //});
  }

  activatecommisiontype(commisiontype: any): void {
    console.log('commision-type turned OFF')
    // Make an AP' I call to activate the commision-type
   // this.adminService.updatecommision-typeStatus(commision-type.id, { is_active: true }).subscribe({
   //   next: (response) => {
    //    console.log('commision-type activated successfully:', response);
    //    this.get_commision-types(); // Refresh the commision-type list after the change
    //  },
     // error: (error) => {
      //  console.error('Error activating commision-type:', error);
     // }
  //  });
  }
}

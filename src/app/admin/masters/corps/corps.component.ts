import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corps',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule], 
  templateUrl: './corps.component.html',
  styleUrl: './corps.component.css'
})
export class CorpsComponent implements OnInit {
  corpsForm!: FormGroup;
  corps: any[] = []; // Array to hold corp data
  displayedColumns: string[] = ['id', 'name', 'is_active']; // Columns for the table

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_corps();
    this.corpsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.corpsForm.valid) {
      const corpName = this.corpsForm.value.name;

      // Prompt the user to confirm before submitting the corp
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to add the corp "${corpName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Submitting corp:', corpName);

          this.adminService.saveCorps({ name: corpName }).subscribe({
            next: (response) => {
              console.log('corp added successfully:', response);
              this.corpsForm.reset();
              // Refresh the corp list after adding new one
              this.get_corps();
            },
            error: (error) => {
              console.error('Error adding corp:', error);
            }
          });
        } else {
          console.log('corp addition cancelled.');
        }
      });
    }
  }
  get_corps(): void {
    this.adminService.getCorps().subscribe(corps => {
      console.log('corps:', corps);
      this.corps = corps; // Store fetched corps in array
    });
  }

  onToggleStatus(corp: any, event: any): void {
    const newStatus = event.checked;
    if (!newStatus) {
      // If the user is deactivating the corp, show the confirmation prompt
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to deactivate the corp "${corp.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, deactivate it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`corp ${corp.name} deactivated`);
          // Make the API call to deactivate the corp here
          // You can call an API service to update the corp's status
          this.deactivatecorp(corp);
        } else {
          // Revert the toggle back to active if the user cancels
          event.source.checked = true;
        }
      });
    } else {
      console.log(`corp ${corp.name} activated`);
      // You can also make an API call to activate the corp if needed
      this.activatecorp(corp);
    }
  }

  deactivatecorp(corp: any): void {
    // Make an API call to deactivate the corp
    //this.adminService.updatecorpStatus(corp.id, { is_active: false }).subscribe({
    //  next: (response) => {
        console.log('corp deactivated successfully');
     //   this.get_corps(); // Refresh the corp list after the change
     // },
    //  error: (error) => {
    //    console.error('Error deactivating corp:', error);
    //  }
    //});
  }

  activatecorp(corp: any): void {
    console.log('corp turned OFF')
    // Make an AP' I call to activate the corp
   // this.adminService.updatecorpStatus(corp.id, { is_active: true }).subscribe({
   //   next: (response) => {
    //    console.log('corp activated successfully:', response);
    //    this.get_corps(); // Refresh the corp list after the change
    //  },
     // error: (error) => {
      //  console.error('Error activating corp:', error);
     // }
  //  });
  }
}

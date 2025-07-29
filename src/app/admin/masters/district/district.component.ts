import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../mat-element';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../admin-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  districtForm!: FormGroup;
  districts: any[] = []; // Array to hold district data
  displayedColumns: string[] = ['id', 'name', 'is_active']; // Columns for the table

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.get_districts();
    this.districtForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit(): void {
    if (this.districtForm.valid) {
      const districtName = this.districtForm.value.name;

      // Prompt the user to confirm before submitting the district
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to add the district "${districtName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Submitting District:', districtName);

          this.adminService.saveDistrict({ name: districtName }).subscribe({
            next: (response) => {
              console.log('District added successfully:', response);
              this.districtForm.reset();
              // Refresh the district list after adding new one
              this.get_districts();
            },
            error: (error) => {
              console.error('Error adding district:', error);
            }
          });
        } else {
          console.log('District addition cancelled.');
        }
      });
    }
  }
  get_districts(): void {
    this.adminService.getDistricts().subscribe(districts => {
      console.log('Districts:', districts);
      this.districts = districts; // Store fetched districts in array
    });
  }

  onToggleStatus(district: any, event: any): void {
    const newStatus = event.checked;
    if (!newStatus) {
      // If the user is deactivating the district, show the confirmation prompt
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to deactivate the district "${district.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, deactivate it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`District ${district.name} deactivated`);
          // Make the API call to deactivate the district here
          // You can call an API service to update the district's status
          this.deactivateDistrict(district);
        } else {
          // Revert the toggle back to active if the user cancels
          event.source.checked = true;
        }
      });
    } else {
      console.log(`District ${district.name} activated`);
      // You can also make an API call to activate the district if needed
      this.activateDistrict(district);
    }
  }

  deactivateDistrict(district: any): void {
    // Make an API call to deactivate the district
    //this.adminService.updateDistrictStatus(district.id, { is_active: false }).subscribe({
    //  next: (response) => {
        console.log('District deactivated successfully');
     //   this.get_districts(); // Refresh the district list after the change
     // },
    //  error: (error) => {
    //    console.error('Error deactivating district:', error);
    //  }
    //});
  }

  activateDistrict(district: any): void {
    console.log('district turned OFF')
    // Make an AP' I call to activate the district
   // this.adminService.updateDistrictStatus(district.id, { is_active: true }).subscribe({
   //   next: (response) => {
    //    console.log('District activated successfully:', response);
    //    this.get_districts(); // Refresh the district list after the change
    //  },
     // error: (error) => {
      //  console.error('Error activating district:', error);
     // }
  //  });
  }
}

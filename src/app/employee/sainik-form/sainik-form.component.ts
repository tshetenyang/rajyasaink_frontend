import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee-service';
import { PersonalDetails, ServiceDetails, SainikFormData,BankDetails,DependentDetails} from './models/sainik.models';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../mat-element';
import { PersonalDetailsComponent } from './steps/personal-details/personal-details.component';
import { ReviewSummaryComponent } from './steps/review-summary/review-summary.component';
import { ServiceDetailsComponent } from './steps/service-details/service-details.component';
import { BankDetailsComponent } from './steps/bank-details/bank-details.component';
import { DependentDetailsComponent } from './steps/dependent-details/dependent-details.component';
import { AdditionalDetailsComponent } from './steps/additional-details/additional-details.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sainik-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    PersonalDetailsComponent,
    ServiceDetailsComponent,
    ReviewSummaryComponent,
    BankDetailsComponent,
    DependentDetailsComponent,
    AdditionalDetailsComponent
  ],
  templateUrl: './sainik-form.component.html',
  styleUrls: ['./sainik-form.component.css']
})
export class SainikFormComponent implements OnInit {
  personalForm!: FormGroup;
  serviceForm!: FormGroup;
  bankForm!: FormGroup;
  dependentForm!: FormGroup;
  additionalForm!: FormGroup;

  
 
  serviceRecords: ServiceDetails[] = [];
  bankRecords: BankDetails[] = [];
  dependentRecords:DependentDetails[] = [];

  
  
  // Stepper Control
  currentStep = 0;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.initPersonalForm();
    this.initServiceForm();
    this.initBankDetailsForm();
    this.initDependentForm();
    this.initAdditionalForm();
  
  }

  private initPersonalForm(): void {
    this.personalForm = this.fb.group({
      id_ic: ['', ],
      first_name: ['', ],
      middle_name: [''],
      last_name: ['', ],
      date_of_birth: ['', ],
      district: [null],
      address: ['', ],
      pin_code: ['', [,]],
      phone_number: ['', []],
      email: ['', ],
      aadhar_number: ['', []],
      is_alive: [true],
      expiry_date: [null]
    });

    // Conditional expiry date validation
    this.personalForm.get('is_alive')?.valueChanges.subscribe(isAlive => {
      const expiryControl = this.personalForm.get('expiry_date');
      isAlive ? expiryControl?.disable() : expiryControl?.enable();
    });
  }

  private initServiceForm(): void {
    this.serviceForm = this.fb.group({
      corps: [null, ],
      commission: [null],
      unit: [''],
      description: ['', ],
      start_date: ['', ],
      end_date: ['', ]
    });
  }

  private initBankDetailsForm(): void {
    this.bankForm = this.fb.group({
      account_number: ['', ],
      pan_number: ['', ],
      bank_name: ['', ],
      ifsc_code: ['', ],
      account_type: ['', ],
      ppo_number: ['',]
    });
  }
  private initDependentForm(): void {
  this.dependentForm = this.fb.group({
    first_name: ['', ],
    last_name: ['', ],
    relation: ['', ]
  });
}
private initAdditionalForm(): void {
  this.additionalForm = this.fb.group({
    canteen_smart_card: [false],
    coi: [false],
    resident_certificate: [false],
    echs: [false],
    esm: ['0000', ],
    esm_issue_date: [null],
    esm_place_of_issue: [null],
    highest_qualification: [null],
    education_details: ['Not Provided']
  });
}


  addServiceRecord(): void {
    if (this.serviceForm.valid) {
      this.serviceRecords.push(this.serviceForm.value);
      this.serviceForm.reset();
    }
  }
  addBankRecord(): void {
    if (this.bankForm.valid) {
      this.bankRecords.push(this.bankForm.value);
      this.bankForm.reset();
    }
  }
  addDependentRecord(): void {
  if (this.dependentForm.valid) {
    this.dependentRecords.push(this.dependentForm.value);
    this.dependentForm.reset();
  }
}
submitForm(): void {
  if (this.personalForm.invalid) {
    console.warn('Personal form is invalid.');
    return;
  }

  if (this.serviceRecords.length === 0) {
    console.warn('No service records added.');
    return;
  }
  if (this.bankRecords.length === 0) {
    console.warn('No bank records added.');
    return;
  }
  if (this.dependentRecords.length === 0) {
    console.warn('No dependent records added.');
    return;
  }

  // Format date_of_birth from personalForm
  const personalDetails = {
    ...this.personalForm.value,
    date_of_birth: this.formatDate(this.personalForm.value.date_of_birth)
  };

  // Add id_ic and format date fields in nested arrays
  const service_details = this.serviceRecords.map(service => ({
    ...service,
    id_ic: personalDetails.id_ic,
    start_date: this.formatDate(service.start_date),
    end_date: this.formatDate(service.end_date)
  }));

  const bank_details = this.bankRecords.map(bank => ({
    ...bank,
    id_ic: personalDetails.id_ic
  }));

  const dependents = this.dependentRecords.map(dep => ({
    ...dep,
    id_ic: personalDetails.id_ic
  }));

  // Format dates and add id_ic in additional_details
  const additional_details = {
    ...this.additionalForm.value,
    id_ic: personalDetails.id_ic,
    esm_issue_date: this.additionalForm.value.esm_issue_date ? this.formatDate(this.additionalForm.value.esm_issue_date) : null
  };

  const finalPayload = {
    ...personalDetails,
    service_details,
    bank_details,
    dependents,
    additional_details
  };

  console.log('Submitting form payload:', finalPayload);

  this.employeeService.submitSainikData(finalPayload).subscribe({
    next: response => {
      console.log('Submission successful:', response);
    },
    error: err => {
      console.error('Submission failed:', err);
    }
  });
}

// Helper function to format date as YYYY-MM-DD
private formatDate(date: any): string | null {
  if (!date) return null;
  // date can be Date object or string, ensure conversion
  return formatDate(date, 'yyyy-MM-dd', 'en-US');
}


  

}
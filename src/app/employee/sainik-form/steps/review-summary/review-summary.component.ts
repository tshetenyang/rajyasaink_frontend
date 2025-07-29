import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../mat-element';
import { FormGroup } from '@angular/forms';
import { ServiceDetails, PersonalDetails, BankDetails, DependentDetails,AwardDetails,AdditionalDetails} from '../../models/sainik.models';

@Component({
  selector: 'app-review-summary',
  standalone: true,
  imports: [MaterialModule,CommonModule],
  templateUrl: './review-summary.component.html',
  styleUrl: './review-summary.component.css'
})
export class ReviewSummaryComponent {
  @Input() personal!: PersonalDetails;
  @Input() serviceRecords: ServiceDetails[] = []; 
  @Input() bankRecords:BankDetails[]=[]; 
  @Input() dependentRecords: DependentDetails[] = [];
  @Input() awardRecords: AwardDetails[] = [];
  @Input() additionalDetails!: AdditionalDetails;

  
}

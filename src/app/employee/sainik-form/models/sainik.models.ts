export interface SainikFormData {
  personalDetails: PersonalDetails;
  serviceDetails: ServiceDetails[]; 
  bankDetails: BankDetails[];
  dependentDetails:DependentDetails[]; 
  additionalDetails: AdditionalDetails;

}

export interface PersonalDetails {
  id_ic: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  date_of_birth: Date | string;
  district?: number | null;
  address: string;
  pin_code: string;
  phone_number: string;
  email: string;
  aadhar_number: string;
  is_alive: boolean;
  expiry_date?: Date | string | null;
}

export interface ServiceDetails {
  corps: number | null;  
  commission: number | null;  
  description: string;
  start_date: string | Date;
  end_date: string | Date;
}
export interface BankDetails{
    account_number: string;
    pan_number:   string;
    bank_name: string;
    ifsc_code: string;
    account_type: string;
    ppo_number: string;

}

export interface DependentDetails {
  first_name: string;
  last_name: string;
  relation: string;
}

export interface AdditionalDetails {
  canteen_smart_card: boolean;
  coi: boolean;
  resident_certificate: boolean;
  echs: boolean;
  esm: string;
  esm_issue_date?: string;
  esm_place_of_issue: number | null;
  highest_qualification: number | null;
  education_details: string;
}

export interface AwardDetails {
  award_type: number | null;
  award_image?: File;
  received_date?: string;
  remarks?: string;
}

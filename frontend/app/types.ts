// frontend/app/types.ts

export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  assignments: Assignment[];
}

// The Assignment interface now includes the 'patient' property.
export interface Assignment {
  id: number;
  patient: Patient; // This was the missing piece
  medication: Medication;
  startDate: string;
  days: number;
  remainingDays?: number;
}
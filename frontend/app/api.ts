// frontend/app/api.ts
import axios from 'axios';
import { Patient, Medication, Assignment } from './types';

const API_URL = 'http://localhost:8080';

type CreatePatientData = { name: string; dateOfBirth: string };
type CreateMedicationData = { name: string; dosage: string; frequency: string };
type CreateAssignmentData = { patientId: number; medicationId: number; startDate: string; days: number };

export const getPatients = async (): Promise<Patient[]> => {
  const response = await axios.get(`${API_URL}/patients`);
  // remaining days calculation
  const assignmentsResponse = await axios.get(`${API_URL}/assignments/remaining`);
  const assignments: Assignment[] = assignmentsResponse.data;

  return response.data.map((patient: Patient) => ({
    ...patient,
    assignments: assignments.filter(a => a.patient.id === patient.id),
  }));
};
export const createPatient = (data: CreatePatientData) => axios.post(`${API_URL}/patients`, data);

export const getMedications = async (): Promise<Medication[]> => {
    const response = await axios.get(`${API_URL}/medications`);
    return response.data;
};
export const createMedication = (data: CreateMedicationData) => axios.post(`${API_URL}/medications`, data);

export const createAssignment = (data: CreateAssignmentData) => axios.post(`${API_URL}/assignments`, data);
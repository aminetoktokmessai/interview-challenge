"use client";

import { useEffect, useState, useCallback } from 'react';
import { getPatients, getMedications } from './api';
import { Patient, Medication } from './types';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import MedicationForm from './components/MedicationForm';
import AssignmentForm from './components/AssignmentForm';

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [patientsRes, medicationsRes] = await Promise.all([
        getPatients(),
        getMedications()
      ]);
      setPatients(patientsRes);
      setMedications(medicationsRes);
    } catch (err) {
      setError("Failed to fetch data. Make sure the backend server is running.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Oxyera Medication Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
            <PatientForm onPatientCreated={fetchData} />
            <MedicationForm onMedicationCreated={fetchData} />
            <AssignmentForm
                patients={patients}
                medications={medications}
                onAssignmentCreated={fetchData}
            />
        </div>
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && <PatientList patients={patients} />}
        </div>
      </div>
    </main>
  );
}
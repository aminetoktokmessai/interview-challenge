// frontend/app/components/AssignmentForm.tsx
"use client";
import React, { useState } from 'react';
import { createAssignment } from '../api';
import { Patient, Medication } from '../types';

interface AssignmentFormProps {
  patients: Patient[];
  medications: Medication[];
  onAssignmentCreated: () => void;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ patients, medications, onAssignmentCreated }) => {
  const [patientId, setPatientId] = useState<number | ''>('');
  const [medicationId, setMedicationId] = useState<number | ''>('');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState<number>(30);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !medicationId || !startDate || days <= 0) {
      setError('All fields must be filled out correctly.');
      return;
    }
    try {
      await createAssignment({ patientId, medicationId, startDate, days });
      onAssignmentCreated();
      setPatientId('');
      setMedicationId('');
      setStartDate('');
      setDays(30);
      setError(null);
    } catch (err) {
       setError('Failed to create assignment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Assign Medication to Patient</h2>
       {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select value={patientId} onChange={(e) => setPatientId(Number(e.target.value))} className="border p-2 rounded w-full" required>
          <option value="">Select Patient</option>
          {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={medicationId} onChange={(e) => setMedicationId(Number(e.target.value))} className="border p-2 rounded w-full" required>
          <option value="">Select Medication</option>
          {medications.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="number" placeholder="Days of Treatment" value={days} onChange={(e) => setDays(Number(e.target.value))} className="border p-2 rounded w-full" required />
      </div>
      <button type="submit" className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Assign Medication
      </button>
    </form>
  );
};

export default AssignmentForm;
"use client";
import React, { useState } from 'react';
import { createMedication } from '../api';

interface MedicationFormProps {
  onMedicationCreated: () => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onMedicationCreated }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     if (!name || !dosage || !frequency) {
      setError('All fields are required.');
      return;
    }
    try {
      await createMedication({ name, dosage, frequency });
      onMedicationCreated();
      setName('');
      setDosage('');
      setFrequency('');
      setError(null);
    } catch (err) {
       setError('Failed to create medication.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Medication</h2>
       {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Medication Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Dosage (e.g., 10mg)"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Frequency (e.g., Once a day)"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add Medication
      </button>
    </form>
  );
};

export default MedicationForm;
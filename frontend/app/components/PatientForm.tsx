"use client";
import React, { useState } from 'react';
import { createPatient } from '../api';

interface PatientFormProps {
  onPatientCreated: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPatientCreated }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dateOfBirth) {
      setError('All fields are required.');
      return;
    }
    try {
      await createPatient({ name, dateOfBirth });
      onPatientCreated(); 
      setName('');
      setDateOfBirth('');
      setError(null);
    } catch (err) {
      setError('Failed to create patient.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Patient
      </button>
    </form>
  );
};

export default PatientForm;
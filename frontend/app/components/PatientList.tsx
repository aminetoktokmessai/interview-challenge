import React from 'react';
import { Patient } from '../types';

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <div className="space-y-4">
        {patients.length === 0 && <p>No patients found. Add one to get started!</p>}
        {patients.map((patient) => (
          <div key={patient.id} className="p-4 border rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{patient.name}</h3>
                <p className="text-sm text-gray-500">
                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                </p>
            </div>
            <div className="mt-4">
              <h4 className="font-bold">Medication Assignments:</h4>
              {patient.assignments.length > 0 ? (
                <ul className="list-disc pl-5 mt-2">
                  {patient.assignments.map((assignment) => (
                    <li key={assignment.id} className="mb-1">
                      {assignment.medication.name} ({assignment.medication.dosage}, {assignment.medication.frequency}) -{' '}
                      <span className="font-bold text-blue-600">
                        {assignment.remainingDays} days remaining
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No medications assigned.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
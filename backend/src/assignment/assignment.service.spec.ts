import { Test, TestingModule } from '@nestjs/testing';
import { AssignmentService } from './assignment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssignmentEntity } from './assignment.entity';
import { PatientEntity } from '../patient/patient.entity';
import { MedicationEntity } from '../medication/medication.entity';

describe('AssignmentService', () => {
  let service: AssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignmentService,
        { provide: getRepositoryToken(AssignmentEntity), useValue: {} },
        { provide: getRepositoryToken(PatientEntity), useValue: {} },
        { provide: getRepositoryToken(MedicationEntity), useValue: {} },
      ],
    }).compile();

    service = module.get<AssignmentService>(AssignmentService);
  });

  it('should correctly calculate remaining days', () => {
    const assignment = new AssignmentEntity();
    const today = new Date();
    assignment.startDate = new Date(today.setDate(today.getDate() - 10)); // Started 10 days ago
    assignment.days = 30; // 30-day treatment

    expect(service.calculateRemainingDays(assignment)).toBe(20);
  });
});
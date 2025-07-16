import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssignmentEntity } from './assignment.entity';
import { CreateAssignmentDto } from './assignment.dto';
import { PatientEntity } from '../patient/patient.entity';
import { MedicationEntity } from '../medication/medication.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assignmentRepository: Repository<AssignmentEntity>,
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
    @InjectRepository(MedicationEntity)
    private medicationRepository: Repository<MedicationEntity>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<AssignmentEntity> {
    const patient = await this.patientRepository.findOneBy({ id: createAssignmentDto.patientId });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${createAssignmentDto.patientId} not found`);
    }

    const medication = await this.medicationRepository.findOneBy({ id: createAssignmentDto.medicationId });
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${createAssignmentDto.medicationId} not found`);
    }

    const assignment = new AssignmentEntity();
    assignment.patient = patient;
    assignment.medication = medication;
    assignment.startDate = new Date(createAssignmentDto.startDate);
    assignment.days = createAssignmentDto.days;
    return this.assignmentRepository.save(assignment);
  }

  calculateRemainingDays(assignment: AssignmentEntity): number {
    const today = new Date();
    const startDate = new Date(assignment.startDate);
    // new Date object to avoid mutating the original startDate
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + assignment.days);
    
    // hours to 0 to compare dates only
    today.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const remainingTime = endDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(remainingTime / (1000 * 60 * 60 * 24)));
  }

  async findAllWithRemainingDays(): Promise<AssignmentEntity[]> {
    const assignments = await this.assignmentRepository.find({ relations: ['patient', 'medication'] });
    return assignments.map((assignment) => ({
      ...assignment,
      remainingDays: this.calculateRemainingDays(assignment),
    }));
  }
}
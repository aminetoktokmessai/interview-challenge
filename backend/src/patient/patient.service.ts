import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { CreatePatientDto } from './patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
  ) {}

  findAll(): Promise<PatientEntity[]> {
    return this.patientRepository.find({ relations: ['assignments', 'assignments.medication'] });
  }

  create(createPatientDto: CreatePatientDto): Promise<PatientEntity> {
    const patient = new PatientEntity();
    patient.name = createPatientDto.name;
    patient.dateOfBirth = new Date(createPatientDto.dateOfBirth);
    return this.patientRepository.save(patient);
  }
}
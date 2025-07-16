import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicationEntity } from './medication.entity';
import { CreateMedicationDto } from './medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationEntity)
    private medicationRepository: Repository<MedicationEntity>,
  ) {}

  findAll(): Promise<MedicationEntity[]> {
    return this.medicationRepository.find();
  }

  create(createMedicationDto: CreateMedicationDto): Promise<MedicationEntity> {
    const medication = new MedicationEntity();
    medication.name = createMedicationDto.name;
    medication.dosage = createMedicationDto.dosage;
    medication.frequency = createMedicationDto.frequency;
    return this.medicationRepository.save(medication);
  }
}
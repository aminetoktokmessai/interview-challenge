import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PatientEntity } from '../patient/patient.entity';
import { MedicationEntity } from '../medication/medication.entity';

@Entity('assignment')
export class AssignmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatientEntity, (patient) => patient.assignments)
  patient: PatientEntity;

  @ManyToOne(() => MedicationEntity)
  medication: MedicationEntity;

  @Column()
  startDate: Date;

  @Column()
  days: number;

  @Column({ type: 'int', nullable: true })
  remainingDays?: number;
}
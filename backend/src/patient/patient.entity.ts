import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AssignmentEntity } from '../assignment/assignment.entity';

@Entity('patient')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.patient)
  assignments: AssignmentEntity[];
}
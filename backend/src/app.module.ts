import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { MedicationModule } from './medication/medication.module';
import { AssignmentModule } from './assignment/assignment.module';
import { PatientEntity } from './patient/patient.entity';
import { MedicationEntity } from './medication/medication.entity';
import { AssignmentEntity } from './assignment/assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [PatientEntity, MedicationEntity, AssignmentEntity],
      synchronize: true,
    }),
    PatientModule,
    MedicationModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
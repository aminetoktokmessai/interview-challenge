// backend/src/patient/patient.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }
}
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './medication.dto';

@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Get()
  findAll() {
    return this.medicationService.findAll();
  }

  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }
}
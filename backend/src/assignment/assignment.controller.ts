import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './assignment.dto';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Get('remaining')
  findAllWithRemainingDays() {
    return this.assignmentService.findAllWithRemainingDays();
  }
}
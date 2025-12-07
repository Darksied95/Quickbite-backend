import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { UpdateDriverDTO } from './dto/update-driver.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('drivers')
@UseGuards(AuthGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.driverService.findById(id);
  }

  @Get('')
  async findAll() {
    return this.driverService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateDriverDTO,
  ) {
    return await this.driverService.update(id, data);
  }
}

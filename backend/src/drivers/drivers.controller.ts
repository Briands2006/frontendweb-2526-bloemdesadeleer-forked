import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverListResponseDto, DriverResponseDto } from './driver.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('drivers')
export class DriversController {
  constructor(private driverService: DriverService) {}

  @Get()
  @Public()
  async getAllDrivers(): Promise<DriverListResponseDto> {
    return this.driverService.getAll();
  }

  @Get(':id')
  async getDriverById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DriverResponseDto> {
    return this.driverService.getById(id);
  }

  @Get('n/:slug')
  @Public()
  async getDriverBySlug(
    @Param('slug') slug: string,
  ): Promise<DriverResponseDto> {
    return this.driverService.getBySlug(slug);
  }
}

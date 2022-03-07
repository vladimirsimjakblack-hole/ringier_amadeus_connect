import { Controller, Get, Body, Post, Query, Render } from '@nestjs/common';
import { AmadeusService } from './models/amadeus.service';

@Controller()
export class AppController {
  constructor(private readonly amdService: AmadeusService) {}

  @Get('airports')
  async getAirports(@Query('autocomplete') keyword: string) {
    const list = await this.amdService.getAirports(keyword);
    return list.data;
  }

  @Post('flights')
  async getFlights(@Body() parameters: any) {
    const list = await this.amdService.getFlights(parameters);
    return list.data;
  }

  @Get()
  @Render('index')
  async root() {}
}

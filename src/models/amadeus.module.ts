import { Module } from '@nestjs/common';
import { AmadeusService } from './amadeus.service';

@Module({
  imports: [],
  providers: [AmadeusService],
  exports: [AmadeusService],
})
export class AmadeusModule {}

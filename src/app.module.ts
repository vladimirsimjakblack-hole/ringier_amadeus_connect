import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AmadeusModule } from './models/amadeus.module';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';

@Module({
  imports: [
    AmadeusModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

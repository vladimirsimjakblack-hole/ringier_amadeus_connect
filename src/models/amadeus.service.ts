import { Injectable } from '@nestjs/common';
import configuration from '../config/configuration';
import * as amadeus from 'amadeus';

@Injectable()
export class AmadeusService {
  private client = new amadeus({
    clientId: configuration().AMD.KEY,
    clientSecret: configuration().AMD.SECRET,
  });

  async getAirports(keyword: string) {
    const data = await this.client.referenceData.locations.get({
      keyword: keyword,
      subType: 'AIRPORT',
    });
    return data;
  }

  async getFlights(parameters) {
    try {
      const data = await this.client.shopping.flightOffersSearch.get(
        parameters,
      );
      return data;
    } catch (e) {
      console.log(e.description);
    }
  }
}

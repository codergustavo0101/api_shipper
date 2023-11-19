import { Injectable } from '@nestjs/common';
import GeocodingDto from './dto/geocoding.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class LocationService {
  async reverseGeocoding(lat: number, lng: number): Promise<string> {
    const client = new AWS.Location({
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }),
      region: 'us-east-1',
    });

    const params = {
      IndexName: 'shipper-api-places',
      MaxResults: 1,
      Position: [lng, lat],
      Language: 'pt-BR',
    };

    const response = await client.searchPlaceIndexForPosition(params).promise();

    const { Results: results } = response;
    const [result] = results;
    const { Place: place } = result;
    const { Municipality: city, Region: state } = place;

    return `${city} - ${state}`;
  }

  async geocoding(geocodingDto: GeocodingDto) {
    const client = new AWS.Location({
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }),
      region: 'us-east-1',
    });

    const params = {
      IndexName: 'shipper-api-places',
      Text: geocodingDto.address,
      MaxResults: 1,
      FilterCountries: ['BRA'],
      Language: 'pt-BR',
    };

    const response = await client.searchPlaceIndexForText(params).promise();

    const { Results: results } = response;
    const [result] = results;
    const { Place: place } = result;
    const { Geometry: geometry } = place;
    const { Point: point } = geometry;
    const [lng, lat] = point;

    return { lat, lng };
  }
}

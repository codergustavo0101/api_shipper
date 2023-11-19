const GeocoderOptions = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  formatter: null,
  language: 'pt-BR',
  region: 'BR',
};

export default GeocoderOptions;

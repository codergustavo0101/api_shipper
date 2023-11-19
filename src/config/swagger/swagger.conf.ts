import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle(`${process.env.APP_NAME} - API`)
  .setDescription(`API documentation for ${process.env.APP_NAME}`)
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export default config;

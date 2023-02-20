import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const api = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('doc', app, parse(api));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();

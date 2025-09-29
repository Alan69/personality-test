import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('questions/:lang')
  getQuestions(@Param('lang') lang: string) {
    try {
      const filePath = path.join(process.cwd(), `questions_${lang}.json`);
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { error: 'Language not found' };
    }
  }
}

import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentModel } from './models/content.model';
import { SequelizeModule } from '@nestjs/sequelize';
import {  ContentRepository } from './repositories/content.repository';

@Module({
  imports: [SequelizeModule.forFeature([ContentModel])],
  controllers: [ContentController],
  providers: [ContentService, ContentRepository],
})
export class ContentModule {}

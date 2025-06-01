import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto, GetContentDto } from './dto/create-content.dto';
import { Role } from 'src/common/decorators/role.decorator';
import { IRole } from '../admin/interfaces/admin.interface';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { Public } from 'src/common/decorators/public.decorator';


@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  
  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_CONTENT)
  @Post("create")
  @HttpCode(201)
  @ResponseMessage("new content created successfully")
  async create(@Body() body: CreateContentDto, @TransactionParam() transaction: Transaction) {
    return await this.contentService.create(body, transaction);
  }

  @Public()
  @Get(':id')
  @HttpCode(200)
  @ResponseMessage("content details")
  async getContentById(@Param('id') id: string) {
    return await this.contentService.findContentById(id);
  }

  @Public()
  @Get()
  @HttpCode(200)
  @ResponseMessage("content details")
  async getContent(@Query() query: GetContentDto, @TransactionParam() transaction: Transaction) {
   return await this.contentService.findAll(query);
  }

  @Role(IRole.SUPER_ADMIN, IRole.MANAGE_CONTENT)
  @Delete(':id')
  @HttpCode(204)
  @ResponseMessage(" content deleted successfully")
  remove(@Param('id') id: string, @TransactionParam() transaction: Transaction) {
    return this.contentService.removeContent(id, transaction);
  }
}

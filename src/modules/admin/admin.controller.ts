import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResetPasswordDto, CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { Role } from 'src/common/decorators/role.decorator';
import { Admin } from 'src/common/decorators/admin.decorator';
import { IAdmin, IRole } from './interfaces/admin.interface';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Role(IRole.SUPER_ADMIN)
  @Post("create")
  @HttpCode(201)
  @ResponseMessage("new member added successfully")
  async create(@Body() body: CreateAdminDto, @TransactionParam() transaction: Transaction) {
    return await this.adminService.createAdmin(body, transaction);
  }

  @Role(IRole.SUPER_ADMIN)
  @Delete(':id')
  @HttpCode(204)
  @ResponseMessage("Admin delete successfully")
  async remove(@Param('id') id: string, @TransactionParam() transaction: Transaction) {
    return await this.adminService.deleteAdmin(id, transaction);
  }
  
  @Role(IRole.MANAGE_CONTENT, IRole.MANAGE_COURSES, IRole.SUPER_ADMIN)
  @Put("reset-password")
  @HttpCode(200)
  @ResponseMessage("password changed successfully")
  async resetPassword(@Admin() admin:IAdmin, @Body() body: AdminResetPasswordDto, @TransactionParam() transaction: Transaction){
    return await this.adminService.adminResetPassword(admin, body, transaction);
  }


}

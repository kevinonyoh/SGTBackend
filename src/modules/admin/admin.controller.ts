import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Put, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminResetPasswordDto, CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { Role } from 'src/common/decorators/role.decorator';
import { Admin } from 'src/common/decorators/admin.decorator';
import { IAdmin, IRole } from './interfaces/admin.interface';
import { PageLimitDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UsersService
    ) {}

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

  @Role(IRole.SUPER_ADMIN)
  @Get("/all-users")
  @HttpCode(200)
  @ResponseMessage("All users details")
  async getAllUsers(@Query() body:PageLimitDto){
     return await this.userService.findAllUsers(body);
  }

  @Role(IRole.SUPER_ADMIN)
  @Get("/all-admins")
  @HttpCode(200)
  @ResponseMessage("All Admins details")
  async getAllAdmins(@Query() body: PageLimitDto){
    return await this.adminService.findAllAdmin(body);
  }

  @Role(IRole.SUPER_ADMIN)
  @Put("admins/deactivate/:userId")
  @ResponseMessage("admin deactivated successfully")
  async deactivateAdmin(@Admin() admin: IAdmin, @Param('userId') id: string, @TransactionParam() transaction: Transaction){
    return await this.adminService.deactivate(admin, id, transaction);
  }

  @Role(IRole.SUPER_ADMIN)
  @Put("admins/activate/:userId")
  @ResponseMessage("admin reactivated successfully")
  async activateAdmin(@Admin() admin: IAdmin, @Param('userId') id: string, @TransactionParam() transaction: Transaction){
    return await this.adminService.activate(admin, id, transaction);
  }

  @Role(IRole.SUPER_ADMIN)
  @Put("users/deactivate/:userId")
  @ResponseMessage("user deactivated successfully")
  async deactivateUser(@Param('userId') id: string, @TransactionParam() transaction: Transaction){
    return await this.userService.deactivate(id, transaction);
  }

  @Role(IRole.SUPER_ADMIN)
  @Put("users/activate/:userId")
  @ResponseMessage("user reactivated successfully")
  async activateUser(@Param('userId') id: string, @TransactionParam() transaction: Transaction){
    return await this.userService.activate(id, transaction);
  }

  @Role(IRole.SUPER_ADMIN)
  @Delete("users/remove/:userId")
  @HttpCode(204)
  @ResponseMessage("user deleted successfully")
  async removeUser(@Param('userId') id: string, @TransactionParam() transaction: Transaction){
    return await this.userService.deleteUser(id, transaction);
  }
}

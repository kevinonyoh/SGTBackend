import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, EmailVerificationDto, ForgotPasswordDto, GetOtpDto, VerifyForgotPasswordOtpDto, changePasswordDto,  } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { Transaction } from 'sequelize';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from './interfaces/users.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Public()
  @Post("create")
  @HttpCode(201)
  @ResponseMessage("Sign up successfully")
  async create(@Body() body: CreateUserDto, @TransactionParam() transaction: Transaction) {
    return await this.usersService.createUser(body, transaction);
  }


  @Public()
  @Post("otp-code")
  @HttpCode(200)
  @ResponseMessage("Check your mail to get verification code")
  async getOtp(@Body() body: GetOtpDto){
     return await this.usersService.OtpCode(body);
  }

  @Public()
  @Put("email-verification")
  @HttpCode(200)
  @ResponseMessage("email verified successfully")
  async verifiyEmail(@Body() body: EmailVerificationDto, @TransactionParam() transaction: Transaction){
      return await this.usersService.emailVerification(body, transaction);
  }

  @Public()
  @Post("forgot-password")
  @HttpCode(200)
  @ResponseMessage("check your mail to your otp code")
  async forgotPassword(@Body() body: ForgotPasswordDto){
     return await this.usersService.forgotPassword(body);
  }

  @Public()
  @Put("forgot-password/verify-otp")
  @HttpCode(200)
  @ResponseMessage("Otp verified successfully")
  async verifyForgotPasswordOtp(@Body() body: VerifyForgotPasswordOtpDto, @TransactionParam() transaction: Transaction) {
    return await this.usersService.verifyForgotPasswordOtp(body, transaction);
  }

  @Put("change-password")
  @HttpCode(200)
  @ResponseMessage("password changed successfully")
  async changePassword(@User() user: IUser, @Body() body: changePasswordDto, @TransactionParam() transaction: Transaction){
    return await this.usersService.changePassword(user, body, transaction);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { GetPageDto, MakePaymentDto, VerifyPaymentDto } from './dto/create-payment.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IUser } from '../users/interfaces/users.interface';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { IRole } from '../admin/interfaces/admin.interface';
import { query } from 'express';




@Controller('payment')
export class PaymentController {
  
  constructor(private readonly paymentService: PaymentService) {}

  
  @Post("make-payment")
  @HttpCode(201)
  @ResponseMessage("payment initiated successfully")
  async makePayment(@User() user: IUser, @Body() body: MakePaymentDto, @TransactionParam() transaction: Transaction){

    return await this.paymentService.makePayment(user,body, transaction);
  
  }


  // @Get("payment-callback")
  // @HttpCode(200)
  // @ResponseMessage("verify payment")
  // async handlePaymentCallback(@Query() query: VerifyPaymentDto, @TransactionParam() transaction: Transaction){

  //   return await this.paymentService.handlePaymentCallback(query, transaction);

  // }

  @Role(IRole.SUPER_ADMIN)
  @Get("payment-history")
  @HttpCode(200)
  @ResponseMessage("payment data")
  async viewPaymentHistory(@Query() query: GetPageDto){

    return await this.paymentService.findPaymentHistory(query);

  }

  @Get("user-courses")
  @HttpCode(200)
  @ResponseMessage("courses data")
  async getUserCourses(@User() user: IUser,  @Query() query: GetPageDto){

    return await this.paymentService.getUserCourses(user, query);

  }


  @Get("courses")
  @HttpCode(200)
  @ResponseMessage("course data")
  async getCourse(){

  }



  @Public()
  @Get("success")
  @HttpCode(200)
  @ResponseMessage("payment successful")
  async paymentsuccessful(@Query() query){
       console.log(query);
  }
 
}

import { Injectable } from '@nestjs/common';
import {  GetPageDto, MakePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FlutterwaveGateway } from './payment-factory/payment-gateway/flutterwave.gateway';
import { CoursesService } from '../courses/courses.service';
import { IUser } from '../users/interfaces/users.interface';
import * as helpers from 'src/common/utils/helper';
import { UsersService } from '../users/users.service';
import { IPayment, IStatus } from './interface/payment.interface';
import { Transaction } from 'sequelize';
import Flutterwave from 'flutterwave-node-v3';
import { PaymentRepository } from './repositories/payment.repository';
import { UsersModel } from '../users/models/users.model.';
import { CoursesModel } from '../courses/models/course.model';
import axios from 'axios';



@Injectable()
export class PaymentService {
  
  constructor(
    private readonly flutterwaveGateway: FlutterwaveGateway,
    private readonly coursesService: CoursesService,
    private readonly usersService: UsersService,
    private readonly paymentRepository: PaymentRepository,
  
  ){
   
  }


  async makePayment(user: IUser, data: MakePaymentDto, transaction: Transaction) {
    
     const {courseId} = data;

     const course =  await this.coursesService.findCourse(courseId);

     const userData = await this.usersService.findUserByEmail(user.email);

     const userContent = userData.toJSON()

     const courseContent = course.toJSON();

    const reference = helpers.referenceGenerator();

    const val = {
      userId: userContent.id,
      courseId: courseContent.id,
      tx_ref: reference
    }


    const payload = {
      tx_ref: reference,
      amount: `${courseContent.price}`,
      customer: {
        email: userContent.email,
        name: userContent.fullName,
        phonenumber: userContent.phoneNumber,
      },
      customizations: {
        title: "Course Payment",
        description: `Payment for ${courseContent.title}`,
      },
    };
    

   const response =  await this.flutterwaveGateway.initiatePayment(payload);

    await this.paymentRepository.create(val, transaction);
  
    return response.data;

  }

  async handlePaymentCallback(secret: string, data: any, transaction: Transaction){

    console.log(secret);
    
    console.log(data)

  }

  async findPaymentHistory(data: GetPageDto){

    const {page, limit} = data;


    const includeOption = {
      include: [
        {
          model: UsersModel
        },
        {
          model: CoursesModel
        }
      ],

      order: [['createdAt', 'DESC']]

    }

    return await this.paymentRepository.findAllPaginated({}, <unknown>includeOption, {page, limit});

  }


  async getUserCourses(user: IUser, data: GetPageDto){
    const {page, limit} = data;


    const includeOption = {
      include: [
        {
          model: UsersModel
        },
        {
          model: CoursesModel
        }
      ],

      order: [['createdAt', 'DESC']]

    }

    return await this.paymentRepository.findAllPaginated({userId: user.id, status: IStatus.success}, <unknown>includeOption, {page, limit});

  }

  async getCourse(user: IUser, courseId: string){
    
    const includeOption = {
      include: [
        {
          model: CoursesModel
        }
      ],

      order: [['createdAt', 'DESC']]

    }

    const hasAccess = await this.paymentRepository.findOne({ userId: user.id, courseId, status: IStatus.success }, <unknown>includeOption);

    return hasAccess;

  }

}


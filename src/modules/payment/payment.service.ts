import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import {  GetPageDto, MakePaymentDto, VerifyPaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { FlutterwaveGateway } from './payment-factory/payment-gateway/flutterwave.gateway';
import { CoursesService } from '../courses/courses.service';
import { IUser } from '../users/interfaces/users.interface';
import * as helpers from 'src/common/utils/helper';
import { UsersService } from '../users/users.service';
import { IPayment, IStatus } from './interface/payment.interface';
import { Op, Sequelize, Transaction } from 'sequelize';
import Flutterwave from 'flutterwave-node-v3';
import { PaymentRepository } from './repositories/payment.repository';
import { UsersModel } from '../users/models/users.model.';
import { CoursesModel } from '../courses/models/course.model';
import { calculateMinutesAgo } from 'src/common/utils/helper';



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

  async paymentConfirmation(data: VerifyPaymentDto, transaction: Transaction ){
    
      const {tx_ref} = data;

      const val = await this.paymentRepository.findOne({tx_ref});

      if(!val) throw new BadRequestException("Transaction does not exist");

      const response = await this.flutterwaveGateway.verifyPayment(tx_ref);


      const {status} = response;

      if( status.toLowerCase() === IStatus.successful) return await this.paymentRepository.update({tx_ref}, {status: IStatus.successful}, transaction);

      if(status.toLowerCase() === IStatus.failed ) {
          
          await this.paymentRepository.update({tx_ref}, {status: IStatus.failed}, transaction);

          throw new BadRequestException("Failed transaction");

      }

  }

   async totalBalance(){

    const includeOption = {
      include: [
        {
          model: CoursesModel,
          attributes: ['price']
        }
      ],
    }
    


       const data = await this.paymentRepository.findAll({status: IStatus.successful}, <unknown>includeOption);


       const total = data.reduce((sum, tx) => {
        const price = typeof tx.course.price === "string" ? parseFloat(tx.course.price) : tx.course.price;
        return sum + price;
      }, 0);

      return {
        total, data
      };

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



  async findUserPaymentHistory(data: GetPageDto, user: IUser){

      const {page, limit} = data;

      const includeOption = {
        include: [
          {
            model: CoursesModel
          }
        ],

        order: [['createdAt', 'DESC']]

      }
      
      return await this.paymentRepository.findAllPaginated({ userId: user.id},  <unknown>includeOption, {page, limit} );

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

    return await this.paymentRepository.findAllPaginated({userId: user.id, status: IStatus.successful}, <unknown>includeOption, {page, limit});

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

    const hasAccess = await this.paymentRepository.findOne({ userId: user.id, courseId, status: IStatus.successful }, <unknown>includeOption);

    return hasAccess;

  }


  async getTopSellingCourses() {
    const includeOption = {
       // ✅ move `where` inside here
      attributes: [
        'courseId',
        [Sequelize.fn('COUNT', Sequelize.col('course_id')), 'salesCount']
      ],
      include: [
        {
          model: CoursesModel,
          attributes: ['id', 'title', 'price']
        }
      ],
      group: ['courseId', 'course.id'], // ✅ 'course.id' assumes no alias
      order: [[Sequelize.literal(`"salesCount"`), 'DESC']],
      limit: 10
    };
  
    return await this.paymentRepository.findAll(  { status: IStatus.successful } , <unknown>includeOption);
  }
  

}


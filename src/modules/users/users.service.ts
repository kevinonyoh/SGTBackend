import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, EmailVerificationDto, ForgotPasswordDto, GetOtpDto, VerifyForgotPasswordOtpDto, changePasswordDto,  } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { Transaction } from 'sequelize';
import * as bcrypt from "bcrypt";
import { EmailService } from 'src/shared/notification/email/email.service';
import * as helpers from 'src/common/utils/helper';
import { CacheStoreService } from 'src/shared/cache-store/cache-store.service';
import { IUser } from './interfaces/users.interface';

@Injectable()
export class UsersService {

  constructor(
  private readonly usersRepository: UsersRepository,
  private readonly emailService: EmailService,
  private readonly cacheStoreService: CacheStoreService,
  ){}

   async createUser(data: CreateUserDto, transaction: Transaction){
    
    const {email, password, fullName, ...rest} = data;

    const user = await this.usersRepository.findOne({email});

    if(user) throw new BadRequestException("email already exist");

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    const val =await this.usersRepository.create({...rest, email, fullName, password: hashPassword}, transaction);

    await this.emailService.signUp({email, fullName});


    const userData = val.toJSON();
    
    delete userData.password;

    const code = helpers.generateOtp();

    await this.cacheStoreService.set(code, email);

    await this.emailService.verificationOtp({email, fullName, code});

    return userData;

   }

   async OtpCode(data: GetOtpDto){

    const {email} = data;

    const user = await this.usersRepository.findOne({email});

    if(!user) throw new ForbiddenException("user does not exist");

    const {fullName} = user.toJSON();

    const code = helpers.generateOtp();

    await this.cacheStoreService.set(code, email);

    await this.emailService.verificationOtp({email, fullName, code});

   }

   async emailVerification(data: EmailVerificationDto, transaction: Transaction){
       
    const {otp, email} = data;

    const userEmail = await this.cacheStoreService.get(otp);
    
    if (userEmail !== email) throw new BadRequestException('Invalid otp');

    await this.usersRepository.update({email}, {isEmailVerified: true}, transaction);

   }

   async forgotPassword(data: ForgotPasswordDto ){
      
    const {email} = data;
    
    const user = await this.usersRepository.findOne({email});

    if(!user) throw new BadRequestException("email does not exist");

    const {fullName} = user.toJSON();

    const code = helpers.generateOtp();

    await this.cacheStoreService.set(code, email);

    await this.emailService.forgotPassword({email, fullName, code});

   }

   
  async verifyForgotPasswordOtp(data: VerifyForgotPasswordOtpDto, transaction: Transaction) {
   
    const { email, otp, password } = data;

    const userEmail = await this.cacheStoreService.get(otp);
    
    if (userEmail !== email) throw new BadRequestException('Invalid otp');

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    await this.usersRepository.update({email}, {password: hashPassword}, transaction);
    
  } 


  async changePassword(user: IUser,data: changePasswordDto, transaction: Transaction){

    const val = await this.usersRepository.findOne({email: user.email});

    const userData = val.toJSON();

    const {oldPassword, newPassword} = data

    const comparePassword = bcrypt.compareSync(oldPassword, userData.password);

    if (!comparePassword) throw new UnauthorizedException('Password is incorrect');

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(newPassword, salt);

    await this.usersRepository.update({email: user.email}, {password: hashPassword}, transaction);
    
  }



   async findUserByEmail(email: string){
       return await this.usersRepository.findOne({email});
   }

   async createGoogleAccount(data: any, transaction: Transaction){
     
    const {email, fullName} =  data;

    const payload = {
      email,
      fullName,
      isEmailVerified: true
    }

    await this.emailService.signUp({email, fullName});


    return await this.usersRepository.create(payload, transaction);

   }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminResetPasswordDto, CreateAdminDto, PageLimitDto, RemoveAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminRepository } from './repositories/admin.repository';
import { Transaction } from 'sequelize';
import * as helpers from 'src/common/utils/helper';
import * as bcrypt from "bcrypt";
import { EmailService } from 'src/shared/notification/email/email.service';
import { IAdmin } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly emailService: EmailService
  ){}
  
  async createAdmin(data: CreateAdminDto, transaction: Transaction){
    
    const {email} = data;
    
    const isEmail = await this.adminRepository.findOne({email}); 

    if(isEmail) throw new BadRequestException("Email already exist");

    const password = helpers.generateRandomPassword();

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);
     
    const val =  await this.adminRepository.create({...data, password: hashPassword}, transaction);

    const role = helpers.getRoleDescription(data.role)

    await this.emailService.adminCreated({ email, password, role });

    const adminContent =  val.toJSON();

    delete adminContent.password;

    return adminContent;

  }

  async deleteAdmin(id: string, transaction: Transaction){
     
 

    const isEmail = await this.adminRepository.findOne({id});

    if(!isEmail) throw new BadRequestException("admin does not exist");

    await this.adminRepository.delete({id}, transaction);

  }

  async findAdminByEmail(email: string){
     return await this.adminRepository.findOne({email});
  }

  async adminResetPassword(admin:IAdmin, data: AdminResetPasswordDto, transaction: Transaction){

    const user = await this.findAdminByEmail(admin.email);

    if(!user) throw new BadRequestException("admin does not exist");

    const comparePassword = await bcrypt.compareSync(data.oldPassword, user.password);

    if (!comparePassword) throw new BadRequestException('old Password is incorrect');

    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(data.password, salt);

    await this.adminRepository.update({email: admin.email}, {password: hashPassword}, transaction);



  }

  async findAllAdmin(data: PageLimitDto){
       const {page, limit} = data;

       const includeOption = {
        attributes: { exclude: ['password'] },   
        order: [['createdAt', 'DESC']]
  
      }

       return await this.adminRepository.findAllPaginated({}, <unknown>includeOption, {page, limit});
  }


}

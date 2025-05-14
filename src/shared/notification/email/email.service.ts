import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}

    async adminCreated(data: {email: string; password: string, role: string}) {
        await this.mailerService.sendMail({
          to: data.email,
          subject: 'Welcome to SGT',
          template: 'admin-created',
          context: {
            ...data
          }
        });
      }

    async signUp(data: {email: string, fullName: string}){
      await this.mailerService.sendMail({
        to: data.email,
        subject: '🎉 Welcome to SGT!',
        template: 'sign-up',
        context: {
          ...data
        }
      })
    }

    async verificationOtp(data: {email: string, fullName: string, code: string}){
        await this.mailerService.sendMail({
          to: data.email,
          subject: 'SGT - Your OTP Code',
        template: 'verification',
        context: {
          ...data
        }
        })
    }

    async forgotPassword( data: { email: string, fullName, code: string; }) {
      await this.mailerService.sendMail({
        to: data.email,
        subject: 'Forgot Password',
        template: './forgot-password',
        context: {
          fullName: data.fullName,
          ...data
        }
      });
    }
    
}
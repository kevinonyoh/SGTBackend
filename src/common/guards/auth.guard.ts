import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { IS_LOGIN_KEY } from '../decorators/login.decorator';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService, 
    private reflector: Reflector,
    private configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    const isLogin = this.reflector.getAllAndOverride<boolean>(IS_LOGIN_KEY, [context.getHandler(), context.getClass()]);


    if (isPublic || isLogin) return true;

    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    const client = request.headers['client'];


    if (!token) throw new UnauthorizedException('Valid token is required');

    if (!client) throw new UnauthorizedException('Client is required');

    if (!['user', 'admin'].includes(client)) throw new UnauthorizedException('Invalid client');

    const _token = token.replace(/(Bearer\s|bearer\s)/, '');
    
   
    const privateKey = process.env.PRIVATE_KEY;
     
    try {
      const decoded = await this.jwtService.verifyAsync(_token, { secret: privateKey });
   
      request.user = decoded;
    } catch (err) {
      if (/Token/.test(err.name)) throw new UnauthorizedException('Invalid token');
      
      throw err;
    }

    return true;
  }
}

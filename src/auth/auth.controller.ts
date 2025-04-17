import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post('signup')
async signUp(@Body() signupData:SignupDto){
return this.authService.signup(signupData);
}

@Post('login')
async login(@Body() credentials:loginDto){
return this.authService.login(credentials);
}

}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User.name) private UserModel:Model<User>){}

  async signup(signupData:SignupDto){
    const {email,password,name} = signupData;

    const emailInUse = await this.UserModel.findOne({
      email:signupData.email,
    })
    if(emailInUse){
      throw new BadRequestException('email already in use')
    }
    const hashedPassword = await bcrypt.hash(password,10)

    await this.UserModel.create({
      name,
      email,
      password: hashedPassword,
    })
    return { message: 'User created successfully' };
  }

  async login(credentials:loginDto){

    const {email , password} = credentials;
    const user = await this.UserModel.findOne({email});

    if(!user){
      throw new UnauthorizedException('Wrong credential');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      throw new UnauthorizedException('Wrong credential');
    }
  return{
    message:'login successfull'
  }
  }

}

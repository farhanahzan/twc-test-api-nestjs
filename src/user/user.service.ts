import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SignUPDto } from './dto/signup-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUPDto): Promise<{ token: string }> {
    const { email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async logIn(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({email})

    if(!user){
        throw new UnauthorizedException('Invalid Email or Password')
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)

    if(!isMatchedPassword){
        throw new UnauthorizedException('Invalid Email or Password')
    }

   
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}

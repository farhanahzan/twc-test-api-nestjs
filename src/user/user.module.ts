import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { config } from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { UserScema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      inject:[ConfigService],
      useFactory:(config:ConfigService)=>{
        return{
          secret:config.get<string>('JWT_SECRET'),
          signOptions:{
            expiresIn:config.get<string | number>('JWT_EXPIRES')
          }
        }
      }
    })
    ,MongooseModule.forFeature([{name:'User', schema:UserScema}])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[JwtStrategy, PassportModule]
})
export class UserModule {}

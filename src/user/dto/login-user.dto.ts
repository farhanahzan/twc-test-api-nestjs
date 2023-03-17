import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator/types/decorator/decorators';

export class LoginDto{
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please Enter Correct Email' })
    readonly email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password:string
}
import {
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsIn,
  IsEmpty,
} from 'class-validator';
import { User } from '../../user/schema/user.schema';


const selected_genders = ['male', 'female']

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter Correct Email' })
  readonly email: string;

  @IsNotEmpty()
  @Matches('07[1,2,5,6,7,8][0-9]+')
  readonly phonenumber: string;

  @IsNotEmpty()
  @IsIn(selected_genders)
  readonly gender: string;

  @IsEmpty({ message: 'You can not enter user-id' })
  readonly user: User;
}
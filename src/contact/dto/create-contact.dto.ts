import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  IsEmail,
  IsIn,
  IsEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { User } from '../../user/schema/user.schema';

const selected_genders = ['male', 'female'];

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please Enter Correct Email' })
  readonly email: string;

  @IsNotEmpty()
  // @Transform((value) => value.toString())
  // @IsPhoneNumber('LK',)
  readonly phonenumber: string;

  @IsNotEmpty()
  @IsIn(selected_genders)
  readonly gender: string;

  @IsEmpty({ message: 'You can not enter user-id' })
  readonly user: User;
}

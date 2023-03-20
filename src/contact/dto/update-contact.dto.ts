import {
  IsOptional,
  IsString,
  Matches,
  IsEmail,
  IsIn,
  IsEmpty,
} from 'class-validator';
import { User } from '../../user/schema/user.schema';

const selected_genders = ['male', 'female'];

export class CreateUpdateDto {
  @IsOptional()
  @IsString()
  readonly fullname: string;

  @IsOptional()
  @IsEmail({}, { message: 'Please Enter Correct Email' })
  readonly email: string;

  @IsOptional()
  // @Matches(
  //   '^(?:0|94|+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)d)d{6}$',
  // )
  readonly phonenumber: string;

  @IsOptional()
  @IsIn(selected_genders)
  readonly gender: string;

  @IsEmpty({ message: 'You can not enter user-id' })
  readonly user: User;
}

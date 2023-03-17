import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';


@Schema({ timestamps: true })
export class Contact {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  phonenumber: string;

  @Prop()
  gender: string;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref:'User'})
  user: User;
}


export const ContactSchema = SchemaFactory.createForClass(Contact)
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Document } from 'mongoose';


@Schema({timestamps:true})
export class User extends Document{
    @Prop({unique:[true,'Duplicate Email Entered!']})
    email:string

    @Prop()
    password:string
}

export const UserScema = SchemaFactory.createForClass(User)

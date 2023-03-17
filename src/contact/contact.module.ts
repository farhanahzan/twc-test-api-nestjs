import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './schema/contact.schema';

@Module({
  imports:[UserModule,
  MongooseModule.forFeature([{name:'Contact', schema:ContactSchema}])],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {}

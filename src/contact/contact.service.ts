import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Contact } from './schema/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: mongoose.Model<Contact>,
  ) {}

  async findAll(user: User): Promise<Contact[]> {
    const contacts = await this.contactModel.find({ user: user._id });
    return contacts;
  }

  async findContactById(_id: string): Promise<Contact> {

   
    const isValidId = mongoose.isValidObjectId(_id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct Id');
    }

    const contact = await this.contactModel.findById(_id);
    
    if (!contact) {
      throw new NotFoundException('Contect is not found');
    }

    return contact;
  }

  async createContact(contact: Contact, user: User): Promise<Contact> {
    const data = Object.assign(contact, { user: user._id });
    const res = await this.contactModel.create(data);
    return res;
  }

  async deleteContactById(_id: string): Promise<Contact> {
    const isValidId = mongoose.isValidObjectId(_id);
    if (!isValidId) {
      throw new BadRequestException('Please enter correct Id');
    }

    const contact = await this.contactModel.findByIdAndDelete(_id);
    if (!contact) {
      throw new NotFoundException('Contect is not found');
    }

    return contact;
  }
}

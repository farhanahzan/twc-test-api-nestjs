import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './schema/contact.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAllContacts(
    @Req()
    req,
  ): Promise<Contact[]> {
    return this.contactService.findAll(req.user);
  }

  @Get(':_id')
  @UseGuards(AuthGuard())
  async getContactById(@Param('_id') _id: string): Promise<Contact> {
    return this.contactService.findContactById(_id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createcontact(
    @Body()
    contact: CreateContactDto,
    @Req()
    req,
  ): Promise<Contact> {
    return this.contactService.createContact(contact, req.user);
  }

  @Delete(':_id')
  @UseGuards(AuthGuard())
  async deleteContactById(@Param('_id') _id: string): Promise<Contact> {
    return this.contactService.deleteContactById(_id);
  }
}

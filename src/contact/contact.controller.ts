import { Controller, Get, Param, Post,Body ,Req} from '@nestjs/common';
import {} from '@nestjs/common/decorators'
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './schema/contact.schema';

@Controller('contact')
export class ContactController {
    constructor(private contactService:ContactService){}

    @Get()
    async getAllContacts():Promise<Contact[]>{
        return this.contactService.findAll()
    }

    @Get(':_id')
    async getContactById(@Param('_id') _id:string):Promise<Contact>{
        return this.contactService.findContactById(_id);
    }

    @Post()
    async createcontact(
        @Body()
        contact:CreateContactDto,
        @Req()
        req
    ):Promise<Contact>{
        return this.contactService.createContact(contact, req.user)
    }
}

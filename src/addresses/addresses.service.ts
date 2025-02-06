import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../guides/dto/create-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressesService {

    constructor(
        @InjectRepository(Address)
        private readonly guidesRepository: Repository<Address>,
    ) { }

    async create(createAddressDto: CreateAddressDto) {
        const address = this.guidesRepository.create(createAddressDto);
        return await this.guidesRepository.save(address);
    } 

    async findOne(id: number) {
        return await this.guidesRepository.findOneBy({ id });
       
      }


}
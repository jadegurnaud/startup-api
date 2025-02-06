import { User } from "../../../users/entities/user.entity";
import { DataSource } from "typeorm";
import { addressData } from "../data/address.seed";
import * as bcrypt from 'bcrypt';
import { AddressesService } from "../../../addresses/addresses.service";

export class AddressSeeder {
    constructor(private readonly addressService: AddressesService) {}

    async seed() {

        for (const adData of addressData) {
            await this.addressService.create(adData);
        }
    }
}
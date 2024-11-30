import { User } from "../../../users/entities/user.entity";
import { DataSource } from "typeorm";
import { usersData } from "../data/users.seed";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../../../users/users.service";

export class UserSeeder {
    constructor(private readonly userService: UsersService) {}

    async seed() {
        const hashedUsers = await Promise.all(
            usersData.map(async (userData) => ({
                ...userData,
                password: await bcrypt.hash(userData.password, 10),
            }))
        );

        for (const userData of hashedUsers) {
            await this.userService.create(userData);
        }
    }
}
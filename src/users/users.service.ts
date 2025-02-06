import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createUserDto: CreateUserDto) {
    const founduser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (founduser) {
      throw new Error('Email already in use');
    }
    const user = new User(createUserDto);
    await this.entityManager.save(user);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map(user => {
      const { password, ...result } = user;
      return result;
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async findFollowers(id: number) {
    const user = await this.usersRepository.findOne({ where: { id }, relations: ['followers'] });
    if (!user) {
      throw new Error('User not found');
    }
    return user.followers.length;
  }

  async followUser(userId: number, followerId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['following'] });
    const follower = await this.usersRepository.findOne({ where: { id: followerId } });
    
    if (!user || !follower) {
      throw new Error('User not found');
    }

    if (!user.following) {
      user.following = [];
    }
    user.following.push(follower);
    await this.entityManager.save(user);
  }

  async unfollowUser(userId: number, followerId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['following'] });
    const follower = await this.usersRepository.findOne({ where: { id: followerId } });
    
    if (!user || !follower) {
      throw new Error('User not found');
    }

    if (!user.following) {
      user.following = [];
    }

    user.following = user.following.filter(f => f.id !== followerId);
    await this.entityManager.save(user);
  }

  async isFollowing(userId: number, followerId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['following'] });
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.following) {
      return false;
    }

    return user.following.some(f => f.id === followerId);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUserDto);
    await this.entityManager.save(user);
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });
  }
}

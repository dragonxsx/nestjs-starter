import { Module } from '@nestjs/common';
import User from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    FilesModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

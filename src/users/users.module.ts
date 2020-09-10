import { Module } from '@nestjs/common';
import User from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { FilesModule } from '../files/files.module';
import { UsersController } from './users.controller';
import { PrivateFilesModule } from '../privateFiles/privateFiles.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    FilesModule,
    PrivateFilesModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

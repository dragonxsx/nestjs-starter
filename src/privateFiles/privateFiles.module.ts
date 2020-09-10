import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PrivateFile from './privateFile.entity';
import { ConfigModule } from '@nestjs/config';
import { PrivateFilesService } from './privateFiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrivateFile]),
    ConfigModule,
  ],
  providers: [PrivateFilesService],
  exports: [PrivateFilesService],
})
export class PrivateFilesModule {
}
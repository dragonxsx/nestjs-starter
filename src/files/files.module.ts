import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { Module } from '@nestjs/common';
import PublicFile from './publicFile.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicFile]),
    ConfigModule
  ],
  providers: [FilesService],
  exports:[FilesService]
})
export class FilesModule {}

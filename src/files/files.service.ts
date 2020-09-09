import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PublicFile from './publicFile.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk'
import {v4 as uuid} from 'uuid'

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService
  ) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AW'),
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    }).promise();

    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });

    await this.publicFilesRepository.save(newFile);
    return newFile;
  }
}
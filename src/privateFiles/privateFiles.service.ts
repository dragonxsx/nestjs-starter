import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import PrivateFile from './privateFile.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PrivateFilesService {
  constructor(
    @InjectRepository(PrivateFile)
    private privateFilesRepository: Repository<PrivateFile>,
    private readonly configService: ConfigService,
  ) {
  }

  async uploadPrivateFile(dataBuffer: Buffer, ownerId: number, fileName: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
      Body: dataBuffer,
      Key: `${uuid()}-${fileName}`,
    }).promise();

    const newFile = this.privateFilesRepository.create({
      key: uploadResult.Key,
      owner: {
        id: ownerId,
      },
    });

    await this.privateFilesRepository.save(newFile);
    return newFile;
  }

  async getPrivateFile(fileId: number) {
    const s3 = new S3();
    const fileInfo = await this.privateFilesRepository.findOne({
      id: fileId
    }, {
      relations: ['owner']
    });

    if (fileInfo) {
      const stream = await s3.getObject({
        Bucket: this.configService.get('AWS_PRIVATE_BUCKET_NAME'),
        Key: fileInfo.key
      }).createReadStream();

      return {
        stream,
        info: fileInfo
      }
    }

    throw new NotFoundException();
  }
}
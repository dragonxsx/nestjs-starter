import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { mockedJwtService } from '../utils/mocks/jwt.service';
import { mockedConfigService } from '../utils/mocks/config.service';
import { FilesService } from '../files/files.service';
import { mockedFilesService } from '../utils/mocks/files.service';
import { PrivateFilesService } from '../privateFiles/privateFiles.service';
import { Connection } from 'typeorm';
import { mockedConnection } from '../utils/mocks/connection';
import { mockedPrivateFiles } from '../utils/mocks/privateFiles.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: getRepositoryToken(User),
          useValue: {}
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: FilesService,
          useValue: mockedFilesService
        },
        {
          provide: PrivateFilesService,
          useValue: mockedPrivateFiles
        },
        {
          provide: Connection,
          useValue: mockedConnection
        }
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof service.getCookieWithJwtAccessToken(userId),
      ).toEqual('string');
    });
  });
});

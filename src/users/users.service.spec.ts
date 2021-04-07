import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './user.entity';
import { FilesService } from '../files/files.service';
import { PrivateFilesService } from '../privateFiles/privateFiles.service';
import { Connection } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let findOne: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne,
          },
        },
        {
          provide: FilesService,
          useValue: {}
        },
        {
          provide: PrivateFilesService,
          useValue: {}
        },
        {
          provide: Connection,
          useValue: {}
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      })

      it('should return the user', async () => {
        const fetchedUser = await service.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      })
    })

    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      })

      it('should throw an error', async () => {
        await expect(service.getByEmail('test@test.com')).rejects.toThrow();
      })
    })
  })
});

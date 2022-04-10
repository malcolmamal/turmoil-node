import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { mockPromiseOnce, prepareTestServices } from '../utils/testing-modules';
import { UsersModule } from './users.module';
import { User } from './users.entity';
import { FindManyOptions } from 'typeorm';

// describe('UsersService', () => {
//   let service: UsersService;
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UsersService],
//     }).compile();
//
//     service = module.get<UsersService>(UsersService);
//   });
//
//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

describe('userService', () => {
  const testService = prepareTestServices(UsersModule, [User], [], {
    attemptSvc: UsersService,
    attemptRepo: { repository: User },
  });

  it('should be defined', async () => {
    expect(testService).toBeDefined();

    const tstUser1 = {
      id: 1,
      name: 'alan',
      password: '123aaa',
      email: 'damn@o.pl',
    } as User;
    const tstUser2 = {
      id: 2,
      name: 'dale',
      password: '32123aaa',
      email: 'damny@o.pl',
    } as User;

    const expectedFindOptions: FindManyOptions<User> = {
      where: { name: 'dale' },
    };

    mockPromiseOnce(
      testService.attemptRepo,
      'find',
      [tstUser1, tstUser2],
      expectedFindOptions as any,
    );
    expect(await testService.attemptSvc.get(1)).toEqual(tstUser1);

    console.log(testService.attemptRepo.find({ id: 1 }));
  });
});

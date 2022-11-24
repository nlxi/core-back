import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from './AppController.js';
import { AppService } from '../Service/AppService.js';
import { Foo } from '../Entity/Foo.js';
import { FooResolver } from '../Resolver/FooResolver.js';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    count: jest.fn((entity) => entity),
  }),
);

describe('AppController/FooResolver', () => {
  let appController: AppController;
  let appResolver: FooResolver;
  let repositoryMock: MockType<Repository<Foo>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        FooResolver,
        { provide: getRepositoryToken(Foo), useFactory: repositoryMockFactory },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appResolver = app.get<FooResolver>(FooResolver);
    repositoryMock = app.get(getRepositoryToken(Foo));
  });

  describe('root', () => {
    it('Controller should return "Hello World!"', async () => {
      repositoryMock.count.mockReturnValue(10);
      await expect(appController.getHello()).resolves.toBe('Hello with 10');
    });
    it('Resolver should return "Hello World!"', async () => {
      repositoryMock.count.mockReturnValue(11);
      await expect(appResolver.hello()).resolves.toBe('Hello with 11');
    });
  });
});

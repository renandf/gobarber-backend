import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

const testUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
};

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute(testUser);

    expect(user).toHaveProperty('id');
  });

  it('should not allow user creation if email already exists in the DB', async () => {
    await createUser.execute(testUser);

    await expect(createUser.execute(testUser)).rejects.toBeInstanceOf(AppError);
  });
});

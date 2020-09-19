import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

const testUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '1234567890',
};

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute(testUser);

    expect(user).toHaveProperty('id');
  });

  it('should not allow user creation with existing email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute(testUser);

    await expect(createUser.execute(testUser)).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

const testUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
};

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create(testUser);

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Dawson',
      email: 'jane.dawson@email.com',
    });

    expect(updatedUser.name).toBe('Jane Dawson');
    expect(updatedUser.email).toBe('jane.dawson@email.com');
  });

  it('should not allow profile update if user is not found', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'NonExistentID',
        name: 'Non-existent User',
        email: 'test@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow email update if email already exists in the DB', async () => {
    await fakeUsersRepository.create(testUser);

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@email.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: testUser.name,
        email: testUser.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create(testUser);

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      old_password: user.password,
      password: '654321',
    });

    expect(updatedUser.password).toBe('654321');
  });

  it('should not be able to update the password if old password is missing', async () => {
    const user = await fakeUsersRepository.create(testUser);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create(testUser);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        old_password: 'wrong-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

const testUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: '123456',
};

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create(testUser);

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe(testUser.name);
    expect(profile.email).toBe(testUser.email);
  });

  it('should not be able to show non-existent user profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import type { CreateUserPayload } from '@energywebfoundation/generic-green-proofs-api';
import { faker } from '@faker-js/faker';

export const generateUserPayload = (user?: Partial<CreateUserPayload>): CreateUserPayload => {
  const firstName = user?.data?.firstName ?? faker.person.firstName();
  const lastName = user?.data?.lastName ?? faker.person.lastName();
  const email = user?.email ?? faker.internet.email({ firstName, lastName }).toLowerCase();

  return {
    email,
    name: `${firstName} ${lastName}`,
    data: {
      firstName,
      lastName,
      email,
    },
  };
};

import { UserRole } from '../generated/prisma-client-js';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeAddress() {
  return {
    fullName: faker.lorem.words(5),
    mobile: faker.lorem.words(5),
    addressOne: faker.lorem.words(5),
    adrressTwo: undefined,
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    zip: undefined,
    landmark: undefined,
    country: faker.lorem.words(5),
    state: faker.lorem.words(5),
    city: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeAddressComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    fullName: faker.lorem.words(5),
    mobile: faker.lorem.words(5),
    addressOne: faker.lorem.words(5),
    adrressTwo: undefined,
    latitude: faker.number.float(),
    longitude: faker.number.float(),
    zip: undefined,
    landmark: undefined,
    country: faker.lorem.words(5),
    state: faker.lorem.words(5),
    city: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    userId: undefined,
    tenantId: undefined,
  };
}
export function fakeSubscription() {
  return {
    name: faker.person.fullName(),
    features: faker.lorem.words(5).split(' '),
    cost: faker.number.float(),
    priceSymbol: faker.lorem.words(5),
    costDuration: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeSubscriptionComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: faker.person.fullName(),
    features: faker.lorem.words(5).split(' '),
    isPopular: false,
    isActive: true,
    cost: faker.number.float(),
    priceSymbol: faker.lorem.words(5),
    costDuration: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTenant() {
  return {
    name: faker.person.fullName(),
    phone: faker.lorem.words(5),
    email: faker.internet.email(),
    website: undefined,
    lat: faker.number.float(),
    long: faker.number.float(),
    logo: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTenantComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    name: faker.person.fullName(),
    phone: faker.lorem.words(5),
    email: faker.internet.email(),
    website: undefined,
    lat: faker.number.float(),
    long: faker.number.float(),
    logo: undefined,
    userId: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakePost() {
  return {
    updatedAt: faker.date.anytime(),
    title: faker.lorem.words(5),
    content: undefined,
  };
}
export function fakePostComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    title: faker.lorem.words(5),
    content: undefined,
    published: false,
    authorId: faker.number.int(),
  };
}
export function fakeProfile() {
  return {
    bio: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeProfileComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    bio: undefined,
    userId: faker.number.int(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUser() {
  return {
    email: faker.internet.email(),
    name: undefined,
    password: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    email: faker.internet.email(),
    name: undefined,
    role: UserRole.USER,
    password: undefined,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeToken() {
  return {
    token: faker.lorem.words(5),
    expirestAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTokenComplete() {
  return {
    id: faker.number.int({ max: 2147483647 }),
    token: faker.lorem.words(5),
    expirestAt: faker.date.anytime(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
    userId: undefined,
  };
}

// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '../../../prisma/generated/prisma-client-js';
// import { withAccelerate } from '@prisma/extension-accelerate';
// 
// @Injectable()
// export class DbService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     super();
//   }
//   async onModuleInit() {
//     this.$extends(withAccelerate());
//     await this.$connect();
//   }
// 
//   async disconnect() {
//     await this.$disconnect();
//   }
// }

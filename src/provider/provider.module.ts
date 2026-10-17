import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProviderController } from './provider.controller.js';
import { ProviderService } from './provider.service.js';
import { Provider, ProviderSchema } from './schemas/provider.schema/provider.schema.js';
import { User, UserSchema } from '../auth/schemas/user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Provider, ProviderDocument } from './schemas/provider.schema/provider.schema';
import { UpdateProviderProfileDto } from './dto/update-provider-profile.dto/update-provider-profile.dto';
import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class ProviderService {
  constructor(
    @InjectModel(Provider.name)
    private readonly providerModel: Model<ProviderDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async updateProfile(
    userId: string,
    dto: UpdateProviderProfileDto,
  ) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== 2) {
      throw new BadRequestException('User is not a provider');
    }

    const { userId: _, ...profileData } = dto;

    const existingProfile = await this.providerModel.findOne({ userId });
    if (!existingProfile) {
      return this.providerModel.create({
        userId,
        ...profileData,
      });
    }

    return this.providerModel.findOneAndUpdate(
      { userId },
      { $set: profileData },
      { new: true, runValidators: true },
    );
  }

  async getMyProfile(userId: string) {
    const provider = await this.providerModel.findOne({ userId });

    if (!provider) {
      throw new NotFoundException('Provider profile not found');
    }

    return provider;
  }

  async getAllProviders(specialty?: string) {
    const filter: Record<string, unknown> = {
      isAvailable: true,
    };

    if (specialty) {
      filter.specialty = { $regex: specialty, $options: 'i' };
    }

    return this.providerModel.find(filter).exec();
  }
}

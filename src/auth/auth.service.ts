import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto/register.dto';
import { LoginDto } from './dto/login.dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });

    return {
      accessToken: await this.jwtService.signAsync({
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      }), user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        patientType: user.patientType,
        providerType: user.providerType,
      }
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      email: loginDto.email,
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id).select('-password');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}

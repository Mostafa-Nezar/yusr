
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicationModule } from './medication/medication.module';
import { ProviderModule } from './provider/provider.module';
import { PatientModule } from './patient/patient.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');

        if (!uri) {
          throw new Error(
            'MONGO_URI is not configured in the server environment',
          );
        }

        return { uri };
      },
    }),

    AuthModule,

    AppointmentModule,

    MedicationModule,

    ProviderModule,

    PatientModule,

    PharmacyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

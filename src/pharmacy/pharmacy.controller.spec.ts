import { ServiceUnavailableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';

describe('PharmacyController', () => {
  let controller: PharmacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
      providers: [{ provide: PharmacyService, useValue: {} }],
    }).compile();

    controller = module.get<PharmacyController>(PharmacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should reject prescription image uploads while they are disabled', () => {
    expect(() => controller.uploadPrescription()).toThrow(
      ServiceUnavailableException,
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { FaixasController } from './faixas.controller';

describe('FaixasController', () => {
  let controller: FaixasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaixasController],
    }).compile();

    controller = module.get<FaixasController>(FaixasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

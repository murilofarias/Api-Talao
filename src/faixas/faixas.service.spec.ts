import { Test, TestingModule } from '@nestjs/testing';
import { FaixasService } from './faixas.service';

describe('FaixasService', () => {
  let service: FaixasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaixasService],
    }).compile();

    service = module.get<FaixasService>(FaixasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

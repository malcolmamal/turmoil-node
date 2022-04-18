import { Test, TestingModule } from '@nestjs/testing';
import { TooltipService } from './tooltip.service';

describe('TooltipService', () => {
  let service: TooltipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TooltipService],
    }).compile();

    service = module.get<TooltipService>(TooltipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TooltipController } from './tooltip.controller';

describe('TooltipController', () => {
  let controller: TooltipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TooltipController],
    }).compile();

    controller = module.get<TooltipController>(TooltipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

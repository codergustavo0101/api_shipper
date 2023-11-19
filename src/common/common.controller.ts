import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { CommonService } from './common.service';

@ApiTags('common')
@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Public()
  @Get('/ping')
  async ping() {
    return this.commonService.ping();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  ping() {
    return 'pong';
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { WeddingEventService } from './wedding_events.service';
import { WeddingEventValidator } from '../interfaces';
import { TransferError } from '../interfaces/general.function';

@Controller('events')
export class WeddingEventController {
  constructor(private weddingEventService: WeddingEventService) {}
  @Get('/')
  getWeddingEvents() {
    return this.weddingEventService.getWeddingEvents();
  }

  @Get('/:id')
  getWeddingEventById(@Param('id') id: string) {
    // debugger;
    try {
      const idResult = WeddingEventValidator.event_id.validate(id);
      if (idResult.error) {
        throw idResult.error.details[0];
      }
      return this.weddingEventService.getWeddingEvents({
        event_id: idResult.value,
      });
    } catch (error) {
      TransferError(error);
    }
  }
}

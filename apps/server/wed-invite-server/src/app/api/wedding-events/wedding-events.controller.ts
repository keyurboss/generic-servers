import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  weddingEventObjectValidator,
  WeddingEventType,
  weddingEventValidator,
} from '../../interfaces';
import {
  GetUUID,
  TransferError,
  TransferValidationError,
} from '../../interfaces';
import { WeddingEventService } from './wedding-events.service';

@Controller('events')
export class WeddingEventController {
  constructor(private weddingEventService: WeddingEventService) {}
  @Get('/short/:name')
  async getWeddingEventByShortName(@Param('name') name: string) {
    // debugger;
    try {
      const eventName = weddingEventValidator.event_short_name.validate(name);
      if (eventName.error) {
        throw eventName.error.details[0];
      }
      const result = await this.weddingEventService.getWeddingEvents({
        event_short_name: eventName.value,
      });
      return {
        success: result.length === 1 ? true : false,
        result: result.length === 1 ? result[0] : null,
      };
    } catch (error) {
      TransferError(error);
    }
  }

  @Get('/')
  getWeddingEvents() {
    return this.weddingEventService.getWeddingEvents();
  }

  @Get('/:id')
  getWeddingEventById(@Param('id') id: string) {
    // debugger;
    try {
      const idResult = weddingEventValidator.event_id.validate(id);
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

  @Put('/add')
  async addWeddingEvent(@Body() body: WeddingEventType) {
    body.event_id = 1;
    body.event_second_id = GetUUID();
    const a = weddingEventObjectValidator.validate(body);
    if (a.error) {
      TransferValidationError(a.error.details);
    }
    try {
      return await this.weddingEventService.insertWeddingEvents(a.value);
    } catch (e) {
      return TransferError(e);
    }
  }

  @Post('/update')
  async updateWeddingEvent(@Body() body: WeddingEventType) {
    const a = weddingEventObjectValidator.validate(body);
    if (a.error) {
      TransferValidationError(a.error.details);
    }
    try {
      return await this.weddingEventService.updateWeddingEvents(a.value);
    } catch (e) {
      return TransferError(e);
    }
  }

  @Delete('/delete')
  async deleteWeddingEvent(@Body() body: WeddingEventType) {
    const a = weddingEventObjectValidator.validate(body);
    if (a.error) {
      TransferValidationError(a.error.details);
    }
    try {
      return await this.weddingEventService.deleteWeddingEvents(a.value);
    } catch (e) {
      return TransferError(e);
    }
  }
}

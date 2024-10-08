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
  GetUUID,
  TransferError,
  TransferValidationError,
  eventManagersObjectValidator,
  EventManagersType,
  EventManagersValidator,
} from '../../interfaces';
import { EventManagersService } from './event-managers.service';

@Controller('managers')
export class EventManagersController {
  constructor(private eventManagersService: EventManagersService) {}
  // @Get('/short/:name')
  // async getWeddingEventByShortName(@Param('name') name: string) {
  //   // debugger;
  //   try {
  //     const eventName = EventManagersValidator.event_short_name.validate(name);
  //     if (eventName.error) {
  //       throw eventName.error.details[0];
  //     }
  //     const result = await this.weddingEventService.getWeddingEvents({
  //       event_short_name: eventName.value,
  //     });
  //     return {
  //       success: result.length === 1 ? true : false,
  //       result: result.length === 1 ? result[0] : null,
  //     };
  //   } catch (error) {
  //     TransferError(error);
  //   }
  // }

  // @Get('/')
  // getWeddingEvents() {
  //   return this.weddingEventService.getWeddingEvents();
  // }

  @Get('/byEventId/:id')
  getManagersByEventId(@Param('id') id: string) {
    // debugger;
    try {
      const idResult = EventManagersValidator.em_event_second_id.validate(id);
      if (idResult.error) {
        throw idResult.error.details[0];
      }
      return this.eventManagersService.getEventManagers({
        em_event_second_id: idResult.value,
      });
    } catch (error) {
      TransferError(error);
    }
  }

  @Get('/:id')
  getManagersById(@Param('id') id: string) {
    // debugger;
    try {
      const idResult = EventManagersValidator.em_id.validate(id);
      if (idResult.error) {
        throw idResult.error.details[0];
      }
      return this.eventManagersService.getEventManagers({
        em_id: idResult.value,
      });
    } catch (error) {
      TransferError(error);
    }
  }

  @Put('/add')
  async addWeddingEvent(@Body() body: EventManagersType) {
    body.em_id = 1;
    body.em_event_second_id = GetUUID();
    const a = eventManagersObjectValidator.validate(body);
    if (a.error) {
      TransferValidationError(a.error.details);
    }
    try {
      return await this.eventManagersService.insertEventManagers(a.value);
    } catch (e) {
      return TransferError(e);
    }
  }

  @Post('/update')
  async updateWeddingEvent(@Body() body: EventManagersType) {
    const a = eventManagersObjectValidator.validate(body);
    if (a.error) {
      TransferValidationError(a.error.details);
    }
    try {
      return await this.eventManagersService.updateEventManagers(a.value);
    } catch (e) {
      return TransferError(e);
    }
  }

  @Delete('/delete')
  async deleteWeddingEvent(@Body() body: EventManagersType) {
    const a = eventManagersObjectValidator.validate(body);
    if (a.error) {
      TransferValidationError(a.error.details);
    }
    try {
      return await this.eventManagersService.deleteEventManagers(a.value);
    } catch (e) {
      return TransferError(e);
    }
  }
}

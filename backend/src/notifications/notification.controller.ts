import { Controller, Get, Post, Param, Body, Put } from '@nestjs/common';
import { NotificationsService } from '../notifications/notification.service';
import { Notification } from './notifications.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(
    @Body() createNotificationDto: Partial<Notification>,
  ): Promise<Notification> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  async getAllNotifications(): Promise<Notification[]> {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  async getNotification(
    @Param('id') notificationId: string,
  ): Promise<Notification> {
    return this.notificationsService.findOne(notificationId);
  }

  @Put(':id/read')
  async markAsRead(@Param('id') notificationId: string): Promise<Notification> {
    return this.notificationsService.markAsRead(notificationId);
  }
}

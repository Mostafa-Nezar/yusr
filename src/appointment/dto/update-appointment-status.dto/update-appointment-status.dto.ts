import { IsNotEmpty, IsEnum } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class UpdateAppointmentStatusDto {
  @IsNotEmpty()
  @IsEnum(AppointmentStatus, {
    message: 'status must be one of: Pending, Confirmed, Cancelled, Completed',
  })
  status!: AppointmentStatus;
}

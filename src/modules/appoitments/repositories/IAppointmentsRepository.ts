import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindDailyAvailabilityInMonthDTO from '../dtos/IFindDailyAvailabilityInMonthDTO';
import IFindHourlyAvailabilityInDayDTO from '../dtos/IFindHourlyAvailabilityInDayDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findDailyAvailabilityInMonth(
    data: IFindDailyAvailabilityInMonthDTO,
  ): Promise<Appointment[]>;
  findHourlyAvailabilityInDay(
    data: IFindHourlyAvailabilityInDayDTO,
  ): Promise<Appointment[]>;
}

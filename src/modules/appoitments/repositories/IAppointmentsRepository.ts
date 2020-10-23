import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindDailyAvailabilityInMonthDTO from '../dtos/IFindDailyAvailabilityInMonthDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findDailyAvailabilityInMonth(
    data: IFindDailyAvailabilityInMonthDTO,
  ): Promise<Appointment[]>;
}

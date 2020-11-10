import { v4 } from 'uuid';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';

import IAppointmentRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';
import IFindDailyAvailabilityInMonthDTO from '@modules/appoitments/dtos/IFindDailyAvailabilityInMonthDTO';
import IFindHourlyAvailabilityInDayDTO from '@modules/appoitments/dtos/IFindHourlyAvailabilityInDayDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findDailyAvailabilityInMonth({
    provider_id,
    year,
    month,
  }: IFindDailyAvailabilityInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findHourlyAvailabilityInDay({
    provider_id,
    year,
    month,
    day,
  }: IFindHourlyAvailabilityInDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day,
    );

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;

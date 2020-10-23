import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';
import IFindDailyAvailabilityInMonthDTO from '@modules/appoitments/dtos/IFindDailyAvailabilityInMonthDTO';

import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async findDailyAvailabilityInMonth({
    provider_id,
    month,
    year,
  }: IFindDailyAvailabilityInMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appoitment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appoitment);

    return appoitment;
  }
}

export default AppointmentsRepository;

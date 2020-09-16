import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appoitments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appoitments/dtos/ICreateAppointmentDTO';

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

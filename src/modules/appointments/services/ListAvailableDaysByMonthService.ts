/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{ day: number; available: boolean }>;

@injectable()
class ListAvailableDaysByMonthService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAppointmentsByMonth(
      {
        provider_id,
        year,
        month,
      },
    );

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      {
        length: daysInMonth,
      },
      (_, index) => index + 1,
    );

    const currentDate = new Date(Date.now());

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available:
          appointmentsInDay.length < 10 &&
          new Date(year, month - 1, day, 23, 59, 59) >= currentDate,
      };
    });

    return availability;
  }
}

export default ListAvailableDaysByMonthService;

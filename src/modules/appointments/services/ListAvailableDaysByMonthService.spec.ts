import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListAvailableDaysByMonthService from './ListAvailableDaysByMonthService';

let listDays: ListAvailableDaysByMonthService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListAvailableDaysByMonth', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDays = new ListAvailableDaysByMonthService(fakeAppointmentsRepository);
  });

  it('should be able to list the days where the provider is available to work', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 3, 8).getTime();
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 5, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: '121212',
      user_id: '987654321',
      date: new Date(2020, 9, 6, 8, 0, 0),
    });

    const availability = await listDays.execute({
      provider_id: '121212',
      year: 2020,
      month: 10,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 4, available: true },
        { day: 5, available: false },
        { day: 6, available: true },
        { day: 7, available: true },
      ]),
    );
  });

  it('should not be able to list the days in the past as available to work', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 23, 8).getTime();
    });

    const availability = await listDays.execute({
      provider_id: '121212',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 21, available: false },
        { day: 22, available: false },
        { day: 23, available: true },
        { day: 24, available: true },
        { day: 25, available: true },
      ]),
    );
  });
});

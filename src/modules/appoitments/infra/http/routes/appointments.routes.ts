import { Router, response } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";

import AppointmentsRepository from "@modules/appoitments/repositories/AppointmentsRepository";
import CreateAppointmentService from "@modules/appoitments/services/CreateAppointmentService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const appoitmentsRouter = Router();

appoitmentsRouter.use(ensureAuthenticated);

appoitmentsRouter.get("/", async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();

	return response.json(appointments);
});

appoitmentsRouter.post("/", async (request, response) => {
	const { provider_id, date } = request.body;

	const parsedDate = parseISO(date);

	const createAppointment = new CreateAppointmentService();

	const appointment = await createAppointment.execute({
		provider_id,
		date: parsedDate,
	});

	return response.json(appointment);
});

export default appoitmentsRouter;

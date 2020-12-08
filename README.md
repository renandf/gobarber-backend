# GoBarber
GoBarber is a fictitious project created as part of the GoStack course from [Rocketseat](https://rocketseat.com.br/). GoStack is a course covering _React JS_, _React Native_, and _Node.js_. The project is composed of:

- **GoBarber mobile** - [GitHub](https://github.com/renandf/gobarber-mobile) - the mobile app which allows users to create an account and book appointments with "barbers".
- **[GoBarber web](https://gobarber.renancastro.com/)** - [GitHub](https://github.com/renandf/gobarber-web) - an online app for "barbers" to be able to see their schedule of appointments.
- **GoBarber API** (this project) - the back-end portion of the GoBarber project responsible for saving data from the mobile and web apps into the database and also feeding data into those apps.

## GoBarber API
The responsibility of this project is to provide Create, Read, Update, and Delete ([CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)) functionalities for the GoBarber web and mobile apps. The GoBarber API is responsible for intermediating the flow of information between the apps and the database.

**Highlighted features and technology:**
- Built with Node.js and [TypeScript](https://www.typescriptlang.org/)
- Uses [TypeORM](https://typeorm.io/#/) as its Object-Relational-Mapper
- Uses [Postgres](https://www.postgresql.org/) for structured data storage (e.g. users, appointments)
- Uses [MongoDB](https://www.mongodb.com/) for unstructured data storage (e.g. notifications/logs)
- Uses [Redis](https://redis.io/) as a cache (e.g. provider availability for a specific day)
- Unit test examples using [Jest](https://jestjs.io/)
- Continuous Integration/Delivery ([CI/CD](https://en.wikipedia.org/wiki/CI/CD)) via GitHub actions

## GoBarber API - endpoints
**Appointments**
- Create appointment: `POST` : `/appointments`
- List providers: `GET` : `/providers`
- List provider own appointments: `GET` : `/appointments/me`
- Provider month availability (per day): `GET` : `/providers/:id/month-availability`
- Provider day availability (per hour): `GET` : `/providers/:id/day-availability`

**Users**
- Register: `POST` : `/users`
- Forgot password: `POST` : `/password/forgot`
- Forgot password: `POST` : `/password/reset`
- Authenticate: `POST` : `/sessions`
- Show profile: `GET` : `/profile`
- Update profile: `PUT` : `/profile`
- Update avatar: `PTCH` : `/users/avatar`

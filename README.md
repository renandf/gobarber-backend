# GoBarber API
**Appointments**
- Create appointment: `POST` `/appointments`
- List providers: `GET` `/providers`
- List provider own appointments: `GET` `/appointments/me`
- Provider month availability (per day): `GET` `/providers/:id/month-availability`
- Provider day availability (per hour): `GET` `/providers/:id/day-availability`

**Users**
- Register: `POST` `/users`
- Forgot password: `POST` `/password/forgot`
- Forgot password: `POST` `/password/reset`
- Authenticate: `POST` `/sessions`
- Show profile: `GET` `/profile`
- Update profile: `PUT` `/profile`
- Update avatar: `PTCH` `/users/avatar`

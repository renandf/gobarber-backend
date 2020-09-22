# Forgot password
**Functional Requirements**
- User should be able to request a password reset link by informing their email;
- User should receive an email with instructions to reset their password;
- User should be able to reset their password;

**Non-functional Requirements**
- Use Mailtrap for validating emails on DEV;
- Use Amazon SES to send emails on PROD;
- Sending emails should happen as a background job;

**Business Requirements**
- The link sent in the reset password email should expire in 2 hours;
- User should confirm the new password with an additional "confirm new password" field;

# Update profile
**Functional Requirements**
- User should be able to update their profile (name, email, password);

**Non-functional Requirements**

**Business Requirements**
- User should not be able to update their email with an existing email;
- User needs to provide current password when creating new password;
- User should confirm the new password with an additional "confirm new password" field;

# Service provider dashboard
**Functional Requirements**
- Service provider should be able to see all appointments for a specific day;
- Service provider should be notified of every new appointment;
- Service provider should be able to see all unread notifications;

**Non-functional Requirements**
- Daily appointments should be saved in cache;
- Notifications should be saved on MongoDB;
- Notifications should be sent in real time using Socket.io;

**Business Requirements**
- Notification should have a read/unread status;


# Book appointment
**Functional Requirements**
- User should be able to see all service providers;
- User should be able to see a provider's available days;
- User should be able to see available spots in a specific day;
- User should be able to book an appointment in an available spot;

**Non-functional Requirements**
- List of providers should be saved in cache;

**Business Requirements**
- Each booking should last 1 hour;
- Bookings should be available between 8:00 and 18:00 (last available spot at 17:00)
- User should not be able to book if spot is already taken;
- User should not be able to book anything in the past;
- User should not be able to book an appointment with themselves;

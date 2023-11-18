# Patient Tracker App

Creating a patient tracker app that allows doctors to track information about patients and appointments. End users can only view their appointments. Whereas an administrator can make, cancel and edit appointments and patient information

## System Architecture

The Patient Tracker App is built using the following web stack:

- **Frontend**: React with create-react-app, styled using Sass and react-bootstrap.
- **Backend**: Express.js.
- **Database**: MongoDB.

### Motivation for Architecture

#### Frontend

- **React**: Offers a flexible and efficient way to build user interfaces, providing a smooth and responsive user experience.
- **create-react-app**: Simplifies the React application setup, allowing quick development without getting slowed down or hindered by configuration.
- **Sass and react-bootstrap**: Sass provides a more maintainable and organized way to write CSS, and react-bootstrap offers pre-designed components for a consistent and visually appealing UI.

#### Backend

- **Express.js**: A lightweight and flexible Node.js framework that simplifies the development of stable and efficient server-side applications.

#### Database

- **MongoDB**: A NoSQL database that allows for flexible and efficient data storage, important for handling patient and appointment data.

### Deployment

The app is deployed on CodeSandbox, a cloud-based development environment. CodeSandbox provides a convenient platform for rapid prototyping and testing of React applications without the need for local development setups.

#### Why CodeSandbox?

1. **Accessibility**: CodeSandbox is accessible from any device with an internet connection, allowing collaboration and testing across different environments.

2. **No Setup Required**: CodeSandbox eliminates the need for local development setups, making it easy for developers to dive into the project without worrying about environment configurations.

3. **Instant Sharing**: CodeSandbox allows for smooth sharing of the application, facilitating collaboration and feedback from team members or stakeholders.

4. **Live Preview**: CodeSandbox provides a live preview of the application, allowing developers to see changes in real-time without the need for manual refreshing.

5. **Community and Templates**: CodeSandbox has a supportive community and offers templates that accelerate the development process by providing a starting point for React applications.

By deploying on CodeSandbox, the development and testing process becomes more streamlined and collaborative, making it an ideal choice for the initial phases of the Patient Tracking App.

## System Requirements Specification

### Overview

The Patient Tracking App is designed to facilitate the management of doctor-patient appointments. The app will have two main user roles: **Admin** and **User**.

### User Stories

#### Admin

1. **As an Admin, I want to log in to the system.**

   - The admin will enter valid credentials to access the admin dashboard.
   - Incorrect credentials will prompt an error message.

2. **As an Admin, I want to view, add, edit, and cancel appointments.**

   - The admin can view a list of appointments, including details such as patient name, date, and time for the appointment.
   - The admin can add a new appointment, providing patient details and scheduling information.
   - Editing an appointment allows the admin to modify patient information, date, and time.
   - The admin can cancel an appointment

3. **As an Admin, I want to add and edit patient information using modals.**

   - Modals will prompt the admin to enter or edit patient information.
   - Patient details include name and username.

4. **As an Admin, I want to log out of the system.**
   - The admin can log out, ensuring secure access to the admin dashboard.

#### User

1. **As a User, I want to register for an account if I don't have one.**

   - Users can register by providing a username and secure password.
   - User authentication ensures secure access to user-specific data.
   - Account registration is limited to users only, as administrator accounts will be provided by the system.

2. **As a User, I want to log in to the system.**

   - Users will log in with valid credentials to access the user dashboard.
   - Incorrect credentials will prompt an error message.

3. **As a User, I want to view my upcoming appointments.**

   - The user dashboard displays a list of upcoming appointments, including the doctor's name, date, and time.

4. **As a User, I want to log out of the system.**
   - Users can log out, ensuring the security of their account information.

### Similar Applications

There are various patient-tracking apps available such as Zocdoc. The app that i'm planning distinguishes itself by providing a user-friendly interface for both admins and users. It is also simple and cheap to use.

### Benefits of this app

- **Efficiency**: Streamlines the appointment management process for both administrators and users.
- **Accessibility**: Provides a user-friendly interface accessible to both tech and non-tech users.
- **Cost-Effective**: Reduces the need for manual appointment tracking, saving time and resources.

### Functional Requirements

1. **Authentication**: Users and admins must log in to access their respective dashboards using their username and password.
2. **Appointment Management**: Administrators have the ability to create appointments by selecting the "book appointment" option on the admin dashboard. They can also view appointments, update them by clicking the "edit" pen icon in the actions category, and cancel appointments by selecting the cancel icon located next to the edit icon in the actions category.
3. **User Dashboard**: Users can view their upcoming appointments.
4. **Styling**: The application should have a visually appealing and consistent design using Sass and react-bootstrap.

### Non-Functional Requirements

1. **Performance**: The app should respond quickly to user interactions.
2. **Security**: User authentication and data storage must be secure.
3. **Reliability**: The app should be available and reliable for users at all times.

### How the App Works

1. **User Registration and Authentication**:

   - Users register for an account, providing username and password
   - Authentication ensures secure access to user-specific data.
   - Account registration is limited to users only, as administrator accounts will be provided by the system.

2. **Appointment Management**:

   - Admins create, view, edit, and cancel appointments through the admin dashboard.
   - Users view their upcoming appointments through the user dashboard.
   - Modals facilitate the addition and editing of patient information and appointments by the admin.

3. **Styling**:

   - Sass and react-bootstrap are used to create a visually appealing and consistent design.
   - The UI is responsive, ensuring a seamless experience across different devices.

4. **Security**:

   - User authentication ensures that only authorized individuals can access the system.
   - Patient and appointment data is stored securely in the MongoDB database.

5. **Performance and Scalability**:
   - CodeSandbox deployment allows for quick testing and prototyping.

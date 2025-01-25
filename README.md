# Smile Dental Care

{
"\_id": {
"$oid": "679529e0da68cfe9248fca36"
},
"name": "ataullah",
"password": "$2b$12$8D4tMq3tl41NLmHokT4mAu0E6GnWGwAmrbEV.6ZyO7s88abf99xRK",
"role": "superadmin",
"createdAt": "2025-01-26T08:00:00.000Z",
"updatedAt": "2025-01-26T08:00:00.000Z"
}

![Landing page](https://res.cloudinary.com/dkofkuquf/image/upload/v1707530071/nuxtshop/lqnlwdzylzf5u2zgu2bo.png)

Smile Dental Care is a full-featured dental office website built with **Next.js**,
**Tailwind CSS**, **MongoDB**, and **Mongoose**. It boasts an intuitive
appointment booking system, and a secure admin panel.

## Features

- **Appointment Booking:** Users can easily book an appointment using our
  intuitive booking system. All bookings are stored in MongoDB for easy
  management.
- **Admin Panel:** Manage appointments and other site content through a secure
  admin panel.Navigate to /admin to login with your admin credentials.
- **Authentication:** The site uses NextAuth for authentication. The admin panel
  is accessible only to admins. A super admin can create other regular admin
  users.

## Technologies Used

- **Next.js**: A popular React framework for building dynamic and performant web
  applications.
- **Tailwind CSS**:A utility-first CSS framework for crafting tailored designs
  with rapid efficiency.
- **MongoDB**: A source-available cross-platform document-oriented database
  program.
- **Mongoose**: An Object Data Modeling (ODM) library that simplifies
  interactions with MongoDB in Node.js applications.
- **NextAuth**: A complete open source authentication solution for Next.js
  applications.

![Admin panel](https://res.cloudinary.com/dkofkuquf/image/upload/v1707585171/nuxtshop/go7j387zbdkslzrayolk.png)

## Setup

1. **Clone the repository.**

   ```bash
   git clone https://github.com/ataullah1/Smile-Dental.git

   ```

2. **Navigate to the project directory.**

   ```bash
   cd Smile-Dental

   ```

3. **Install dependencies.**

   ```bash
   pnpm install

   ```

4. **Configure environment variables.**

- Create a `.env` file in the root of the project.
- Add the necessary environment variables for MongoDB and NextAuth.

  ```env
  # MongoDB
  MONGODB_URI=your_mongodb_uri

  # NextAuth
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=r5c2Sj1nKscXvclZAQCkJbqiznfSCPyUzKTyRVTKs5Y=


  NODE_ENV='development'
  ```

5. **Create a superuser (modify the name and password to your liking) with the
   provided script.**

   ```bash
   node createuser.js

   ```

6. **Run the development server.**

   ```bash
   pnpm run dev

   ```

7. **Open your browser and visit http://localhost:3000 to view the website.**

## Live Version

[https://smiledentalbd.com](https://smiledentalcare.vercel.app)

## Author

Github [@ataullah1](https://github.com/ataullah1) <br> Linkedin:
[@Md Ataullah](https://www.linkedin.com/in/md-ataullah/)

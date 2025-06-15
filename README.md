# 🌐 ESTG Website

## 📖 Overview
This is the official website for **ESTG (Ecole Secondaire Technique de Gisenyi)**. The platform serves as a central hub for students, faculty, and staff to access essential information and resources, fostering a connected and informed community.

## ✨ Features
- 📚 **Course Information and Curriculum**: Explore detailed course offerings and academic programs.
- 🔑 **Student Portal Access**: Secure access to student-specific resources and tools.
- 👩‍🏫 **Faculty Directory**: Find and connect with faculty members.
- 📰 **News and Events**: Stay updated with the latest happenings and announcements.
- 📅 **Academic Calendar**: Keep track of important dates and schedules.
- 🛠️ **Admin Panel**: Manage events, updates, and other administrative tasks.

## 🛠️ Technologies Used
### Frontend
- ⚛️ **React**: For building a dynamic and interactive user interface.
- 🛡️ **TypeScript**: Ensures type safety and robust development.
- ⚡ **Vite**: Provides fast development and build tooling.
- 🎨 **Tailwind CSS**: For modern and responsive styling.

### Backend
- 🟢 **Node.js**: Handles server-side logic efficiently.
- 🚀 **Express.js**: Simplifies building RESTful APIs.
- 🍃 **MongoDB**: Manages data storage and retrieval.
- 📤 **Multer**: Handles file uploads seamlessly.
- ☁️ **Cloudinary**: Manages image storage and optimization.

## 📂 Project Structure
```
ESTG-TSS/
├── Client/       # Frontend code
│   ├── public/   # Static assets
│   ├── src/      # React components, pages, and utilities
│   └── ...       # Configuration files (Vite, Tailwind, etc.)
├── Server/       # Backend code
│   ├── controller/  # Business logic for routes
│   ├── database/    # Database connection
│   ├── middleware/  # Authentication and other middleware
│   ├── models/      # Mongoose schemas
│   ├── routers/     # API route definitions
│   └── app.js       # Main server file
└── README.md     # Project documentation
```

## 🚀 How to Run the Project

### Prerequisites
- 🖥️ **Node.js** and **npm** installed
- 🍃 **MongoDB** instance running

### Steps
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ESTG-TSS
   ```

2. **Set up the backend**:
   ```bash
   cd Server
   npm install
   npm start
   ```

3. **Set up the frontend**:
   ```bash
   cd ../Client
   npm install
   npm run dev
   ```

4. **Access the application**:
   - 🌐 Frontend: `http://localhost:3000`
   - 🛠️ Backend API: `https://estg-tss.onrender.com`

## 🔗 API Endpoints
### 📅 Events
- `GET /api/events` - Fetch all events
- `POST /api/events/upload_events` - Upload a new event
- `PUT /api/events/update_event/:id` - Update an event
- `DELETE /api/events/delete_event/:id` - Delete an event

### 📰 Updates
- `GET /api/updates` - Fetch all updates
- `POST /api/updates/upload_update` - Upload a new update

### 👤 Account
- `POST /api/account/admin/register` - Register an admin
- `POST /api/account/creator/login` - Login for content creators
- `POST /api/account/admin/login` - Login for admins

## 🌍 Deployment
- **Frontend**: Can be deployed on platforms like **Netlify** or **Vercel**.
- **Backend**: Can be deployed on platforms like **Heroku** or **Render**.

## 👨‍💻 Authors
This project was developed by the following contributors:

1. [**BYIRINGIRO Aime Fils** - Lead Developer || Backend Developer ](https://www.linkedin.com/in/byiringiro-aime-fils-281609296)
2. [**NGABO Daniel** - Backend Developer || Database Administrator](https://www.linkedin.com/in/ngabo-daniel-011118283)
3. [**NIYONZIMA Amini GLory** - Frontend Developer || UX/UI Designer](https://www.linkedin.com/in/janesmith)
4. [**IRATUZI Hypolite** - Frontend Developer || UX/UI Designer](https://www.linkedin.com/in/emilyjohnson)
5. [**BENIMANA Obed** - Frontend Developer || UX/UI Designer](https://www.linkedin.com/in/michaelbrown)
6. [**NSANZINEZA Moise** - Frontend Developer || UX/UI Designer](https://www.linkedin.com/in/nsanzineza-moise-6a9bb032a)
7. [**BIGIRIMANA Fabrice** - Frontend Developer || UX/UI Designer](https://www.linkedin.com/in/michaelbrown)

## 📜 License
This project is licensed under the **MIT License**.



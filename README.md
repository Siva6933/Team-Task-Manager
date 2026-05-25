Team Task Manager (Full Stack MERN)

A **role-based team collaboration platform** that allows users to create projects, assign tasks, manage teams, and track progress in real time using a modern dashboard UI.

---

## 🚀 Live Demo

* 🌐 Frontend: `https://your-frontend-url.vercel.app`
* ⚙️ Backend API: `https://your-backend-url.railway.app`
* 🗄️ Database: MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication

* User Signup & Login
* JWT-based authentication
* Role-based access (Admin / Member)

### 👨‍💼 Project Management

* Create projects
* Assign team members
* Add/remove members (Admin only)

### 📋 Task Management

* Create tasks
* Assign tasks to users
* Update status:

  * TODO
  * IN_PROGRESS
  * DONE
* Delete & edit tasks

### 📊 Dashboard

* Task statistics
* Overdue task tracking
* Status overview charts

### 🧑‍🤝‍🧑 Team Module

* View team members
* Role-based display (Frontend Dev, Backend Dev, UI Designer, etc.)

### 🎨 UI/UX

* Modern SaaS-style dashboard
* Dark mode support 🌙
* Drag & drop task board (Trello-style)
* Responsive design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* Framer Motion
* @hello-pangea/dnd (Drag & Drop)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* REST APIs

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel / Railway
* Backend: Railway
* Database: MongoDB Atlas

---

## 📂 Project Structure

```
team-task-manager/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.js
│
└── README.md
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone (https://github.com/Siva6933/Team-Task-Manager)
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

### Create `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://Siva:Siva_098@cluster0.vyxnrrh.mongodb.net/?appName=Cluster0
JWT_SECRET=your_secret_key
```

### Run backend

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔗 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects`
* PUT `/api/projects/:id`
* DELETE `/api/projects/:id`

### Tasks

* GET `/api/tasks/project/:id`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

---

## 👥 Roles System

### Admin

* Create projects
* Manage team members
* Assign tasks

### Member

* View assigned tasks
* Update task status

---

## 📊 Dashboard Metrics

* Total Tasks
* Completed Tasks
* In Progress Tasks
* Overdue Tasks

---

## 🎯 Future Improvements

* 🔔 Real-time notifications (Socket.IO)
* 📱 Mobile app version
* 📅 Calendar task view
* 📈 Advanced analytics charts
* 🔍 Search & filtering system
* ☁️ File attachments in tasks

---

## 🧑‍💻 Author

MUNAGALA SIVA BALAJI

* GitHub:  https://github.com/Siva6933
* LinkedIn: (https://www.linkedin.com/in/munagala-siva-balaji-828499306)

---

## 📜 License

This project is for educational and internship submission purposes.




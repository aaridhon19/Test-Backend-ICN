# Task Manager – Technical Test

## Deskripsi Project

Task Manager adalah aplikasi fullstack sederhana untuk mengelola daftar tugas (tasks).
Aplikasi ini memungkinkan pengguna untuk:

* Registrasi akun
* Login menggunakan autentikasi berbasis token
* Membuat task baru
* Mengedit task
* Menghapus task
* Mengubah status task menjadi **completed / pending**
* Melihat daftar task milik sendiri
* Melihat task publik dari semua user

Project ini dibuat sebagai **technical test**

---

# Tech Stack

### Backend

* Node.js
* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios
* SweetAlert2

### Tools

* Git
* GitHub
* Postman / REST Client

---

# Struktur Project

```
Test-Backend-ICN
│
├── test-backend
│   ├── src
│   ├── prisma
│   ├── package.json
│   └── tsconfig.json
│
├── test-frontend
│   ├── app
│   ├── components
│   ├── lib
│   └── package.json
│
└── README.md
```

---

# Cara Install dan Menjalankan Project

## 1. Clone Repository

```bash
git clone https://github.com/aaridhon19/Test-Backend-ICN.git
cd Test-Backend-ICN
```

---

# Setup Backend

Masuk ke folder backend

```bash
cd test-backend
```

Install dependencies

```bash
npm install
```

Buat file `.env`

```
DATABASE_URL="postgresql://username:password@localhost:5432/task_manager"
JWT_SECRET="your_secret_key"
```

---

## Setup Database

Jalankan migrasi prisma

```bash
npx prisma migrate dev
```

Generate prisma client

```bash
npx prisma generate
```

---

## Menjalankan Backend Server

```bash
npm run start:dev
```

Backend akan berjalan di:

```
http://localhost:3000
```

---

# Setup Frontend

Masuk ke folder frontend

```bash
cd ../test-frontend
```

Install dependencies

```bash
npm install
```

Jalankan aplikasi frontend

```bash
npm run dev
```

Frontend akan berjalan di:

```
http://localhost:3002
```

---

# API Endpoints

## Authentication

### Register User

POST `/users`

Request Body

```json
{
  "name": "Adam",
  "email": "adam@example.com",
  "password": "password123"
}
```

Response

```json
{
  "message": "User created successfully"
}
```

---

### Login

POST `/users/login`

Request

```json
{
  "email": "adam@example.com",
  "password": "password123"
}
```

Response

```json
{
  "access_token": "jwt_token_here"
}
```

---

# User Endpoints

### Get Current User

GET `/users/me`

Headers

```
Authorization: Bearer <token>
```

Response

```json
{
  "id": "uuid",
  "name": "Adam",
  "email": "adam@example.com"
}
```

---

# Task Endpoints

### Create Task

POST `/tasks`

Headers

```
Authorization: Bearer <token>
```

Request

```json
{
  "title": "Learn NestJS",
  "description": "Study controllers and services",
  "status": "PENDING"
}
```

Response

```json
{
  "message": "Task created successfully"
}
```

---

### Get All Tasks (Public)

GET `/tasks`

Response

```json
[
  {
    "id": "uuid",
    "title": "Learn NestJS",
    "description": "Study controllers",
    "status": "PENDING",
    "user": {
      "name": "Adam"
    }
  }
]
```

---

### Get My Tasks

GET `/tasks/my-tasks`

Headers

```
Authorization: Bearer <token>
```

---

### Update Task

PUT `/tasks/:id`

Request

```json
{
  "title": "Updated task",
  "description": "Updated description",
  "status": "COMPLETED"
}
```

---

### Delete Task

DELETE `/tasks/:id`

Response

```json
{
  "message": "Task deleted successfully"
}
```

---

# Fitur Aplikasi

* User Authentication (Register & Login)
* JWT Token Authentication
* CRUD Task
* Toggle Task Status
* User Profile
* Public Task List
* Protected Dashboard
* Alert Notification (Success / Error)

---

# Author

Adam Rizqi Romadhon
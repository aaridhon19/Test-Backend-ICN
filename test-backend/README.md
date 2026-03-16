# Healthcare Queue Management API

Backend service for queue registration system (Healthcare / Hospital)
Built using NestJS, Prisma ORM, PostgreSQL, RabbitMQ, and JWT Authentication.

---

## 🚀 Tech Stack

- NestJS
- Prisma ORM
- PostgreSQL
- RabbitMQ
- JWT Authentication

---

## 📌 Features

- Queue Registration
- JWT Authentication
- Race Condition Safe Queue Number Generator
- RabbitMQ Event Publishing (queue.created)

---

## 🧠 Architecture Overview

When a patient registers:

1. JWT Authentication validated
2. Database transaction started
3. QueueCounter incremented safely (race-condition safe)
4. Queue record created
5. Event published to RabbitMQ
6. Response created

---

## 🔐 Authentication

Login Endpoint:

POST `/api/auth/login`

Returns JWT token.

Protected Endpoint:

POST `/api/queue/register`

Authorization: Bearer <token>

---

## 📦 Database Schema

### QueueCounter

| Field        | Type     | Description |
|-------------|----------|------------|
| id          | UUID     | Primary key |
| queue_date  | Date     | Unique per day |
| last_number | Integer  | Last queue number |

### Queue

| Field        | Type     | Description |
|-------------|----------|------------|
| id          | UUID     | Primary key |
| patient_id  | String   | Patient ID |
| patient_name| String   | Patient name |
| queue_number| Integer  | Generated queue number |
| queue_date  | Date     | Queue date |

Unique Constraint:
(queue_number, queue_date)

---

## 📊 Results

### Postman

![Without MQ](./images/test-1.png)
![Without MQ](./images/test-2.png)
![Without MQ](./images/test-3.png)

### Database

![Without MQ](./images/database.png)

### RabbitMQ

![With MQ](./images/messaging-1.png)
![With MQ](./images/messaging-2.png)

---

## 🐳 Run Locally

### 1️⃣ Setup Environment

Create `.env` (isi)


### 2️⃣ Install Dependencies

npm install 


### 3️⃣ Run Migration

npx prisma migrate dev


### 4️⃣ Start Application

npm run start:dev

## 👨‍💻 Author

Adam Rizqi Romadhon
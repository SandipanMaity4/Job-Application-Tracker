# Job Application Tracker

A full-stack web application that helps job seekers manage and track their job applications in one place. Users can register, log in, add job applications, update application statuses, and monitor their job search progress through a dashboard.

## Features

- User registration and login
- JWT-based authentication and authorization
- Add, view, edit, and delete job applications
- Track application statuses:
  - Applied
  - Interview
  - Offer
- Store company names, job roles, locations, application dates, and notes
- Dashboard with application statistics
- Responsive React user interface
- RESTful API architecture

## Tech Stack

**Backend**
- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- JWT Authentication
- Maven

**Frontend**
- React
- Vite
- JavaScript
- Axios
- React Router
- Lucide React

**Tools**
- IntelliJ IDEA
- Visual Studio Code
- MySQL Workbench
- Postman
- Git and GitHub

## Project Structure

```text
Job-Application-Tracker/
│
├── src/
│   ├── main/
│   │   ├── java/com/jobtracker/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── dto/
│   │   │   ├── entity/
│   │   │   ├── enums/
│   │   │   ├── exception/
│   │   │   ├── repository/
│   │   │   ├── security/
│   │   │   └── service/
│   │   └── resources/
│   └── test/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── assets/
│
├── pom.xml
└── README.md
```

## Getting Started

### Prerequisites

- Java 21
- MySQL Server
- Node.js and npm
- Maven (or use the included Maven wrapper)
- Git


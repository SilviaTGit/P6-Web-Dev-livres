# Mon Vieux Grimoire

## Project Overview

Mon Vieux Grimoire is a web application that allows users to manage a collection of books. Users can add, view, update, and delete books, as well as rate them. The application is built using a Node.js backend with Express and MongoDB, and a React frontend.

## Features

- User authentication (signup and login)
- Add new books with details such as title, author, year, genre, and cover image
- View a list of all books
- View detailed information about a specific book
- Update book details
- Delete a book
- Rate books and view average ratings
- View the top-rated books

## Technologies Used

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens) for authentication
- Multer for file uploads
- Sharp for image processing
- dotenv for environment variables

### Frontend

- React
- React Router for routing
- Axios for HTTP requests
- React Hook Form for form handling
- FontAwesome for icons

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
   git clone https://github.com/SilviaTGit/P6-Web-Dev-livres
   cd mon-vieux-grimoire

2. Install backend dependencies: 
    cd backend
    npm install

3. Install frontend dependencies:
    cd ../frontend
    npm install

### Configuration

Create a .env file in the backend directory and add your MongoDB connection string:
   ex: MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority

### Running the App

1. Start the backend and frontend server:
    cd backend / cd ../frontend
    npm start

2. Open your browser and navigate to https://localhost:3000 to view the application

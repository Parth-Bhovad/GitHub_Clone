# GitHub Clone

## Description
A GitHub-inspired web application built using the MERN stack. The platform replicates core functionalities of GitHub, enabling users to create and manage repositories, upload and download code files, and handle user authentication. Designed with modular architecture and a clean UI for seamless interaction.

## Tech Stack
- **MongoDB**: Database for storing user data and repository metadata.
- **Express.js**: Backend framework for building RESTful APIs.
- **React.js**: Frontend library for building dynamic user interfaces.
- **Node.js**: Server-side runtime environment.
- **Bootstrap**: UI styling framework for responsive design.

## Installation Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/github-clone.git
```
2. Navigate to the project directory:
```bash
cd GitHub_Clone
```
3.Install the dependencies:
```bash
npm install
```
4. Create a .env file and add your MongoDB connection string and any other required environment variables.

5. Run the backend:
```bash
cd backend
node index.js start
```

6. Run the frontend:
```bash
cd frontend
npm run dev
```
7.You will get a link in terminal ctrl+click to open the frontend on browser.

## Features

- User Authentication & Authorization: Secure login and role-based access to repositories.

- Repository Creation: Users can create repositories directly from the frontend.

- Code Upload & Download: Upload multiple files to cloud storage and download them as needed.

- MVC Architecture: Structured codebase following the Model-View-Controller pattern for better maintainability.

## Live Demo
Click here -> [GitHub Clone](https://github-clone-36vw.onrender.com)

## Available Commands
| Command            | Description                                 |
| :----------------- | :------------------------------------------ |
| `init`             | Initialize a new Git repository             |
| `add <filePath>`   | Add a file to the staging area              |
| `commit <message>` | Commit staged changes with a commit message |
| `remote <link>`    | Add a remote repository URL                 |
| `push`             | Push changes to the remote repository       |
| `pull`             |Download all files and folders from the remote repository        |

> For more detailed docs for Available Commands [Click here](https://github.com/Parth-Bhovad/git-clone-cli)

## Project Status / Ongoing Work
The project is actively being developed. Here's what's currently in progress:

 UI improvements and responsiveness

# Scribble-Dev 🚀

Scribble-Dev is a real-time collaborative whiteboard and chat application built with Node.js, Express, and Socket.IO. It allows multiple users to draw on a shared canvas and communicate via a global chat room simultaneously.

## Features
- **Real-Time Drawing:** Draw on a shared whiteboard using Socket.IO for real-time synchronization.
- **Global Chat:** Communicate with other connected users in a cloud-based global chat room.
- **Responsive Frontend:** Clean and simple UI built with HTML, CSS, and Vanilla JavaScript.
- **Containerized:** Fully supported Docker and Docker Compose setups for easy deployment.
- **AWS Ready:** Configured to easily deploy on AWS EC2 instances.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Real-Time Communication:** Socket.IO
- **Environment Management:** dotenv
- **Containerization:** Docker, Docker Compose

## Project Structure
```text
scribble-dev/
├── public/                 # Frontend static files
│   ├── index.html          # Main HTML layout
│   ├── script.js           # Frontend logic (Canvas, Socket.IO client)
│   └── style.css           # Styling
├── .env                    # Environment variables configuration
├── .gitignore              # Git ignore file
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker image instructions
├── EC2 Dev Key.pem         # AWS EC2 key pair (Keep this secure!)
├── package.json            # Node.js dependencies and scripts
└── server.js               # Main Express & Socket.IO server file
```

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (Optional, for containerized deployment)

### Local Development

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd scribble-dev
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory (if not present) and set your preferred port:
   ```env
   PORT=3000
   ```

4. **Start the application:**
   ```bash
   node server.js
   ```

5. **Access the app:**
   Open your browser and navigate to `http://localhost:3000`

### Docker Deployment

To run the application using Docker Compose:

1. Build and start the container:
   ```bash
   docker-compose up --build -d
   ```

2. The application will be available at `http://localhost:3000`.

To stop the container:
```bash
docker-compose down
```

## AWS EC2 Deployment
The project includes a `.pem` file for accessing an AWS EC2 instance. Ensure that your EC2 security group allows incoming traffic on the port specified in your `.env` file (default is `3000`).

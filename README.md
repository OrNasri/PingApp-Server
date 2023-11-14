# PingApp-Server

## Overview
PingApp-Server is a Node.js server that handles ping requests from the PingApp-Client. It utilizes Express for the API, MongoDB for data storage, and supports CORS for cross-origin resource sharing.

## Prerequisites
1. Node.js and npm installed
2. MongoDB installed and running

## Installation
1. Clone the repository: `git clone https://github.com/OrNasri/PingApp-Server.git`
2. Change into the project directory: `cd PingApp-Server`
3. Install dependencies: `npm install`

## Configuration
Update the following variable in `.env` file with your configuration:
- `SERVER_PORT`: Port number for the server
- `MONGODB_CONNECTION_STRING`: MongoDB connection string
- `DATABASE_NAME`: Name of the MongoDB database
- `DATABASE_COLLECTION`: Name of the MongoDB collection

## Usage
1. Run the server: `node index.js`
2. The server will be running at `http://localhost:3001` (or the configured port)

## API Endpoints
- `POST /ping`: Accepts ping requests and returns the result along with the top pinged sites.

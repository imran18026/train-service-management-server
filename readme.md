### Requirement Analysis

## Overview

This project is a backend system for managing train services, including station management, train scheduling, wallet integration, and user management. The system is built using Node.js, Express, and MongoDB.

## Features

- **User Management:** Registration, login, and JWT-based authentication.
- **Station Management:** Create, update, and retrieve station information.
- **Train Management:** Create, update, and retrieve train schedules with automatic updates.
- **Wallet Integration:** Add funds, retrieve balance, and maintain transaction history.
- **Ticketing System:** Purchase tickets using wallet balance with fare calculation.
- **Automatic Scheduling Updates:** Uses `node-cron` to automatically update train schedules.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/imran18026/train-service-management-server
   cd train-service-management-server
   yarn
   setup .env as env.example
   yarn start:dev

   Live server: https://train-service-management-server.vercel.app/

   ```

# API Endpoints

[For testing purposes off all kinds of authorizations but showing them as comment lines]

## User(Passenger) Management with AUTH

- **`POST /api/v1/users/create-passenger`**  
  Register a new user as passenger.

- **`POST /api/v1/auth/login`**  
  Log in and receive a JWT.

- **`POST /api/v1/auth/refresh-token`**  
  Generate Refresh token

- **`GET /api/v1/passengers/`**  
  Retrieve All Passengers

- **`GET /api/v1/passengers/:id`**  
  Retrieve a single Passengers by User ID

- **`PATCH /api/v1/passengers/:id`**  
  Update a single Passengers by User ID

- **`DELETE /api/v1/passengers/:id`**  
  Delete a passenger by User ID.

## Station Management

- **`POST /api/v1/stations/create-station`**  
  Create a new station.

- **`GET /api/v1/stations`**  
  Retrieve a list of all stations.

- **`GET /api/v1/stations/:id`**  
  Retrieve specific station details.

- **`PATCH /api/v1/stations/:id`**  
  Update station information.

- **`DELETE /api/v1/stations/:id`**  
  Delete a station.

## Train Management

- **`POST /api/v1/trains/create-train`**  
  Create a new train with schedule.

- **`GET /api/v1/trains`**  
  Retrieve a list of all trains.

- **`GET /api/v1/trains/:id`**  
  Retrieve specific train schedule details.

- **`PATCH /api/v1/trains/:id`**  
  Update train and schedule information.

- **`DELETE /api/v1/trains/:id`**  
  Delete a train with schedule.

## Wallet Integration

- **`PATCH /api/v1/wallets/:id`**  
  Add Balance to wallet by a specific USER ID.

- **`GET /api/v1/wallets/transactions/:id'`**  
  GET all transactions for a specific user History.

- **`GET /api/v1/wallets/:id`**  
  Get Balance for a specific user

- **`GET /api/v1/wallets/`**  
  Get Balance for all users

## Ticketing System

- **`POST /api/v1/tickets//booking/:id`**  
  Purchase a ticket using wallet balance by a specific User ID.

- **`GET /api/v1/tickets/:id`**  
  Retrieve ticket details by a User ID.

- **`GET /api/v1/tickets`**  
  Retrieve all tickets.

- **`PATCH /api/v1/tickets/:id`**  
  Update a tickets.

- **`DELETE /api/v1/tickets/:id`**  
   Delete a tickets.

## Notes

- All endpoints require proper authentication and authorization where applicable.
- Ensure to validate request payloads and handle errors gracefully.
- Refer to the specific API documentation or codebase for detailed request and response formats.

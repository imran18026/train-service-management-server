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

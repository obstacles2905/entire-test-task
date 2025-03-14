# Ticketing Platform Test Assignment

This project is a test assignment for building a ticketing platform that sells tickets for events. 
The application features an admin panel for Promoters, enabling them to set up events and create different ticket tiers with detailed pricing information. 
Buyers purchase tickets through the platform, and the platform collects a commission fee for its services.

## Features

- **TicketTier Entity**
    - Contains the following pricing fields:
        - **buyerPrice:** The retail price paid by the buyer.
        - **serviceFee:** The commission fee taken by the platform.
        - **promoterReceivesPrice:** The amount the promoter receives after deducting the commission.
    - Provides CRUD endpoints (except delete) for managing TicketTier records.

- **Price Calculation Endpoint**
    - Calculates pricing fields based on either the buyer price or the promoter receives price.
    - Uses a fee model where the service fee is a percentage of the buyer price and cannot be lower than a defined minimum fee.

- **Fee Setting**
    - Global settings for fee calculation are maintained in a single FeeSetting record.
    - Provides endpoints to retrieve and upsert (create/update) fee settings.

- **Validation and Documentation**
    - Input validation is implemented using `class-validator`.
    - Swagger/OpenAPI documentation is automatically generated and available for easy API exploration.

- **Dockerized Environment**
    - The application is containerized using Docker and Docker Compose.
    - PostgreSQL is used as the database, and its container is managed via Docker Compose.

## Prerequisites

- **Node.js** (v16 or higher)
- **npm**
- **Docker** and **Docker Compose**

## Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>

2. **Install dependencies:**
   ```bash
   npm install
   
3. **Configure environment variables:**
   - Create a .env file in the root directory with the following content (adjust values as needed):
   ```bash
    DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb?schema=public
    PORT=3000
   
## Running the Application

You can run the application using Docker Compose, which will build and start both the application and the PostgreSQL container.

1. **Start the containers:**

   ```bash
   docker-compose up --build

2. **Perform Prisma migrations:**
   - Open a new terminal window and run the following command to apply the Prisma migrations:
   ```bash
   docker-compose exec app npx prisma migrate dev --name init
   
3. **Access the API:**
 - The API is available at `http://localhost:3000`.
 - Swagger documentation is accessible at: http://localhost:3000/swagger

## Running unit tests
 - To execute the unit tests, run:
   ```bash
   npm run test
 - This command will run all tests and ensure that the price calculation logic behaves as expected.


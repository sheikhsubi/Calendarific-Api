# Calendarific API Project

## Overview

This project provides an API for fetching holidays and countries data using the Calendarific API. The backend is built with Node.js and Express.js. It also includes caching with `node-cache` to optimize performance by avoiding redundant API calls.

## Features

- **Fetch Holidays**: Retrieve holiday data for a specific country and year.
- **Fetch Countries**: Get a list of countries supported by the API.
- **Caching**: Uses `node-cache` to store and retrieve holiday data to reduce redundant API calls.

## Getting Started

To get this project up and running on your local machine, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2. **Install Node.js modules:**

    ```bash
    npm install
    ```

### Running the Server

To start the server, run:

```bash
node index.js

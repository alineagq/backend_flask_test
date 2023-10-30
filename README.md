# Project Installation Guide

This script is designed to set up a local instance of the project using either docker-compose or virtualenv.

## Prerequisites

Make sure to set the `MYSQL_HOST` environment variable based on your setup. 
If using virtualenv, set it to `localhost`; if using docker, set it to `mysql`.

### Docker Compose Installation

If you choose to run the project in docker-compose, ensure you have Docker and Docker Compose installed on your machine.

### Virtualenv Installation

If you prefer running the project in virtualenv, make sure you have Python 3 and virtualenv installed on your machine.

## Usage

### Docker Compose

To run the project using docker-compose, execute the following command in the terminal:

```bash
./run_me.sh docker
```

### Virtualenv

To run the project using virtualenv, execute the following command:

```bash
./run_me.sh virtualenv
```

# Backend Documentation

This documentation provides an overview of the backend of the application, including its structure, routes, and functionality.

## Table of Contents

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [Database Configuration](#database-configuration)
4. [API Endpoints](#api-endpoints)

## Overview

The backend of the application is built using Flask, a lightweight web framework for Python. It utilizes SQLAlchemy for database interactions and CORS for handling Cross-Origin Resource Sharing.

## Dependencies

Ensure that you have the following dependencies installed:

- Python
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- MySQL (or another compatible database)

You can install the required Python packages using:

```bash
pip install Flask Flask-SQLAlchemy Flask-CORS mysql-connector-python

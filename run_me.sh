#!/bin/bash

# This script set localhost project via docker-compose or virtualenv, to
# run the project in localhost.

# If you want to run the project in docker-compose, you need to install
# docker and docker-compose in your machine. If you want to run the project
# in virtualenv, you need to install python3 and virtualenv in your machine.

# If you want to run the project in docker-compose, you need to run the
# following command:
# $ ./run_me.sh docker

# If you want to run the project in virtualenv, you need to run the
# following command:
# $ ./run_me.sh virtualenv

if [ "$1" == "docker" ] || [ "$1" == "-d" ]; then
    echo "Running project in docker-compose"
    cd app
    cp .env-dev .env
    docker compose up mysql -d
    docker compose up web -d
    docker compose up react -d
    echo "Project running in docker-compose"
elif [ "$1" == "venv" ]; then
    echo "Running project in virtualenv"
    cd app
    cp .env-dev .env
    docker compose up mysql -d
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
    cd backend
    flask run --host=0.0.0.0 --port=5000 &
    cd ../frontend
    npm install
    npm start
    echo "Project running in virtualenv"
elif [ "$1" == "-h" ]; then
    echo "This script set localhost project via docker-compose or virtualenv, to run the project in localhost."
    echo "If you want to run the project in docker-compose, you need to install docker and docker-compose in your machine."
    echo "If you want to run the project in virtualenv, you need to install python3 and virtualenv in your machine."
    echo "If you want to run the project in docker-compose, you need to run the following command:"
    echo "$ ./run_me.sh docker"
    echo "If you want to run the project in virtualenv, you need to run the following command:"
    echo "$ ./run_me.sh virtualenv"
    echo "For simplicity of this build, in either case, the project will run the MySQL database in docker-compose."
    echo "If you need more information, you can access the README.md file."
else
    echo "You need to pass the argument 'docker' or 'virtualenv'. If you need more information, use the command './run_me.sh -h'"
fi
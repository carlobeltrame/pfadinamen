FROM tensorflow/tensorflow:latest

RUN pip install Flask

WORKDIR /app

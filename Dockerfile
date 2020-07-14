FROM tensorflow/tensorflow:latest

RUN pip install "tensorflow-cpu>=2.2" tensorflowjs

WORKDIR /app

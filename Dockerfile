FROM crisbal/torch-rnn:base
RUN chgrp -R 0 /root && chmod -R g+rwX /root

RUN pip install Flask

COPY app.py /app/app.py
COPY checkpoint_4650.t7 /root/torch-rnn/cv/checkpoint_4650.t7
COPY checkpoint_4650.json /root/torch-rnn/cv/checkpoint_4650.json

USER 1001
EXPOSE 5000
CMD FLASK_APP=/app/app.py flask run --host=0.0.0.0

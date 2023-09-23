FROM mysql:8.0.28
ENV MYSQL_ROOT_PASSWORD secretG6
ENV MYSQL_DATABASE bookings_db

COPY ./resources /docker-entrypoint-initdb.d


EXPOSE 3307
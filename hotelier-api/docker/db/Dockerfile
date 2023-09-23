FROM mysql:8.0.28
ENV MYSQL_ROOT_PASSWORD secretG6
ENV MYSQL_DATABASE hotels_db

COPY ./resources /docker-entrypoint-initdb.d


EXPOSE 3306
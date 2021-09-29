FROM postgres:11.7

ENV POSTGRES_DB local_database
ENV POSTGRES_USER container
ENV POSTGRES_PASSWORD container

ENV PGDATA /var/lib/postgresql/data/pgdata
ENV TZ America/New_York

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime; \
    echo $TZ > /etc/timezone; \
    dpkg-reconfigure -f noninteractive tzdata

RUN apt-get update
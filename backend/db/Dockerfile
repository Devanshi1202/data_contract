FROM mysql:8.0

# Set environment variables (optional if you use docker run with -e)
ENV MYSQL_DATABASE=data_contract \
    MYSQL_ROOT_PASSWORD=rootpassword \
    MYSQL_USER=myuser \
    MYSQL_PASSWORD=mypassword

# Copy schema into the init directory
COPY schema.sql /docker-entrypoint-initdb.d/

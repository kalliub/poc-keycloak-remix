#!/bin/bash
# Creates the schema for the postgres database on docker-compose.yml.
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE SCHEMA IF NOT EXISTS "${POSTGRES_DB_SCHEMA}";
EOSQL

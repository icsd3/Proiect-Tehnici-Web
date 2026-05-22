-- Run with an admin PostgreSQL user, for example:
-- psql -U postgres -d postgres -f sql/01_create_database_and_user.sql

\set ON_ERROR_STOP on

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_catalog.pg_roles
        WHERE rolname = 'themetalvault_user'
    ) THEN
        CREATE ROLE themetalvault_user
            LOGIN
            PASSWORD 'themetalvault_dev_password';
    ELSE
        ALTER ROLE themetalvault_user
            WITH LOGIN
            PASSWORD 'themetalvault_dev_password';
    END IF;
END;
$$;

SELECT 'CREATE DATABASE themetalvault WITH OWNER = postgres ENCODING = ''UTF8'' TEMPLATE = template0'
WHERE NOT EXISTS (
    SELECT 1
    FROM pg_database
    WHERE datname = 'themetalvault'
)\gexec

GRANT CONNECT ON DATABASE themetalvault TO themetalvault_user;

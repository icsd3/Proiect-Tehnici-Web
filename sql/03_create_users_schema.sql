CREATE TYPE roluri AS ENUM ('admin', 'moderator', 'comun');

CREATE TABLE IF NOT EXISTS utilizatori (
    id serial PRIMARY KEY,
    username varchar(50) UNIQUE NOT NULL,
    nume varchar(100) NOT NULL,
    prenume varchar(100) NOT NULL,
    parola varchar(500) NOT NULL,
    rol roluri NOT NULL DEFAULT 'comun',
    email varchar(100) NOT NULL,
    culoare_chat varchar(50) NOT NULL DEFAULT 'black',
    data_adaugare timestamp DEFAULT current_timestamp,
    cod varchar(200),
    confirmat_mail boolean DEFAULT false,
    poza varchar(200)
);

CREATE TABLE IF NOT EXISTS accesari (
    id serial PRIMARY KEY,
    ip varchar(100) NOT NULL,
    user_id int NULL REFERENCES utilizatori(id) ON DELETE SET NULL,
    pagina varchar(500) NOT NULL,
    data_accesare timestamp DEFAULT current_timestamp
);

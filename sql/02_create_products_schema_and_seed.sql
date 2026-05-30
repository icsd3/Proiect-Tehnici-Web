-- Run after 01_create_database_and_user.sql, against the project database:
-- psql -U postgres -d themetalvault -f sql/02_create_products_schema_and_seed.sql

\set ON_ERROR_STOP on

DO $$
BEGIN
    CREATE TYPE categorie_produs AS ENUM (
        'tricouri',
        'hanorace',
        'muzica',
        'accesorii',
        'postere'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END;
$$;

CREATE TABLE IF NOT EXISTS produse (
    id INTEGER PRIMARY KEY CHECK (id > 0),
    nume VARCHAR(120) NOT NULL,
    descriere TEXT NOT NULL,
    folder_imagini VARCHAR(255) NOT NULL DEFAULT '/resurse/imagini/produse',
    categorie categorie_produs NOT NULL,
    subcategorie VARCHAR(60) NOT NULL,
    pret NUMERIC(8, 2) NOT NULL CHECK (pret >= 0),
    greutate_grame INTEGER NOT NULL CHECK (greutate_grame > 0),
    data_adaugare DATE NOT NULL,
    culoare VARCHAR(30) NOT NULL,
    taguri VARCHAR(255) NOT NULL,
    editie_limitata BOOLEAN NOT NULL DEFAULT false,
    stoc INTEGER NOT NULL CHECK (stoc >= 0)
);

ALTER TABLE produse
    ADD COLUMN IF NOT EXISTS folder_imagini VARCHAR(255);

ALTER TABLE produse
    DROP COLUMN IF EXISTS imagine;

UPDATE produse
SET folder_imagini = '/resurse/imagini/produse/produs-' || id::text
WHERE folder_imagini IS NULL OR btrim(folder_imagini) = '';

ALTER TABLE produse
    ALTER COLUMN folder_imagini SET DEFAULT '/resurse/imagini/produse',
    ALTER COLUMN folder_imagini SET NOT NULL;

INSERT INTO produse (
    id,
    nume,
    descriere,
    categorie,
    subcategorie,
    pret,
    greutate_grame,
    data_adaugare,
    culoare,
    taguri,
    editie_limitata,
    stoc
) VALUES
    (
        1,
        'Tricou Blackened Logo',
        'Tricou unisex din bumbac gros, cu logo TheMetalVault si print frontal inspirat de black metal.',
        'tricouri',
        'tricou unisex',
        89.99,
        180,
        '2025-09-12',
        'negru',
        'bumbac,logo,black-metal,unisex',
        false,
        42
    ),
    (
        2,
        'Tricou Doom Cathedral',
        'Tricou oversize cu grafica lenta si masiva, potrivit pentru colectii doom si sludge.',
        'tricouri',
        'tricou oversize',
        104.50,
        210,
        '2025-10-03',
        'mov',
        'oversize,doom,sludge,print-mare',
        true,
        16
    ),
    (
        3,
        'Tricou Thrash Riot',
        'Model rosu cu print contrastant, creat pentru fanii thrash si groove metal.',
        'tricouri',
        'tricou slim',
        79.90,
        165,
        '2025-11-18',
        'rosu',
        'thrash,groove,concert,bumbac',
        false,
        58
    ),
    (
        4,
        'Tricou Death Bloom',
        'Tricou negru cu detaliu floral intunecat si logo discret pe spate.',
        'tricouri',
        'tricou unisex',
        94.00,
        185,
        '2026-01-09',
        'negru',
        'death-metal,logo-spate,floral,unisex',
        false,
        31
    ),
    (
        5,
        'Hanorac Vault Zip',
        'Hanorac cu fermoar, buzunare laterale si broderie mica TheMetalVault.',
        'hanorace',
        'hanorac cu fermoar',
        189.99,
        620,
        '2025-12-01',
        'negru',
        'fermoar,broderie,toamna,unisex',
        false,
        24
    ),
    (
        6,
        'Hanorac Funeral Green',
        'Hanorac gros cu imprimeu verde inchis si grafica inspirata de funeral doom.',
        'hanorace',
        'hanorac pullover',
        214.90,
        680,
        '2026-02-14',
        'verde',
        'pullover,funeral-doom,iarna,print-mare',
        true,
        9
    ),
    (
        7,
        'Hanorac Tour Crewneck',
        'Bluza crewneck pentru concerte, cu lista fictiva de turneu pe spate.',
        'hanorace',
        'crewneck',
        169.50,
        540,
        '2026-03-02',
        'gri',
        'crewneck,tour,concert,logo-spate',
        false,
        34
    ),
    (
        8,
        'Vinyl Midnight Pressing',
        'LP negru de colectie, editie standard, cu coperta gatefold si insert inclus.',
        'muzica',
        'vinyl LP',
        139.99,
        320,
        '2025-08-22',
        'negru',
        'vinyl,lp,gatefold,insert',
        false,
        27
    ),
    (
        9,
        'Vinyl Crimson Splatter',
        'Vinyl color rosu-negru, presare limitata pentru colectii speciale.',
        'muzica',
        'vinyl color',
        179.99,
        330,
        '2026-04-05',
        'rosu',
        'vinyl,color,splatter,limited',
        true,
        7
    ),
    (
        10,
        'CD Demo Archives',
        'CD cu selectie demo si booklet de 12 pagini, dedicat fanilor de arhive obscure.',
        'muzica',
        'CD',
        59.99,
        95,
        '2025-07-30',
        'argintiu',
        'cd,demo,booklet,archive',
        false,
        63
    ),
    (
        11,
        'Caseta Tape Ritual',
        'Caseta audio cu carcasa transparenta si sticker lateral pentru colectie.',
        'muzica',
        'caseta',
        49.50,
        70,
        '2026-01-24',
        'transparent',
        'caseta,analog,sticker,colectie',
        true,
        12
    ),
    (
        12,
        'Patch Woven Skull',
        'Patch tesut cu margine surfilata, potrivit pentru veste denim si geci de piele.',
        'accesorii',
        'patch',
        24.99,
        18,
        '2025-09-27',
        'alb',
        'patch,tesut,vesta,skull',
        false,
        86
    ),
    (
        13,
        'Set Pin-uri Festival',
        'Set de trei pin-uri metalice cu finisaje diferite pentru rucsac sau geaca.',
        'accesorii',
        'pin-uri',
        39.99,
        45,
        '2025-12-19',
        'multicolor',
        'pin,set,festival,metal',
        false,
        54
    ),
    (
        14,
        'Caciula Vault Beanie',
        'Beanie negru cu eticheta cusuta si material moale pentru sezon rece.',
        'accesorii',
        'caciula',
        69.90,
        120,
        '2026-02-02',
        'negru',
        'beanie,iarna,eticheta,streetwear',
        false,
        38
    ),
    (
        15,
        'Curea Studded Stage',
        'Curea cu tinte metalice si catarama mata, gandita pentru tinute de concert.',
        'accesorii',
        'curea',
        84.90,
        260,
        '2026-03-15',
        'negru',
        'curea,tinte,concert,stage',
        false,
        21
    ),
    (
        16,
        'Poster Infernal Tour',
        'Poster A2 cu grafica de turneu si finisaj mat, livrat in tub protector.',
        'postere',
        'poster A2',
        34.99,
        90,
        '2025-10-29',
        'portocaliu',
        'poster,a2,tour,mat',
        false,
        73
    ),
    (
        17,
        'Print Ritual Artwork',
        'Print artistic pe hartie groasa, numerotat manual pentru colectionari.',
        'postere',
        'art print',
        119.00,
        130,
        '2026-04-18',
        'albastru',
        'print,artwork,numerotat,colectie',
        true,
        8
    ),
    (
        18,
        'Poster Festival Grid',
        'Poster decorativ cu layout tip afis de festival si paleta contrastanta.',
        'postere',
        'poster A3',
        29.90,
        65,
        '2026-01-05',
        'galben',
        'poster,a3,festival,decor',
        false,
        96
    ),
    (
        19,
        'Vinyl Gatefold Doom',
        'Editie vinyl gatefold cu doua discuri si coperta laminata.',
        'muzica',
        'vinyl dublu',
        219.99,
        520,
        '2026-05-10',
        'violet',
        'vinyl,dublu,gatefold,doom',
        true,
        5
    ),
    (
        20,
        'Pachet Battle Jacket',
        'Pachet de accesorii pentru vesta: patch mare, doua pin-uri si sticker set.',
        'accesorii',
        'pachet merch',
        99.99,
        160,
        '2026-05-17',
        'multicolor',
        'patch,pin,stickere,vesta',
        true,
        14
    )
ON CONFLICT (id) DO UPDATE SET
    nume = EXCLUDED.nume,
    descriere = EXCLUDED.descriere,
    folder_imagini = EXCLUDED.folder_imagini,
    categorie = EXCLUDED.categorie,
    subcategorie = EXCLUDED.subcategorie,
    pret = EXCLUDED.pret,
    greutate_grame = EXCLUDED.greutate_grame,
    data_adaugare = EXCLUDED.data_adaugare,
    culoare = EXCLUDED.culoare,
    taguri = EXCLUDED.taguri,
    editie_limitata = EXCLUDED.editie_limitata,
    stoc = EXCLUDED.stoc;

UPDATE produse
SET folder_imagini = '/resurse/imagini/produse/produs-' || id::text;

GRANT USAGE ON SCHEMA public TO themetalvault_user;
GRANT USAGE ON TYPE categorie_produs TO themetalvault_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE produse TO themetalvault_user;

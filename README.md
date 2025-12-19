# Examenopdracht Front-end Web Development & Web Services

> Schrap hierboven eventueel wat niet past

- Student: BLOEM ELIAS en BRIAN DE SADELEER
- Studentennummer: 202404402
- E-mailadres: <elias.bloem@student.hogent.be>, <brian.desadeleer@student.hogent.be>

## Vereisten

> Vul de vereisten eventueel aan

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

> Je kan ook een aparte README per project (in de respectievelijke map) voorzien. Verwijs er dan hier naar.

## Front-end

## Opstarten

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

- Installeer alle dependencies: `pnpm install`
- Maak `.env` met volgende inhoud


```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://devbrihan:devpwdforbrianandelias@localhost:3309/f1tracker

CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800

LOG_LEVELS=["log","error","warn","debug","verbose"]

# Authentication (Argon2 Hashing) Configuration
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_MAX_DELAY=2000

# Authentication (JWT) Configuration
# Use the command "pnpm env:jwtToken" to generate a random crypto 32 string for the JWT TOKEN
AUTH_JWT_EXPIRATION_INTERVAL=3600
AUTH_JWT_SECRET=d5e0c084a9ebc0876222960ebeaf01f503462a6807d13e6e42aaad9b90fdac59
AUTH_JWT_AUDIENCE=f1tracker.com
AUTH_JWT_ISSUER=f1tracker.com
```

- Start het project `pnpm dev`


## Testen

Open Cypress voor frontend testen met `pnmp test`

## Back-end

## Opstarten

> Schrijf hier hoe we de applicatie starten (.env bestanden aanmaken, commando's om uit te voeren...)

- Maak `.env` met volgende inhoud
```bash
VITE_API_URL="http://localhost:3000/api"

VITE_BASE_IMG_URL="http://localhost:3000"
```

- Maak en start vervolgens de database met in respectivelijke volgorde:
- `pnmp db:start`

- `pnpm db:migrate`
- `pnpm db:seed`
- `pnmp start:dev`


## Testen

> Schrijf hier hoe we de testen uitvoeren (.env bestanden aanmaken, commando's om uit te voeren...)
- Maak eerste `.env.test` aan met:
```bash
# .env.test
# General configuration
NODE_ENV=testing
PORT=3000

# CORS configuration
CORS_ORIGINS=["http://localhost:5173"]
CORS_MAX_AGE=10800


# Auth configuration
AUTH_JWT_SECRET=eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked
AUTH_JWT_AUDIENCE=f1tracker.hogent.be
AUTH_JWT_ISSUER=f1tracker.hogent.be
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_MAX_DELAY=2000

# Logging configuration
LOG_DISABLED=true
```

- Om de testen te starten gebruik het commando `pnpm test:e2e`


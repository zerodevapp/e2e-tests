# ZeroDev - E2E Tests

## Setup

### Install dependencies
```
npm i
```

### Setup environment variables
```
cp .env-example .env
```

Then open `.env` and set `API_KEY` and `TEAM_ID`.

You can generate an `API_KEY` here: http://localhost:3000/account<br />
And you find your `TEAM_ID` here, next to the title: http://localhost:3000/team

## Run

### Complete
```
npm run test:e2e
```

### Specific
```
npm run test:e2e tests/sdk/deploying.spec.ts
```

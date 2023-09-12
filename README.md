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

You can generate an `API_KEY` here: https://dashboard.zerodev.app/account<br />
And you find your `TEAM_ID` here, next to the title: https://dashboard.zerodev.app/team

## Run

### Complete
```
npm run test:e2e
```

### Specific
```
npm run test:e2e tests/sdk/deploying.spec.ts
```

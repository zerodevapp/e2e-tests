# ZeroDev - E2E Tests

> **Warning**
> Running the test suite will delete all teams and all projects in the process. Therefore, run only for accounts you don't care.

## Setup

### Install dependencies

```bash
npm i
```

### Setup environment variables

```bash
cp .env-example .env
```

Then open `.env` and set `API_KEY`.

> **Warning**
> Make sure to create a new account specifically for the tests since teams & projects will be wiped.
> You can generate an `API_KEY` here: https://dashboard.zerodev.app/account<br />

## Run

### Complete

```bash
npm run test:e2e
```

### Specific

```bash
npm run test:e2e tests/sdk/deploying.spec.ts
```

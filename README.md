# ZeroDev - E2E Tests

> **Warning**
> Running any test on a team will delete all projects in the process. Therefore, run only for teams you don't care.

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

> **Warning**
> Make sure to create a new team specifically for the tests since projects will be wiped.

Create a new team on our [Dashboard](https://dashboard.zerodev.app/team) and then copy the `TEAM_ID`. 

## Run

### Complete
```
npm run test:e2e
```

### Specific
```
npm run test:e2e tests/sdk/deploying.spec.ts
```


## Common issues
Since e2e tests are running in our production environment sometimes a transaction gets processed before the project gets deleted such the project is not deletable anymore --> the team cannot be used for e2e tests anymore.

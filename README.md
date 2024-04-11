# ADIANTE GCB AUTOMATION TESTS 

> Automation project using cypress

---

## Installation

> After the clone this repository, follow the steps:

- Install all dependencies (package.json)
`npm install`

### Run tests

> run test headless mode

```
$ npx cypress run
```
#### Run test headless mode in a specific environment
> "HML is default environment"

### Run test grep tags.

> Example: 
```
$ set CYPRESS_ENV=dev&& npx cypress run --env grepTags=@tag
```

```
$ set CYPRESS_ENV=dev&& npx cypress run --spec cypress/e2e/squadAquisicao/*js --env grepTags=@tag
```

### Run test interface mode and display cypress playground.

```
$ npx cypress open
```

or 

```
$ set CYPRESS_ENV=qa&& npx cypress open
```

---

## Development Pattern

> Page Objects

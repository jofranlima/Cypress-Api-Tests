# CYPRESS AUTOMATION TESTS 

> Automation project using cypress

---
## Structure 

#### configs 
 Folder with routes.js 

#### e2e
 Folder with tests

#### configs 
 Page objects structure

#### support
 Folder with CNPJ generator, fake data generator and test summary

## Installation

> After the clone this repository, follow the steps:

- Install all dependencies (package.json)
`npm install`

### Run tests

> run test headless mode

```
$ npx cypress run
```


### Run test interface mode and display cypress playground.

```
$ npx cypress open
```

or 

```
$ set CYPRESS_ENV=qa && npx cypress open
```

---

## Development Pattern

> Page Objects

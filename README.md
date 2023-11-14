# AngularUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deployment

* Run `ng build -c production` to build the project for production. The build artifacts will be stored in the `dist/` directory.
* Copy the contents of the `dist/` directory to the server.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

    npx cypress open --e2e -b chrome

## Server configuration

.htaccess must be copied to /das-tool-2 on the server.
More details: see src/.htaccess

## Accessing local server from smartphone

Run
  
    ng serve --host 192.168.178.40

Windows Firewall must be configured to allow access to port 4200 and 8090 (rest-api Port) from the local network.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

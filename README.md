
# Devin Riley: Solution to HipChat FE Coding Exercise

Welcome to my solution to this coding exercise.

I architected the frontend to be highly extensible, hence the module structure. I did not create any additional components except for the single container because most of the challenge seemed to be around the services and parsing, not on creating reusable components. This ended up making the code much more readable. There could have been an input and output component.

A backend was neccessary because of CORS issues when trying to use AJAX to get other sites. The backend is very simple as well, it hosts one folder and one additional POST route that takes an array of strings as input and validates they are urls. Once validated it uses Osmosis, a webscraping library, to find the title tag of each url sent.

I only set up tests to mimic the exercise requirements and they are for the service which parses the string. Integration tests are notoriously difficult in AngularJS because of dependency injection. For that reason I would set up Postman tests to ensure the REST Api returned what I expected in the correct format. E2E tests would be next and I have listed the cases I would test below.

## Stack
FrontEnd: AngularJS 1.5.*
BackEnd: hapijs

Other:
Common: Angular Material, Karma, Jasmine

Osmosis: Webscraping Library I've used previously that I used to find title tag.

## Steps to Running the Application

### Install

```sh
npm install
```

### Building the Application
Note: This must be done at least once before running the application
```
npm run build
```

### Start the Server
```
npm start
```

Now navigate to [localhost:2500](http://localhost:2500)

### Development
FrontEnd Development is best with Webpack Dev Server for automatic reloading.
Note: Setting up a CORS policy seemed like overkill for this project, therefore you wont be able to hit the api for finding 'title' tags from urls
Note: the dev-server runs on [localhost:8081](http://localhost:8081)
```
npm run dev
```

### Testing
Note: the backend server must be running for front end tests
```sh
npm test
```

## Coming Soon

Some features seemed like overkill for such a small application.

- [ ] Babel - Make sure even IE8 is supported
- [ ] Protractor E2E Tests
- [ ] Integration Tests
- [ ] Linting
- [ ] PrePush - Linting, Test

### e2e test cases
- make sure text area is enabled and visible
- make sure button is clickable and visible
- make sure input text is cleared after clicking parse
- make sure ng-repeat grows after clicking parse

### integration test
- make sure the format of response is correct

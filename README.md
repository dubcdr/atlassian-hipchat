# Devin Riley: Solution to HipChat FE Coding Exercise

## Stack
FrontEnd: AngularJS 1.5.*
BackEnd: hapijs

Other:
Common: Angular Material, Karma, Protractor,

Osmosis: Webscraping Library i've used previously that I used to find title tag

## Steps to Running the Application

### Install

```sh
npm install
```

### Building the Application
```
npm run build
```

### Start the Server
```
npm start
```

Now navigate to localhost:2500

### Development
FrontEnd Development is best with Webpack Dev Server for automatic reloading.
Note: Setting up a CORS policy seemed like overkill for this project, therefore you wont be able to hit the api for finding 'title' tags from urls
```
npm run dev
```
Note this dev-server runs on localhost:8081

### Testing

```sh
npm test
```

## Coming Soon

Some features seemed like overkill for such a small application.

[ ] Babel - Make sure even IE8 is supported
[ ] Protractor E2E Tests

### e2e test cases
- make sure text area is enabled and visible
- make sure button is clickable and visible
- make sure input text is cleared after clicking parse
- make sure ng-repeat grows after clicking parse

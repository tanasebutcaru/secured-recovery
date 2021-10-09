# Secured Recovery
> Extra security layer for your recovery codes, secret questions' answers, crypto seed phrase, etc.

## Getting started
Setup the local environment:
```bash
# use the correct NodeJS version
nvm use

# install all NodeJs dependencies
npm install
```
## Development
The following scripts are available:
- `npm start`:
  - runs the app in development mode;
  -  open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test`:
  - launches the test runner in the interactive watch mode
  - check the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
- `npm run build`:
  - builds the app for production to the `build` folder
  - the build is minified and optimized for best performance
  - app is ready to be deployed

## Deployment
To build the app for production and deploy the build to the `gh-pages` branch the following scripts are available:
- `npm run deploy`:
  - runs the `build` script as a prerequisite
  - uses the `gh-pages` script to push the content of the `build` directory in the remote `gh-pages` branch
  - view the content of the `gh-pages` branch in the browser at [https://tbutcaru.github.io/secured-recovery](https://tbutcaru.github.io/secured-recovery)

## Run the app locally
For an extra layer of security when encrypting/decrypting your secrets you might want to turn off the internet connection and run the app locally by following these steps:
   1. TBD

## TODOs
1. JS utils unit tests.
2. Lint JS & CSS.
3. Encrypt page tests: single chunk, multiple chunks, too large input, (clean) start over flow.
4. Decrypt page tests: TBD.
## Contributing
Feel free to fork and create a PR to this project if you feel like you can improve the performance, security or if you want to implement a new feature.

----
This project was bootstraped using the [CRA](https://github.com/facebook/create-react-app) tool.   
Licence: MIT 

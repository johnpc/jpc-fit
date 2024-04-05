# fit.jpc.io

A dead-simple calorie tracking app, for web and ios (must use iOS to use HealthKit data).

The data resets every day, so each day you can start fresh to meet your health goals.

## Setup

Clone the repo, install dependencies, deploy backend resources:

```bash
git clone git@github.com:johnpc/jpc-fit.git
cd jpc-fit
npm install
npx cap sync
npx amplify sandbox
```

Then, to run the frontend app

```bash
# on web
npm run dev
```

or

```bash
# on ios
npm run ios
```

## Deploying

Deploy this application to your own AWS account in one click:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/johnpc/jpc-fit)

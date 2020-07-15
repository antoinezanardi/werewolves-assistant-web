# 🐺 Werewolves Assistant Web

[![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web/releases/)
[![GitHub license](https://img.shields.io/github/license/antoinezanardi/werewolves-assistant-web.svg)](https://github.com/antoinezanardi/https://img.shields.io/github/license/werewolves-assistant-web.svg/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/antoinezanardi/werewolves-assistant-web.svg?branch=master)](https://travis-ci.org/antoinezanardi/werewolves-assistant-web)
[![Known Vulnerabilities](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web/badge.svg?targetFile=package.json)](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web?targetFile=package.json)
[![Contributions are welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/antoinezanardi/werewolves-assistant-web/issues)

[![Open Source Love svg3](https://badges.frapsoft.com/os/v3/open-source.svg?v=103)](https://github.com/antoinezanardi/werewolves-assistant-web/)

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/antoinezanardi/)
[![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web)

## 🐺 Description
Werewolves Assistant Web is a Vue web app using the [Werewolves Assistant API](https://github.com/antoinezanardi/werewolves-assistant-api).
Thanks to this app, be the game master of the Werewolves game is so easy ! Try it out now with live demos below.

## 🌻 Live demos
Two environments are set up:
* **Sandbox**: https://sandbox.werewolves-assistant.antoinezanardi.fr
* **Production**: https://werewolves-assistant.antoinezanardi.fr

For your tests, please use the **Sandbox URL**.

## 🔨 Installation
1. Install dependencies with `npm install` (add `--production` if you install the project on a remote server)
2. Copy `.env.example` and paste it as `.env`
3. Replace environment values in the fresh new `.env` file if necessary:
    * **VUE_APP_WEREWOLVES_ASSISTANT_API_URL**: Base URL of Werewolves Assistant API.
    * **VUE_APP_SENTRY_KEY**: Private key used by Sentry for authenticating the project.
    * **VUE_APP_SENTRY_PROJECT_ID**: Project ID used by Sentry.
    * **VUE_APP_SENTRY_ENABLED**: If you want to enable error tracking. Don't activate it if you're not on remote server.


## 🔌 Let's go
To start the web app **on development mode**, simply run `npm start`.

To start the web app **on production mode**, run `npm run build` and host the `dist` folder with `http-server` for example.

## ⚙️ Other useful commands
- **Lint**: `npm run lint` checks for code style. Based on AirBnB configuration with many more rules.
- **Build**: `npm run build` launches the Vue build process and .
- **Unit tests**: `npm run test:unit` runs various unit tests using `mocha` and `chai`.
- **E2E tests**: `npm run test:e2e` runs various E2E tests using `cypress`.

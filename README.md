# 🐺 Werewolves Assistant Web

[![Build Status](https://travis-ci.org/antoinezanardi/werewolves-assistant-web.svg?branch=master)](https://travis-ci.org/antoinezanardi/werewolves-assistant-web)
[![GitHub license](https://img.shields.io/github/license/antoinezanardi/werewolves-assistant-web.svg)](https://github.com/antoinezanardi/https://img.shields.io/github/license/werewolves-assistant-web.svg/blob/master/LICENSE)

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
3. Replace environment values in the fresh new `.env` file if necessary

## 🔌 Let's go
To start the web app **on development mode**, simply run `npm start`.

To start the web app **on production mode**, run `npm run build` and host the `dist` folder with `http-server` for example.

## ⚙️ Other useful commands
- **Lint**: `npm run lint` checks for code style. Based on AirBnB configuration with many more rules.
- **Build**: `npm run build` launches the Vue build process and .
- **Unit tests**: `npm run test:unit` runs various unit tests using `mocha` and `chai`.
- **E2E tests**: `npm run test:e2e` runs various E2E tests using `cypress`.

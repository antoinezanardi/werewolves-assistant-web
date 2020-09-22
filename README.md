# 🐺 Werewolves Assistant Web

[![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web/releases/)
[![GitHub license](https://img.shields.io/github/license/antoinezanardi/werewolves-assistant-web.svg)](https://github.com/antoinezanardi/https://img.shields.io/github/license/werewolves-assistant-web.svg/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/antoinezanardi/werewolves-assistant-web.svg?branch=master)](https://travis-ci.org/antoinezanardi/werewolves-assistant-web)
[![Known Vulnerabilities](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web/badge.svg?targetFile=package.json)](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web?targetFile=package.json)
[![Contributions are welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/antoinezanardi/werewolves-assistant-web/issues)

[![ForTheBadge open-source](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/antoinezanardi/)
[![ForTheBadge made-with-vue](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)

## 🐺 What is this tool ?
**🐺 Werewolves Assistant Web** is a Vue web app using the <a href="https://github.com/antoinezanardi/werewolves-assistant-api" target="_blank">Werewolves Assistant API</a>.
Thanks to this app, being the game master of the Werewolves of Millers Hollow game is so easy ! 

**🐺 Werewolves Assistant Web** provides to game masters:
- A game lobby for creating a party starting from 4 to 20 players. Roles can be assigned randomly to save time.
- A cool interface displaying all useful game's data to the game master.
- For each turn, game master can fill every player's choices. The Assistant will consequently display deaths and events, manage the turns order and save all players choices.
- At the end of the game, a complete summary with game's winner and what happened during the game.

#####🤔 Want to know more about this awesome project ? <a href="https://werewolves-assistant.antoinezanardi.fr/about" target="_blank">**Check out the dedicated about page**</a>.

## 🔍 Let's try !
Two versions are available for testing this project:

✨<a href="https://werewolves-assistant.antoinezanardi.fr" target="_blank">**Main version**</a>

🔧<a href="https://sandbox.werewolves-assistant.antoinezanardi.fr" target="_blank">**Sandbox version**</a>

**Sandbox version** may contains some bugs and unexpected behaviors as its purpose is to test new features before deploying on **main version**.

## 📈 Versions & changelog
Each change when a new version comes up is listed in the <a href="https://github.com/antoinezanardi/werewolves-assistant-web/blob/master/CHANGELOG.md" target="_blank">CHANGELOG.md file</a> placed at project's root.

Also, you can keep up with changes by watching releases with the **Watch GitHub button** at the top of this page.

Current release on **main version** is [![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web/releases/).

###### 🏷️ <a href="https://github.com/antoinezanardi/werewolves-assistant-web/releases" target="_blank">All releases for this project are available here</a>. 

## ☑️ Code analysis and consistency
In order to keep the code clean, consistent and free of bad JS practises, **[ESLint](https://eslint.org/)** is installed with nearly **313 rules activated** !

Complete list of all enabled rules is available in the **[.eslintrc.js file](https://github.com/antoinezanardi/werewolves-assistant-web/blob/master/.eslintrc.js)**.

## 🔨 Installation
1. Install dependencies with `npm install` (add `--production` to omit dev dependencies).
2. Copy `.env.example` and paste it as `.env`.
3. Replace environment values in the fresh new `.env` file if necessary:
    * **VUE_APP_WEREWOLVES_ASSISTANT_API_URL**: Base URL of Werewolves Assistant API.
    * **VUE_APP_SENTRY_KEY**: Private key used by Sentry for authenticating the project. (_Not required_)
    * **VUE_APP_SENTRY_PROJECT_ID**: Project ID used by Sentry. (_Not required_)
    * **VUE_APP_SENTRY_ENABLED**: If you want to enable error tracking. (_Not required_)

## 🔌 Let's go
To start the web app **on development mode**, simply run `npm start`.

To start the web app **on production mode**, run `npm run build` and host the `dist` folder with an HTTP server.

## ⚙️ Other useful commands
- **Lint**: `npm run lint` checks for code style.
- **Build**: `npm run build` launches the Vue build process.
- **Unit tests**: `npm run test:unit` runs various unit tests using `mocha` and `chai`.
- **E2E tests**: `npm run test:e2e` runs various E2E tests using `cypress`.

## ❤️ Contributor list

There are no contributor yet... Be the first one by **[creating a pull request](https://github.com/antoinezanardi/werewolves-assistant-web/pulls)** !
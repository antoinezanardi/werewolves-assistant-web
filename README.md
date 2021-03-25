# 🐺 Werewolves Assistant Web

[![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web/releases/)
[![GitHub license](https://img.shields.io/github/license/antoinezanardi/werewolves-assistant-web.svg)](https://github.com/antoinezanardi/https://img.shields.io/github/license/werewolves-assistant-web.svg/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/antoinezanardi/werewolves-assistant-web.svg?branch=master)](https://travis-ci.org/antoinezanardi/werewolves-assistant-web)
[![Known Vulnerabilities](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web/badge.svg?targetFile=package.json)](https://snyk.io/test/github/antoinezanardi/werewolves-assistant-web?targetFile=package.json)
[![Contributions are welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/antoinezanardi/werewolves-assistant-web/issues)

[![ForTheBadge open-source](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/antoinezanardi/)
[![ForTheBadge made-with-vue](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)

## 📋 Table of Contents

1. 🐺 [What is this tool ?](#what-is-this-tool)
2. 🔍 [Let's try !](#lets-try)
3. 🃏 [Roles available](#roles-available)
5. 📈 [Versions & changelog](#versions)
6. ☑️ [Code analysis and consistency](#code-analysis-and-consistency)
7. 🔨 [Installation](#installation)
8. 🔌 [Let's go](#lets-go)
9. ⚙️ [Other useful commands](#other-useful-commands)
10. ©️ [License](#license)
11. ❤️ [Contributors](#contributors)

## <a name="what-is-this-tool">🐺 What is this tool ?</a>
**🐺 Werewolves Assistant Web** is a Vue web app using the <a href="https://github.com/antoinezanardi/werewolves-assistant-api" target="_blank">Werewolves Assistant API</a>.
Thanks to this app, being the game master of the Werewolves of Millers Hollow game is so easy ! 

**🐺 Werewolves Assistant Web** provides to game masters:
- A game lobby for creating a party starting from 4 to 20 players. Roles can be assigned randomly to save time.
- A cool interface displaying all useful game's data to the game master.
- For each turn, game master can fill every player's choices. The Assistant will consequently display deaths and events, manage the turns order and save all players choices.
- At the end of the game, a complete summary with game's winner and what happened during the game.

#### 🤔 Want to know more about this awesome project ? <a href="https://werewolves-assistant.antoinezanardi.fr/about" target="_blank">**Check out the dedicated about page**</a>.

## <a name="lets-try">🔍 Let's try !</a>
Two versions are available for testing this project:

✨<a href="https://werewolves-assistant.antoinezanardi.fr" target="_blank">**Main version**</a>

🔧<a href="https://sandbox.werewolves-assistant.antoinezanardi.fr" target="_blank">**Sandbox version**</a>

**Sandbox version** may contains some bugs and unexpected behaviors as its purpose is to test new features before deploying on **main version**.

Both versions are running on a server with the following configuration:
- **OS**: `Debian GNU/Linux 10 (buster)`
- **NodeJS**: `v14.15.4`
- **NPM**: `v7.5.2`
- **MongoDB shell version**: `v4.4.3`

The MongoDB database is protected under username and password authentication.

## <a name="roles-available">🃏 Roles available</a>

On this current version [![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web/releases/), **24 different roles** are available to play:

- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/werewolf.png" width="25"/> The Werewolf**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/big-bad-wolf.png" width="25"/> The Big-Bad-Wolf**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/vile-father-of-wolves.png" width="25"/> The Vile Father Of Wolves**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/white-werewolf.png" width="25"/> The White Werewolf**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/villager.png" width="25"/> The Villager**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/villager.png" width="25"/> The Villager-Villager**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/seer.png" width="25"/> The Seer**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/cupid.png" width="25"/> The Cupid**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/witch.png" width="25"/> The Witch**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/hunter.png" width="25"/> The Hunter**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/little-girl.png" width="25"/> The Little Girl**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/guard.png" width="25"/> The Guard**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/ancient.png" width="25"/> The Ancient**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/scapegoat.png" width="25"/> The Scapegoat**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/idiot.png" width="25"/> The Idiot**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/two-sisters.png" width="25"/> The Two Sisters**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/three-brothers.png" width="25"/> The Three Brothers**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/stuttering-judge.png" width="25"/> The Stuttering Judge**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/wild-child.png" width="25"/> The Wild Child**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/dog-wolf.png" width="25"/> The Dog-Wolf**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/thief.png" width="25"/> The Thief**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/angel.png" width="25"/> The Angel**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/pied-piper.png" width="25"/> The Pied Piper**
- **<img src="https://werewolves-assistant-api.antoinezanardi.fr/img/roles/raven.png" width="25"/> The Raven**

Please check the <a href="https://werewolves-assistant-api.antoinezanardi.fr/apidoc/#player-roles" target="_blank">**Player role section on API documentation**</a> or the <a href="https://werewolves-assistant.antoinezanardi.fr/about" target="_blank">**Available Roles section on the official website**</a> for more details about each role.

## <a name="versions">📈 Versions & changelog</a>
Each change when a new version comes up is listed in the <a href="https://github.com/antoinezanardi/werewolves-assistant-web/blob/master/CHANGELOG.md" target="_blank">CHANGELOG.md file</a> placed at project's root.

Also, you can keep up with changes by watching releases with the **Watch GitHub button** at the top of this page.

Current release on **main version** is [![GitHub release](https://img.shields.io/github/release/antoinezanardi/werewolves-assistant-web.svg)](https://GitHub.com/antoinezanardi/werewolves-assistant-web/releases/).

**[Travis](https://travis-ci.com)** helps the project to be automatically updated by deploying new versions for both **sandbox** and **main** versions. Please refer to the **[.travis.yml file](https://github.com/antoinezanardi/werewolves-assistant-web/blob/master/.travis.yml)** for more details.

###### 🏷️ <a href="https://github.com/antoinezanardi/werewolves-assistant-web/releases" target="_blank">All releases for this project are available here</a>. 

## <a name="code-analysis-and-consistency">☑️ Code analysis and consistency</a>
In order to keep the code clean, consistent and free of bad JS practises, **[ESLint](https://eslint.org/)** is installed with nearly **320 rules activated** !

Complete list of all enabled rules is available in the **[.eslintrc.js file](https://github.com/antoinezanardi/werewolves-assistant-web/blob/master/.eslintrc.js)**.

## <a name="installation">🔨 Installation</a>
1. Install dependencies with `npm install` (add `--production` to omit dev dependencies).
2. Copy `.env.example` and paste it as `.env`.
3. Replace environment values in the fresh new `.env` file if necessary (When **⚠️️ Required** is specified):
    * **VUE_APP_WEREWOLVES_ASSISTANT_API_URL**: Base URL of Werewolves Assistant API.
        -  _**⚠️️ Required**_
    * **VUE_APP_SENTRY_KEY**: Private key used by Sentry for authenticating the project.
        -  _**Not Required**_
    * **VUE_APP_SENTRY_PROJECT_ID**: Project ID used by Sentry.
        -  _**Not Required**_
    * **VUE_APP_SENTRY_ENABLED**: If you want to enable error tracking with Sentry.
        -  _**Not Required - Default value**_: `false`
    * **VUE_APP_GOOGLE_ANALYTICS_ID**: Tracking and measurement ID used by Google Analytics.
        -  _**Not Required**_
    * **VUE_APP_GOOGLE_ANALYTICS_ENABLED**: If you want to enable traffic data measurement with Google Analytics.
        -  _**Not Required - Default value**_: `false`
   * **VUE_APP_FACEBOOK_APP_ID**: Facebook application ID if you want to enable Facebook authentication.
       -  _**Not Required**_
   * **VUE_APP_GOOGLE_CLIENT_ID**: Google client ID if you want to enable Google authentication.
       -  _**Not Required**_

## <a name="lets-go">🔌 Let's go</a>
To start the web app **on development mode**, simply run `npm start`.

To start the web app **on production mode**, run `npm run build` and host the `dist` folder with an HTTP server.

## <a name="other-useful-commands">⚙️ Other useful commands</a>
- **Lint**: `npm run lint` checks for code style.
- **Build**: `npm run build` launches the Vue build process.
- **Unit tests**: `npm run test:unit` runs various unit tests using `mocha` and `chai`.
- **E2E tests**: `npm run test:e2e` runs various E2E tests using `cypress`.

## <a name="license">©️ License</a>

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT).

## <a name="contributors">❤️ Contributors</a>

There are no contributor yet... Be the first one by **[creating a pull request](https://github.com/antoinezanardi/werewolves-assistant-web/pulls)** !
# 📈 LIST OF CHANGES FOR WEREWOLVES ASSISTANT WEB

## 1.0.0-beta.4 (2020-08-??)

### 🚀 New features

* [#25](https://github.com/antoinezanardi/werewolves-assistant-web/issues/25) - User can cancel a playing game by clicking on the button in the nav bar.
* [#26](https://github.com/antoinezanardi/werewolves-assistant-web/issues/26) - Canceled game has now a dedicated page.

### 🌟 Enhancements

* [#29](https://github.com/antoinezanardi/werewolves-assistant-web/issues/29) - `README.md` file has been approved with new badges and 4 new sections. 
* [#31](https://github.com/antoinezanardi/werewolves-assistant-web/issues/31) - `ESLint` rules completed with `vue` rules and some forgotten other rules. `.eslintrc.js` file contains now all existing rules. 

### 🐛 Bug fixes

* [#28](https://github.com/antoinezanardi/werewolves-assistant-web/issues/28) - If the user tries to get a game with an unknown id, he is redirected to home page.

### ♻️ Refactoring

* `game` object is not a property anymore but stored into `vuex` store.

### 📦 Packages

* `@sentry/browser` updated to version `5.23.0`.
* `@sentry/integrations` updated to version `5.23.0`.
* `@vue/cli-plugin-e2e-cypress` updated to version `4.5.6`.
* `@vue/cli-plugin-eslint` updated to version `4.5.6`.
* `@vue/cli-plugin-router` updated to version `4.5.6`.
* `@vue/cli-plugin-unit-mocha` updated to version `4.5.6`.
* `@vue/cli-plugin-vuex` updated to version `4.5.6`.
* `@vue/cli-service` updated to version `4.5.6`.
* `@vue/test-utils` updated to version `1.1.0`.
* `animate.css` updated to version `4.1.1`.
* `axios` updated to version `0.20.0`.
* `eslint` updated to version `7.9.0`.
* `sass-loader` updated to version `10.0.2`.
* `sweetalert2` updated to version `10.0.2`.
* `vee-validate` updated to version `3.3.11`.
* `vue` updated to version `2.6.12`.
* `vue-i18n` updated to version `8.21.1`.
* `vue-template-compiler` updated to version `2.6.12`.

---

## 1.0.0-beta.3 (2020-08-15)

### 🌟 Enhancements

* [#21](https://github.com/antoinezanardi/werewolves-assistant-web/issues/21) - Responsive design for large screens, tablets and phones on:
    - `Home` page.
    - `Statistics` page.
    - `About` page.
    - `GameLobby` page.
    - `Game` page.
* Sweet animation when player has to choose a role in game lobby.
* Better sort of players on villager side. Sort first by `isAlive` and then by `role`. Villagers with powers are on top of the list.

### 🐛 Bug fixes

* [#22](https://github.com/antoinezanardi/werewolves-assistant-web/issues/22) - Werewolf card in `About` page header was not properly displayed on Safari.
* [#22](https://github.com/antoinezanardi/werewolves-assistant-web/issues/22) - Bad flexbox display in `GameLobby` page on Safari.
* [#22](https://github.com/antoinezanardi/werewolves-assistant-web/issues/22) - Bad flexbox display  for game events during a game on Safari.

### 📦 Packages

* `@sentry/browser` updated to version `5.21.0`.
* `@sentry/integrations` updated to version `5.21.0`.
* `eslint` updated to version `7.7.0`.
* `vue-i18n` updated to version `5.21.0`.

---

## 1.0.0-beta.2 (2020-08-12)

### 🚀 New features

* [#11](https://github.com/antoinezanardi/werewolves-assistant-web/issues/11) - `About` page added with a lot of useful information.
* [#16](https://github.com/antoinezanardi/werewolves-assistant-web/issues/16) - On each role action during a game, a tutorial explains all: role, purpose, why, consequences.
* [#18](https://github.com/antoinezanardi/werewolves-assistant-web/issues/18) - Tutorial for `GameLobby` page which explains how to start a game.

### 🐛 Bug fixes

* [#10](https://github.com/antoinezanardi/werewolves-assistant-web/issues/10) - Fixed some typography errors in game events.

### 🌟 Enhancements

* [#12](https://github.com/antoinezanardi/werewolves-assistant-web/issues/12) - Navigation between game event messages enabled with left and right arrow keys.
* [#14](https://github.com/antoinezanardi/werewolves-assistant-web/issues/14) - Message for preventing tie in votes during sheriff election.
* Pick-up line added on `Home` page for explaining the concept of Werewolves Assistant.
* Version number added on `Home` page.

### 📚 Documentation

* Links for [Werewolves Assistant API](https://github.com/antoinezanardi/werewolves-assistant-api) and demos on `README.md` open now a new tab when clicked.

### 📦 Packages

* `vue-github-buttons` installed with version `3.1.0`.
* `vue-tour` installed with version `1.5.0`.
* `@vue/cli-plugin-e2e-cypress` updated to version `4.5.3`.
* `@vue/cli-plugin-router` updated to version `4.5.3`.
* `@vue/cli-plugin-unit-mocha` updated to version `4.5.3`.
* `@vue/cli-plugin-vuex` updated to version `4.5.3`.
* `@vue/cli-service` updated to version `4.5.3`.
* `bootstrap` updated to version `4.5.3`.
* `sass-loader` updated to version `9.0.3`.
* `vee-validate` installed with version `3.3.9`.
* `vue-router` updated to version `3.4.3`.
* `vue-select` updated to version `3.10.8`.

---

## 1.0.0-beta.1 (2020-08-03)

### 🚀 New features

* If the user leaves a playing game, a confirm alert is triggered.
* If the user leaves the game lobby while composition has started, a confirm alert is triggered.
* Timer of 5 minutes added for `elect-sheriff` and `vote` plays.
* Game events like player death, role turn and some effect (like seen or promoted sheriff) are displayed during the game.
* Game summary is available at the end of a game with game results and game history.
* `sitemaps.xml` file added for SEO.

### 🌟 Enhancements

* The trophy at the end of a game has a sweet `TADA !` animation.
* When player are voting, the text `vote for` has been UX improved.
* Quit button added to Game Lobby.

### 🐛 Bug fixes

* Werewolf side doesn't have an overflow-y anymore.
* User is redirected to home page if he tries to load a game he doesn't own.

### 📦 Packages

* `@chenfengyuan/vue-countdown` installed with version `1.1.5`.
* `animate.css` installed with version `4.1.0`.
* `uniqid` installed with version `5.2.0`.
* `@sentry/browser` updated to version `5.20.1`.
* `@sentry/integrations` updated to version `5.20.1`.
* `eslint` updated to version `7.6.0`.
* `sweetalert2` updated to version `9.17.1`.
* `vee-validate` updated to version `3.3.8`.
* `vue-i18n` updated to version `8.20.0`.
* `vue-roller` updated to version `1.12.3`.

---

## 0.2.0 (2020-07-24)

### 🚀 New features

* Statistics page done with basic infos like winning percent and most used role.
* Target are cancelable when chosen during a game action.
* Added few metadata for SEO.
* Added contact, GitHub and Buy Me A Coffee buttons on home page.
* Sentry added for monitoring bugs.

### 🌟 Enhancements

* Transition for changing game action, phases and card during a game.
* In the header during a game, the card flips to a new one according to the new game action.
* Werewolves and Villagers sides during a game have death transitions.
* Disclaimer added for GDPR in register panel.
* When witch's turn, user is notified if both of her potion are used.
* Sweet fade animations on player attributes.

### 🐛 Bug fixes

* `seen` attribute well displayed in player stripes.
* Display good error message if there is a tie in votes during sheriff election.
* Good alignment (right) for player stripes in werewolves side.
* When token is expired, good redirection to home page.

### 📚 Documentation

* Link for [Werewolves Assistant API](https://github.com/antoinezanardi/werewolves-assistant-api) on `README.md` fixed.

### 📦 Packages

* `@sentry/browser` installed with version `5.20.0`.
* `@sentry/integrations` installed with version `5.20.0`.
* `@fortawesome/fontawesome-free` updated to version `5.14.0`.
* `eslint` updated to version `7.5.0`.
* `sweetalert2` updated to version `9.17.0`.
* `vue-roller` updated to version `1.12.1`.

---

## 0.1.0 (2020-07-13)

### 🚀 New features

* Game lobby page with game composition, random repartition and role picker. 
* Home page with play, log in, log out and stats buttons (placeholder for stat button).
* Game with all basic roles. User can restart with same players at the end of the game.
* Authentication logic with account modal. Two tabs with log in and register panel.
* MIT License added.
* Pretty badges added into `README.md` file.

### 📦 Packages

* `@fortawesome/fontawesome-free` installed with version `5.13.1`.
* `axios` installed with version `0.19.2`.
* `bootstrap` installed with version `4.5.0`.
* `epic-spinner` installed with version `1.1.0`.
* `jquery` installed with version `3.5.1`.
* `jsonwebtoken` installed with version `8.5.1`.
* `node-sass` installed with version `4.14.1`.
* `popper.js` installed with version `1.16.1`.
* `qs` installed with version `6.9.4`.
* `sass-loader` installed with version `9.0.2`.
* `sweetalert2` installed with version `9.15.3`.
* `v-tooltip` installed with version `3.3.5`.
* `vee-validate` installed with version `3.3.7`.
* `vue-flip` installed with version `1.0.2`.
* `vue-i18n` installed with version `8.18.2`.
* `vue-roller` installed with version `1.9.0`.
* `vue-select` installed with version `3.10.7`.
* `vue-toasted` installed with version `1.1.28`.
* `@vue/cli-plugin-e2e-cypress` updated to version `4.4.6`.
* `@vue/cli-plugin-eslint` updated to version `4.4.6`.
* `@vue/cli-plugin-router` updated to version `4.4.6`.
* `@vue/cli-plugin-unit-mocha` updated to version `4.4.6`.
* `@vue/cli-plugin-vuex` updated to version `4.4.6`.
* `@vue/cli-service` updated to version `4.4.6`.
* `@vue/eslint-config-airbnb` updated to version `5.1.0`.
* `eslint` updated to version `7.4.0`.
* `eslint-plugin-import` updated to version `2.22.0`.
* `vuex` updated to version `3.5.1`.

---

## 0.0.0 (2020-06-20)

### 🚀 New features

* Starting this awesome project using `@vue/cli`.
* `eslint` configured with `.eslintrc.js` file.
* Setting up `.env` files.
* `.editorconfig` file added for code constancy.
* `.travis.yml` file added for continuous integration for `sandbox` and `production` demos.

### 📦 Packages

* `eslint` updated to version `7.3.0`.
* Set of required packages installed for Vue, lint and tests.

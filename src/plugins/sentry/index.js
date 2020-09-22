import Vue from "vue";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import Config from "../../../config";

if (Config.sentry.enabled) {
    Sentry.init({
        dsn: `https://${Config.sentry.key}.ingest.sentry.io/${Config.sentry.projectId}`,
        integrations: [new VueIntegration({ Vue, attachProps: true })],
    });
}
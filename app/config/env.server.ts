import { z } from "zod";

const schema = z.object({
  APP_NAME: z.string().min(1).default("Keycloak-POC"),
  APP_VERSION: z.string().min(1).default("-"),
  APP_URL: z.string().min(1),
  KC_REALM: z.string().min(1),
  KC_CLIENT_ID: z.string().min(1),
  KC_BASE_URL: z.string().min(1),
  KC_CLIENT_SECRET: z.string().min(1),
});

type ENV = z.infer<typeof schema>;

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}

export const getEnv = () => schema.parse(process.env);

/**
 * All the Env variables that will be available to application's client-side.
 * @example
 * ["APP_NAME"]
 */
export const publicEnvVars: string[] = [
  "APP_NAME",
  "APP_VERSION"
];

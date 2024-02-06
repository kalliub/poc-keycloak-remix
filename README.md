# Remix-Keycloak

This is a POC (Proof Of Concept) project to demonstrate how to integrate Keycloak with Remix.

The main goal of this project is to assemble a complete environment with only 3 effective routes.

- `/`: The main page, that redirects user to the login page if not authenticated or to the dashboard if authenticated.
- `/dashboard`: The dashboard page, only accessible if the user is authenticated. Redirects back to the login if not.
- `/logout`: The logout page, that redirects the user to the Keycloak logout page.

All the other routes are for Keycloak's operation only.

## Setup

### Postgres

First, you must create a database called `keycloak-db` with a `keycloak-schema` schema. You can do this with PGAdmin, on `localhost:6001`. The credentials are `dev@dev.com` and `dev@1234`.

Without this database and schema configured, the Keycloak container will not start.

### Keycloak and .env file

With Keycloak running, you can access the admin console on `localhost:8080`. The credentials are `admin` and `admin`.

You must create a new Realm and then a new Client inside this realm. The configurations for this Realm and Client ID are defined by the `.env` file, once this is the configuration for the Remix frontend access Keycloak.

When creating the client, you must set the following:

#### Capability Config

- Client authentication: `true`
- Authorization: `true`

#### Login Settings

- Root URL: `http://localhost:3000`
- Home URL: `/`
- Valid Redirect URIs: `/auth/keycloak/callback`
- Valid post logout redirect URIs: `/`
- Web Origins: `*`

After creating the client inside your new realm, go to the `Credentials` tab and copy the `Client Secret` value. This value must be set in the `.env` file as `KC_CLIENT_SECRET`.

Now you can set the `KC_REALM` and `KC_CLIENT_ID` values in the `.env` file.

### Remix

Because of IP issues when running the application inside a container, you must run the Remix application outside the container. You can do this with the following command:

```bash
  npm install
  npm run dev
```

Now you can access the application on `localhost:3000`.

The reason for this is that Remix tries to access the Keycloak server on `localhost:8080`, but Keycloak is not on localhost of the Remix container, but on the host machine.

## How to run

The entire application is dockerized, so you can run it ([I recommend you to check the Postgres setup first](#postgres)) with the following command:

```bash
  docker compose up

  # or, if you don't want to run pgadmin
  docker compose run -it --service-ports keycloak 
```

Note that Keycloak will probably stop running because of the database configuration.

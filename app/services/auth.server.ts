import { Authenticator } from "remix-auth";
import { KeycloakStrategy } from "remix-keycloak";
import { sessionStorage } from "~/services/session.server";
import { User } from "~/types/User.interface";


const keycloakStrategy = new KeycloakStrategy(
  {
    useSSL: ENV.KC_USE_SSL === "true",
    domain: ENV.KC_BASE_URL,
    realm: ENV.KC_REALM,
    clientID: ENV.KC_CLIENT_ID,
    clientSecret: ENV.KC_CLIENT_SECRET,
    callbackURL: `${ENV.APP_URL}/auth/keycloak/callback`,
  },
  async ({accessToken, refreshToken, profile: {displayName, _json: { preferred_username}}}) => {
    return {
      email: preferred_username,
      accessToken,
      refreshToken,
      firstName: displayName,
    } as User
  }
  );
  
// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(keycloakStrategy);
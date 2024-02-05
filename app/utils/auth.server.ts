import { Authenticator } from "remix-auth";
import { KeycloakStrategy } from "remix-keycloak";
import { sessionStorage } from "~/services/session.server";
import { User } from "~/types/User.interface";


const keycloakStrategy = new KeycloakStrategy(
  {
    // useSSL: true,
    domain: "localhost:8080",
    realm: "dev",
    clientID: "remix-web",
    clientSecret: "a7KO0CvpnGbPOidCBzuEVj1WHaUkaCkO",
    callbackURL: "http://localhost:3000/auth/keycloak/callback",
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
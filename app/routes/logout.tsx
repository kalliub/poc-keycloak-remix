import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.logout(request, {
    redirectTo: `http://${ENV.KC_BASE_URL}/realms/${ENV.KC_REALM}/protocol/openid-connect/logout?client_id=${ENV.KC_CLIENT_ID}`
  })
}
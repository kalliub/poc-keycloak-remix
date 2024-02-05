import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request)

  return authenticator.logout(request, {
    redirectTo: "/auth/keycloak/logout"
  })
}
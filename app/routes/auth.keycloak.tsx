import { redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";

import { authenticator } from "~/utils/auth.server";

export const loader: LoaderFunction = () => redirect("/");

export const action: ActionFunction = async ({ request }) => {
  const authenticate = await authenticator.authenticate("keycloak", request);
  if (!authenticate.accessToken) redirect("/")
  return redirect("/dashboard");
};
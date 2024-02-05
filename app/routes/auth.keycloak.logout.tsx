import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("http://localhost:8080/realms/dev/protocol/openid-connect/logout?client_id=remix-web")
}
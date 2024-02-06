import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request)
  if (user) {
    return redirect("/dashboard")
  }
  await authenticator.authenticate("keycloak", request);
  return null;
}

export default function Index() {
  return (
    <div>
      <h1>Hello, please log in.</h1>

      <Form action="/auth/keycloak" method="post">
        <button>Login with Keycloak</button>
      </Form>
    </div>
  );
}

import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { User } from "~/types/User.interface";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({request}) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return redirect("/")
  }
  return json({ message: "Hello"+user?.firstName+"!", user });
}

const Dashboard = () => {
  const {user}: {user: User} = useLoaderData();
  return (
    <div>
      <h1>Welcome {user.firstName}!</h1>

      <Link to="/logout">
        <button>
          Logout
        </button>
      </Link>
    </div>
  )
}

export default Dashboard
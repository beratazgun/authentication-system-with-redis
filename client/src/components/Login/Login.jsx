import { Link } from "react-router-dom";

import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="flex flex-row h-screen justify-center items-center">
      <div className="mx-auto ">
        <Link
          to={"/"}
          className="text-4xl text-white group-hover:text-violet-500"
        >
          <img
            src="https://res.cloudinary.com/dyp9wkl0p/image/upload/v1676196995/store/logo_lpdman.png"
            alt="logo"
            className="w-20 h-20 object-contain cursor-pointer"
          />
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;

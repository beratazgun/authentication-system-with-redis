import { useForm } from "react-hook-form";
import { faker } from "@faker-js/faker";
import { ImSpinner9 } from "react-icons/Im";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import authApi from "../../services/api/authApi";
import registerİnputConfig from "./registerİnputConfig";

const inputStyle = {
  normal:
    "bg-[#f4f4f4] px-4 py-2 text-black rounded-xl focus:outline outline-2 outline-violet-500 w-full",
  error:
    "px-4 py-2 rounded-xl text-black w-full bg-red-100  focus:outline outline-2 outline-red-500",
};

function RegisterForm() {
  const redirect = useNavigate();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number("###########"),
      password: "Password123_",
      passwordConfirm: "Password123_",
    },
    mode: "onBlur",
  });

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: async () => {
      await authApi(getValues(), "POST", "register");
    },
    onSuccess: () => {
      return redirect("/login");
    },
  });

  console.log(getValues());

  const inputField = (item) => {
    return (
      <div className="flex flex-col gap-1 w-full" key={item.id}>
        <label
          htmlFor={item.name}
          className="text-white text-sm font-semibold px-2"
        >
          {item.label}
        </label>
        <div className="relative flex flex-row items-center gap-1">
          <input
            id={item.tagId}
            type={item.type}
            className={errors[item.name] ? inputStyle.error : inputStyle.normal}
            {...register(item.name, item.registerOptions)}
          />
        </div>
        <div>
          {errors[item.name] && (
            <p className="text-red-500 text-sm px-2 py-1">
              {errors[item.name].message}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderedFieldsOne = registerİnputConfig.map((item, index) => {
    if (index <= 1) return inputField(item);
  });

  const renderedFieldsTwo = registerİnputConfig.map((item, index) => {
    if (index >= 2) return inputField(item);
  });

  return (
    <div>
      <div className="flex flex-col justify-center items-start pb-6 group">
        <h1 className="text-4xl font-bold text-white">
          Create Account<span className="text-violet-500">.</span>
        </h1>

        <div to="/login" className="text-white mt-2">
          Already have an account?
          <Link
            to={"/login"}
            className="text-violet-500 hover:underline-offset-4 hover:underline ml-2"
          >
            Login
          </Link>
        </div>
      </div>

      <form
        className="flex flex-col justify-center items-center h-full gap-4"
        onSubmit={handleSubmit((data) => data)}
      >
        <div className="flex flex-row gap-4">{renderedFieldsOne}</div>
        {renderedFieldsTwo}
        <div>
          <button
            onClick={() => mutate()}
            disabled={Object.keys(errors).length > 0}
            type="submit"
            className={
              Object.keys(errors).length > 0
                ? "w-full bg-violet-500 text-white rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg px-24 py-4 duration-300 cursor-no-drop"
                : "w-full bg-violet-500 text-white rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg px-24 py-4 duration-300"
            }
          >
            {isLoading ? (
              <ImSpinner9 className="animate-spin text-2xl text-white" />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;

"use client";

import styles from "./page.module.css";
import { montserrat } from "../utils/fonts";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const Login = () => {
  const [loginOrSignup, setLoginOrSignup] = useState(true);

  const form = useForm();
  const { register, /*control,*/ handleSubmit, formState } = form;
  const { errors } = formState;

  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState(
    searchParams.get("error")
      ? searchParams.get("error") === "CredentialsSignin"
        ? "Invalid Credentials"
        : "Callback error. Try again"
      : ""
  );
  const [submitting, setSubmitting] = useState(false);

  // console.log(invalidCredentials);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError("");

    if (loginOrSignup) {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
      // console.log(res?.data);
    } else {
      // console.log(data);
      const res = await fetch("/api/auth/users", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          // console.log(response);
          return response;
        });

      if (res?.error) {
        setLoginError(res?.error);
      } else {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
    }

    setSubmitting(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e);
      e.target.click();
    }
  };

  return (
    <div className="Login flex h-full">
      <section className={`${styles.header}`}>
        <h1 className={`${montserrat.className} title text-white text-5xl`}>
          Board.
        </h1>
      </section>
      <section className="body h-full w-full grid items-center">
        <div className={`${styles.form_container} m-auto`}>
          <div className="form-header">
            <h1 className={`${montserrat.className} text-3xl`}>
              {loginOrSignup ? <>Sign In</> : <>Sign Up</>}
            </h1>
            <p
              className="form-subheader"
              style={loginOrSignup ? { display: "block" } : { display: "none" }}
            >
              Sign in to your account
            </p>
          </div>
          <div className=".sign-in-options flex gap-4">
            <div className={`${styles.sign_in_option} text-xs rounded-lg`}>
              <p className="flex items-center">
                <span className="text-base mr-2">
                  <FcGoogle />
                </span>
                <span
                  tabIndex={0}
                  className="focus:outline-0 focus:underline"
                  onClick={async () => {
                    setSubmitting(true);
                    await signIn("google", {
                      callbackUrl: "/",
                    });
                    setSubmitting(false);
                  }}
                  onKeyDown={handleKeyDown}
                >
                  Sign in with google
                </span>
              </p>
            </div>
            <div className={`${styles.sign_in_option} text-xs rounded-lg`}>
              <p className="flex items-center">
                <span className="text-base mr-2">
                  <BsGithub />
                </span>
                <span
                  tabIndex={0}
                  className="focus:outline-0 focus:underline"
                  onClick={async () => {
                    setSubmitting(true);
                    await signIn("github", {
                      callbackUrl: "/",
                    });
                    setSubmitting(false);
                  }}
                  onKeyDown={handleKeyDown}
                >
                  Sign in with github
                </span>
              </p>
            </div>
          </div>
          <div className="form-body bg-white p-6 rounded-2xl">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="form flex flex-col gap-4"
              noValidate
            >
              {loginError && (
                <p className="text-red-500 flex justify-center items-center bg-red-100 py-4 rounded-lg border-[1px] border-red-500">
                  {loginError}
                </p>
              )}
              <div className={`${styles.form_section} email`}>
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="johndoe@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid Email Format",
                    },
                  })}
                />
                <p className="error text-red-400">{errors.email?.message}</p>
              </div>
              <div className={`${styles.form_section} password`}>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Min 8 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be atleast 8 characters",
                    },
                  })}
                />
                <p className="error text-red-400">{errors.password?.message}</p>
              </div>
              <div>
                {loginOrSignup && (
                  <Link
                    href="#"
                    onClick={() => {
                      console.log("forgot password");
                    }}
                  >
                    Forgot Password?
                  </Link>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`${montserrat.className} font-bold ${
                  submitting ? "bg-gray-500" : "bg-black"
                } text-white py-2 rounded-xl focus:outline-white focus:outline-offset-[-4px]`}
              >
                {loginOrSignup ? <>Sign In</> : <>Sign Up</>}
              </button>
            </form>
          </div>
          <div className="form-footer">
            {loginOrSignup ? (
              <p className="flex justify-center text-sm text-gray-500">
                Don&apos;t have an account?&nbsp;&nbsp;
                <Link
                  href="#"
                  onClick={() => {
                    setLoginError("");
                    setLoginOrSignup(!loginOrSignup);
                  }}
                >
                  Register here
                </Link>
              </p>
            ) : (
              <p className="flex justify-center text-sm text-gray-500">
                Already have an account?&nbsp;&nbsp;
                <Link
                  href="#"
                  onClick={() => {
                    setLoginError("");
                    setLoginOrSignup(!loginOrSignup);
                  }}
                >
                  Login here
                </Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

"use client";

import styles from "./page.module.css";
import { montserrat } from "../utils/fonts";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

import Link from "next/link";

import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

const LoginPage = () => {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
};

const Login = () => {
  const [loginOrSignup, setLoginOrSignup] = useState(true);

  const form = useForm();
  const { register, /*control,*/ handleSubmit, formState } = form;
  const { errors } = formState;

  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginError, setLoginError] = useState(
    searchParams.get("error")
      ? searchParams.get("error") === "CredentialsSignin"
        ? "Invalid Credentials"
        : "Callback error. Try again"
      : ""
  );
  // Tracks whether the last failure came from the credentials form itself,
  // so the email/password fields can be highlighted without ever leaving the page.
  const [credentialsInvalid, setCredentialsInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // console.log(invalidCredentials);

  const signInWithCredentials = async (email, password) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setLoginError("Invalid email or password");
      setCredentialsInvalid(true);
      return false;
    }

    router.push("/");
    return true;
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError("");
    setCredentialsInvalid(false);

    if (loginOrSignup) {
      await signInWithCredentials(data.email, data.password);
    } else {
      let res;
      try {
        const response = await fetch("/api/auth/users", {
          method: "POST",
          body: JSON.stringify(data),
        });
        res = await response.json();
      } catch (error) {
        console.error("Sign up request failed:", error);
        res = { error: "Something went wrong. Please try again later." };
      }

      if (res?.error) {
        setLoginError(res.error);
      } else {
        await signInWithCredentials(data.email, data.password);
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

  useEffect(() => {
    document.title = "Login - OpenInApp";
  }, []);

  return (
    <div className="flex h-full min-h-screen">
      <section className={`${styles.brand_panel}`}>
        <h1 className={`${montserrat.className} relative z-10 text-3xl font-bold`}>
          Board.
        </h1>
        <div className="relative z-10">
          <h2 className={`${montserrat.className} text-4xl leading-tight mb-4`}>
            Your business,
            <br />
            at a glance.
          </h2>
          <p className="text-white/60 max-w-sm">
            Track revenue, activity and schedules in one clean, connected
            dashboard.
          </p>
        </div>
        <p className="relative z-10 text-sm text-white/40">
          &copy; {new Date().getFullYear()} Board. All rights reserved.
        </p>
      </section>
      <section className="body h-full w-full grid items-center px-6 py-12">
        <div className={`${styles.form_container} m-auto w-full max-w-sm`}>
          <div className="form-header mb-8">
            <h1 className={`${montserrat.className} text-3xl`}>
              {loginOrSignup ? <>Sign In</> : <>Sign Up</>}
            </h1>
            <p
              className="form-subheader text-ink-muted mt-1"
              style={
                loginOrSignup ? { display: "block" } : { display: "none" }
              }
            >
              Sign in to your account
            </p>
          </div>
          <div className="sign-in-options flex gap-4">
            <div className={`${styles.sign_in_option} text-xs rounded-lg flex-1`}>
              <p className="flex items-center justify-center">
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
            <div className={`${styles.sign_in_option} text-xs rounded-lg flex-1`}>
              <p className="flex items-center justify-center">
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
          <div className="relative flex items-center my-6 text-xs text-ink-faint">
            <span className="flex-1 h-px bg-line" />
            <span className="px-3">or continue with email</span>
            <span className="flex-1 h-px bg-line" />
          </div>
          <div className="form-body bg-surface p-6 rounded-card shadow-soft-sm">
            <form
              onSubmit={handleSubmit(onSubmit)}
              action=""
              className="form flex flex-col gap-4"
              noValidate
            >
              {loginError && (
                <p className="text-red-600 flex justify-center items-center bg-red-50 py-3 rounded-xl border border-red-200 text-sm">
                  {loginError}
                </p>
              )}
              <div
                className={`${styles.form_section} ${
                  errors.email || credentialsInvalid ? styles.has_error : ""
                } email`}
              >
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="johndoe@example.com"
                  aria-invalid={!!(errors.email || credentialsInvalid)}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid Email Format",
                    },
                    onChange: () => setCredentialsInvalid(false),
                  })}
                />
                <p className="error text-red-400 text-sm">{errors.email?.message}</p>
              </div>
              <div
                className={`${styles.form_section} ${
                  errors.password || credentialsInvalid ? styles.has_error : ""
                } password`}
              >
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Min 8 characters"
                  aria-invalid={!!(errors.password || credentialsInvalid)}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be atleast 8 characters",
                    },
                    onChange: () => setCredentialsInvalid(false),
                  })}
                />
                <p className="error text-red-400 text-sm">
                  {errors.password?.message}
                </p>
              </div>
              <div className="-mt-2">
                {loginOrSignup && (
                  <Link
                    href="#"
                    className="text-sm"
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
                  submitting ? "bg-ink-faint" : "bg-accent hover:bg-accent-dark"
                } text-white py-3 rounded-xl transition-colors focus:outline-white focus:outline-offset-[-4px]`}
              >
                {loginOrSignup ? <>Sign In</> : <>Sign Up</>}
              </button>
            </form>
          </div>
          <div className="form-footer mt-6">
            {loginOrSignup ? (
              <p className="flex justify-center text-sm text-ink-muted">
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
              <p className="flex justify-center text-sm text-ink-muted">
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

export default LoginPage;

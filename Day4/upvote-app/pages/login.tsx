import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Register.module.css";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/LoginRegister";
import { useRouter } from "next/router";
import Link from "next/link";

import Cookies from "js-cookie";

interface Credentails {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const router = useRouter();
  const [credentails, setCredentials] = useState<Credentails>({
    email: "",
    password: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (credentails.email === "" || credentails.password === "") {
      toast.info("Please provide proper credentials!");
    } else {
      LoginMutation.mutate(credentails);
    }
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setCredentials({ ...credentails, [target.name]: target.value });
  };

  const LoginMutation = useMutation(login, {
    onSuccess: (user) => {
      const setCookie = JSON.stringify({
        loggedIn: true,
        user: user,
      });
      Cookies.set("loggedInUser", setCookie);
      toast.success("Login success..");
      setCredentials({ email: "", password: "" });
      router.push("/dashboard/upvotes");
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  return (
    <div className={styles.main}>
      <form
        className={styles.register}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
        <span>
          Don't have an account?
          <Link href="/register" style={{ fontStyle: "bold",color:"blue" }}>
          
            Register
          </Link>
        </span>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;

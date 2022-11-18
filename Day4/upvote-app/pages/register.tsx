import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Register.module.css";
import { useMutation } from "@tanstack/react-query";
import { register } from "../services/LoginRegister";
import { useRouter } from "next/router";
import Link from "next/link";

interface Credentails {
  username: string;
  email: string;
  password: string;
}

const Register = (): JSX.Element => {
  const router = useRouter();
  const [credentails, setCredentials] = useState<Credentails>({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      credentails.username === "" ||
      credentails.email === "" ||
      credentails.password === ""
    ) {
      toast.info("Please provide proper credentials!");
    } else {
      RegisterMutation.mutate(credentails);
    }
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setCredentials({ ...credentails, [target.name]: target.value });
  };

  const RegisterMutation = useMutation(register, {
    onSuccess: () => {
      toast.success("Registration success..");
      setCredentials({ username: "", email: "", password: "" });

      router.push("/login");
    },
  });

  return (
    <div className={styles.main}>
      <form
        className={styles.register}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2>Register</h2>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
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
          Already have an account?
          <Link href="/login" style={{ fontStyle: "bold", color: "blue" }}>
            Login
          </Link>
        </span>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Register;

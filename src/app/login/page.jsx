"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() === "" || !email) {
      toast.error("email is required, please enter email");
      return;
    }

    if (password.trim() === "" || !password) {
      toast.error("password is required, please enter password");
      return;
    }

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error === null) {
        router.push("/");
      } else {
        toast.error("error occured while logging", error);
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.containter}>
      <div className="">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <p>
        Do not have an account? <Link href="/register">Register now.</Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default Login;

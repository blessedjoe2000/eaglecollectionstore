"use client";

import { useState } from "react";
import styles from "./register.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      toast.error("Enter all required fields to register");
      return;
    }

    if (password.length < 6) {
      toast.error("password must be more than 6 characters");
      return;
    }

    if (password !== passwordConfirm) {
      setPasswordMatch(false);
      toast.error("password do not match");
      return;
    }

    setPasswordMatch(true);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email, password, passwordConfirm }),
      });

      if (response.ok) {
        toast.success("registration successful");
        router.push("/");
        return;
      } else {
        toast.error("error occured while registering");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.containter}>
      <div className="">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:<span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">
            Email:<span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="">
            Password:<span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <label htmlFor="">
            Confirm password:<span className={styles.required}>*</span>
          </label>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password..."
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <button type="submit">Register</button>
        </form>
      </div>
      <p>
        Already have an account? <Link href="/login">Login now.</Link>
      </p>
      <ToastContainer />
    </div>
  );
}

export default Register;

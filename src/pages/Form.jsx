import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoLogoApple, IoLogoGoogle } from "react-icons/io";
import { IoPerson, IoSunny } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  // true for Sign In, false for Sign Up
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setErrorMessage(""); // Clear any previous error messages

    if (isSignIn) {
      // Sign-in Logic
      try {
        const response = await axios.get("http://localhost:5000/users", {
          params: {
            contact: data.contact,
          },
        });

        if (response.data.length > 0) {
          const user = response.data[0];
          if (user.password === data.password) {
            // Password matches, navigate to home
            console.log("Login Successful");
            navigate("/home");
          } else {
            // Password does not match
            setErrorMessage("Incorrect password. Please try again.");
          }
        } else {
          setErrorMessage("User not found. Please sign up first.");
        }
      } catch (error) {
        console.error("Error during sign-in:", error);
        setErrorMessage("An error occurred during sign-in. Please try again.");
      }
    } else {
      // Sign-up Logic
      try {
        const response = await axios.post("http://localhost:5000/users", {
          name: data.name,
          contact: data.contact,
          password: data.password,
        });

        console.log("Sign-up Successful", response.data);
        navigate("/home");
      } catch (error) {
        console.error("Error during sign-up:", error);
        setErrorMessage("An error occurred during sign-up. Please try again.");
      }
    }
  };

  const password = watch("password");

  const toggleSignInState = () => {
    setIsSignIn((prevState) => !prevState);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-offBlack">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary p-8 rounded-lg shadow-lg shadow-white w-full max-w-md border border-white dark:bg-darkGrey"
      >
        <span className="mt-5">
          <IoSunny size={60} color="yellow" />
        </span>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Welcome to Organization
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        {/* Conditional Fields */}
        {!isSignIn && (
          <div className="mb-2">
            <label className="block mb-1 text-white">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              type="text"
              className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
        )}

        <label className="block text-white mb-1">Phone number/Email</label>
        <input
          type="text"
          placeholder="Phone number/Email"
          {...register("contact", {
            required: "This field is required",
            pattern: {
              value:
                /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[\+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{10,13}$/,
              message: "Invalid phone number or email format",
            },
          })}
          className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.contact && (
          <p className="text-sm text-red-500 mt-1">{errors.contact.message}</p>
        )}

        <div className="mb-4">
          <label className="block text-white mb-1">Password</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password for Sign Up */}
        {!isSignIn && (
          <div className="mb-4">
            <label className="block text-white mb-1">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}

        {/* Terms and Conditions for Sign Up */}
        {!isSignIn && (
          <div className="mb-4 flex items-center">
            <input
              {...register("terms", { required: "You must accept the terms" })}
              type="checkbox"
              className="mr-2"
            />
            <label className="text-white">
              By creating an account, I agree to the Terms of Service and
              Privacy Policy.
            </label>
          </div>
        )}
        {errors.terms && (
          <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex items-center m-0 w-full">
          <span className="border border-gray-600 m-5 w-52"></span>
          <span className="text-white">or</span>
          <span className="border border-gray-600 m-5 w-52"></span>
        </div>

        <button
          type="button"
          className="w-full hover:text-blue transition border border-white px-2 py-3 mb-2 rounded-md hover:bg-gray-400"
          onClick={toggleSignInState}
        >
          <Link className="flex justify-center items-center">
            <IoPerson size={25} color="white" />
            <span className="text-white hover:text-black ml-4 font-semibold">
              {isSignIn ? "New User? Sign Up" : "Already a user? Sign In"}
            </span>
          </Link>
        </button>

        <button className="w-full hover:text-blue transition border border-white px-2 py-3 mb-2 rounded-md">
          <Link className="flex justify-center items-center">
            <IoLogoGoogle size={25} color="white" />
            <span className="text-white ml-4 font-semibold">
              Continue With Google
            </span>
          </Link>
        </button>

        <button className="w-full hover:text-blue transition border border-white px-2 py-3 mb-2 rounded-md">
          <Link className="flex justify-center items-center">
            <IoLogoApple size={25} color="white" />
            <span className="text-white ml-4 font-semibold">
              Continue With Apple
            </span>
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Form;

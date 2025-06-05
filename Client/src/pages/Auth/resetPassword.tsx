import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });

  const email = searchParams.get("email");

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      code: "",
      password: "",
      confirmPassword: "",
    };

    if (!code) {
      newErrors.code = "Verification code is required";
      valid = false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMsg("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/account/reset-password",
        {
          email,
          code,
          newPassword: password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuccess(true);
        setMsg(
          "Password reset successfully! You can now login with your new password."
        );
      } else {
        setMsg("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        setMsg(
          error.response.data?.message ||
            "An error occurred while processing your request."
        );
      } else if (error.request) {
        setMsg("No response from server. Please check your connection.");
      } else {
        setMsg("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>

      <div className="flex-grow flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-sm shadow-gray-400 bg-white dark:bg-black border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-200 md:text-gray-800 dark:text-gray-200">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {success
                ? "Your password has been successfully reset"
                : "Enter the verification code and your new password"}
            </p>
          </div>

          {msg && (
            <div
              className={`p-3 rounded-md ${
                success
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {msg}
            </div>
          )}

          {!success ? (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Verification Code Field */}
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Verification Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setErrors({ ...errors, code: "" });
                    }}
                    type="text"
                    id="code"
                    name="code"
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.code
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-900"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter the code you received"
                  />
                  {errors.code && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.code}
                    </p>
                  )}
                </div>

                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (
                        e.target.value.length > 0 &&
                        e.target.value.length < 8
                      ) {
                        setErrors({
                          ...errors,
                          password: "Password must be at least 8 characters",
                        });
                      } else {
                        setErrors({
                          ...errors,
                          password: "",
                        });
                      }
                    }}
                    type="password"
                    id="password"
                    name="password"
                    required
                    minLength={8}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-900"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (password !== e.target.value) {
                        setErrors({
                          ...errors,
                          confirmPassword: "Passwords do not match",
                        });
                      } else {
                        setErrors({
                          ...errors,
                          confirmPassword: "",
                        });
                      }
                    }}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    minLength={8}
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-900"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !code ||
                    password.length < 8 ||
                    password !== confirmPassword
                  }
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => navigate("/admin")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
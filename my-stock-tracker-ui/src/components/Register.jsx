import React, { useRef, useEffect } from "react";
import {
  Link,
  Form,
  useNavigation,
  useNavigate,
  useActionData,
  useSubmit,
} from "react-router-dom";
import apiClient from "../service/apiClient";
import { toast } from "react-toastify";
import PageTitle from "./PageTitle";

export default function Register() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const submit = useSubmit();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData?.success) {
      navigate("/login");
      toast.success("Registration completed successfully. Try login.");
    }
  }, [actionData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) {
      return;
    }
    submit(formData, { method: "post" });
  };

  const validatePasswords = (formData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");

    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const labelStyle =
    "block text-lg font-semibold text-primary dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter bg-white dark:bg-gray-600";

  return (
    <div className="bg-normalbg dark:bg-darkbg">
      <div className="min-h-[852px] flex items-center justify-center font-primary dark:bg-darkbg">
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg max-w-md w-full px-8 py-6">
          <PageTitle title="Register" />
          <Form
            className="space-y-6"
            method="POST"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className={labelStyle}>
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your Name"
                className={textFieldStyle}
              />
              {actionData?.errors?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                className={textFieldStyle}
              />
              {actionData?.errors?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className={labelStyle}>
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Your Password"
                autoComplete="new-password"
                className={textFieldStyle}
              />
              {actionData?.errors?.password && (
                <p className="text-red-500 text-sm mt-1">
                  {actionData.errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPwd" className={labelStyle}>
                Confirm Password
              </label>
              <input
                id="confirmPwd"
                type="password"
                name="confirmPwd"
                placeholder="Confirm Your Password"
                className={textFieldStyle}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-2 text-white dark:text-black text-xl bg-primary dark:bg-light hover:bg-dark dark:hover:bg-lighter rounded-md transition duration-200"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
              Already Have an account? {""}
              <Link
                to="/login"
                className="text-primary dark:text-light hover:text-dark dark:hover:text-lighter transition duration-200"
              >
                Login Here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
}

export async function registerAction({ request }) {
  const data = await request.formData();
  const registerData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };
  try {
    await apiClient.post("/auth/register", registerData);
    return { success: true };
  } catch (error) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data};
    }
    throw new Response(
      error.response?.data?.errorMessage || error.message || "Failed to register. Please try again.",
      { status: error.status || 500 }
    );
  }
}

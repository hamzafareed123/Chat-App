import React, { useState } from "react";
import BorderAnimation from "../Components/BorderAnimation";
import { useAuthStore } from "../store/useAuthStore";
import loginImage from "/login.png"
import {
  MessageCircleIcon,
  LockIcon,
  UserIcon,
  MailIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isLoginIn, Login } = useAuthStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
   e.preventDefault();
    console.log("form Data",formData)
    Login(formData);
  };
  return (
    <div className="max-w-5xl mx-auto">
      <BorderAnimation>
        <div className="flex items-center justify-center gap-12 p-8">
          {/* LEFT: FORM */}
          <div className="card bg-base-500 shadow-xl p-6 space-y-4 w-100">
            {/* Header */}
            <div className="text-center space-y-2">
              <MessageCircleIcon className="mx-auto text-primary" size={32} />
              <h2 className="text-2xl font-bold">Create Account</h2>
              <p className="text-sm opacity-70">Signup for a new account</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Email</span>
                </label>
                <div className="relative">
                  <MailIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                    size={18}
                  />
                  <input
                    type="email"
                    className="input outline-0 w-full pl-10"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <LockIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
                    size={18}
                  />
                  <input
                    type="password"
                    className="input outline-0 w-full pl-10"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="auth-btn flex items-center justify-center text-center mt-3 cursor-pointer border-0 bg-blue-400 w-full"
                disabled={isLoginIn}
              >
                {isLoginIn ? (
                  <LoaderIcon className="animate-spin items-center" />
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Footer */}

              <div className="mt-3 flex items-center justify-center">
                <Link to="/Signup" className="text-center text-sm auth-link">
                  {" "}
                  Does not have Account? Create Account
                </Link>
              </div>
            </form>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="hidden md:flex items-center justify-center">
            <img src={loginImage} className="w-80 h-auto" alt="Signup" />
          </div>
        </div>
      </BorderAnimation>
    </div>
  );
};

export default LoginPage;

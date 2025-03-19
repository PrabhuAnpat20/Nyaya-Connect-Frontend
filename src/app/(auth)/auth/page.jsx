"use client";
import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  EyeOff,
  Eye,
  Scale,
  BookOpen,
  FileText,
  GavelIcon,
  Calculator,
  Youtube,
  Brain,
} from "lucide-react";
import Image from "next/image";
import { toast, Toaster } from "sonner"; // Add Toaster import here
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

const AuthPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth(); // This line is causing the error
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
    profession: "",
    gender: "Male",
    age: "",
    location: "",
    preferredLanguage: "Hindi",
    educationLevel: "10th",
    disabilityStatus: false,
  });

  // Update handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Add this line

    if (!isLogin && (!formData.user_name || !formData.email || !formData.password || !formData.profession || !formData.age)) {
      toast.error("Missing Required Fields", {
        description: "Please fill in all required fields.",
        style: { background: '#fecaca', borderColor: '#f87171' },
      });
      setIsLoading(false); // Add this line
      return;
    }

    try {
      const endpoint = isLogin
        ? `https://nyayaconnect-backend.onrender.com/user/login`
        : `https://nyayaconnect-backend.onrender.com/user/register`;

      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            user_name: formData.user_name,
            email: formData.email,
            password: formData.password,
            profession: formData.profession,
            gender: formData.gender,
            age: formData.age,
            location: formData.location || "",
            preferredLanguage: formData.preferredLanguage,
            educationLevel: formData.educationLevel,
            disabilityStatus: formData.disabilityStatus,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user.name);

        toast.success(
          isLogin ? "Login successful!" : "Account created successfully!",
          {
            description: isLogin
              ? "Welcome back to Nyaya Connect!"
              : "Welcome to Nyaya Connect! Your legal literacy journey begins here.",
            style: { background: '#bbf7d0', borderColor: '#4ade80' },
          }
        );

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error(data.message || "Authentication failed");
      }
    } catch (error) {
      toast.error("Authentication Failed", {
        description: error.message || "An error occurred during authentication.",
        style: { background: '#fecaca', borderColor: '#f87171' },
      });
    } finally {
      setIsLoading(false); // Add this line
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) || '' : value,
    }));
  };

  const features = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal Knowledge",
      description:
        "Access simplified legal information in your preferred language",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Legal Education",
      description:
        "Learn about your rights and legal procedures through interactive content",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Analysis",
      description:
        "Upload legal documents for AI-powered simplification and explanation",
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Smart Assistance",
      description:
        "AI-powered system helps you understand legal terms and concepts",
    },
  ];

  return (
    <div className="min-h-screen flex bg-teal-50">
      {/* Left Column - Platform Info */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-around p-12  bg-teal-400">
        <div>
          <h1 className="mt-12 text-4xl font-bold text-white">
            Your Gateway to Legal Literacy
          </h1>
          <p className="mt-4 text-lg text-indigo-100">
            Join our platform to enhance your legal literacy and understanding
            of your rights.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 bg-teal-800 rounded-lg text-white">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className=" text-slate-200">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Auth Form */}
      <div className="w-full lg:w-1/2 relative">
        {/* Logo positioned absolutely in top left corner */}
        <div className="absolute top-0 left-0 p-2.5">
          <div className="flex items-center">
            <Scale className="h-10 w-10 text-teal-600" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">
              Nyay Connect
            </span>
          </div>
        </div>

        <div className="w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-teal-700">
                {isLogin ? "Welcome back!" : "Create your account"}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-teal-700 hover:text-teal-500"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                {/* Name Field (Sign Up only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="user_name" className="sr-only">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="user_name"
                        name="user_name"
                        type="text"
                        required
                        value={formData.user_name}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                        placeholder="Username"
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      placeholder="Email address"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                {!isLogin && (
                  <>
                    {/* Existing fields */}
                    <div>
                      <label htmlFor="profession" className="sr-only">
                        Profession
                      </label>
                      <input
                        type="text"
                        name="profession"
                        id="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                        placeholder="Profession"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>

                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      />
                    </div>

                    <input
                      type="text"
                      name="location"
                      placeholder="Location (City, State, Country)"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      >
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Bengali">Bengali</option>
                      </select>

                      <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm bg-white dark:bg-gray-800"
                      >
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Post Graduate">Post Graduate</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="disabilityStatus"
                        id="disabilityStatus"
                        checked={formData.disabilityStatus}
                        onChange={(e) => 
                          setFormData(prev => ({
                            ...prev,
                            disabilityStatus: e.target.checked
                          }))
                        }
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="disabilityStatus"
                        className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                      >
                        Person with Disability
                      </label>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-teal-500 group-hover:text-teal-400" />
                  </span>
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : null}
                  {isLogin ? "Sign in" : "Sign up"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-teal-600  hover:text-teal-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-teal-600  hover:text-teal-500"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AuthPage;

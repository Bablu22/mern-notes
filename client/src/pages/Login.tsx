import Input from "../components/Input";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import CheckboxWithLink from "../components/CheckboxWithLink";
import LinkText from "../components/LinkText";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isLoading, user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/");
    }
  }, [user, navigate, isAuthenticated]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login(formData);
    <Navigate to="/" />;
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">
              Login
            </h2>
            <form className="space-y-6" action="#" method="POST">
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={handleInputChange}
                value={formData.email}
              />

              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={handleInputChange}
                value={formData.password}
              />

              <CheckboxWithLink
                checkboxId="remember-me"
                checkboxLabel="Remember me"
                linkText="Forgot password?"
                linkUrl="#"
              />

              <Button type="submit" variant="primary" onClick={handleSubmit}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </form>
          </div>

          <LinkText
            linkUrl="/register"
            linkText="Sign up now"
            linkLabel="Not a member?"
          />
        </div>
      </div>
    </>
  );
};

export default Login;

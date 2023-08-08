import Button from "../components/Button";
import Input from "../components/Input";
import LinkText from "../components/LinkText";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, isLoading, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    register(formData);
  };
  return (
    <>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <h2 className="mb-8 text-2xl font-bold text-center text-gray-900">
                Register
              </h2>
              <form className="space-y-6" action="#" method="POST">
                <Input
                  label="Name"
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  onChange={handleInputChange}
                  value={formData.name}
                />

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

                <Button type="submit" variant="primary" onClick={handleSubmit}>
                  {isLoading ? "Loading..." : "Register"}
                </Button>
              </form>
            </div>

            <LinkText
              linkUrl="/login"
              linkText="Sign in now"
              linkLabel="Already a member?"
            />
          </div>
        </div>
      </>
    </>
  );
};

export default Register;

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const location = useLocation();

  const { logout, isAuthenticated, user } = useAuth();
  const token = localStorage.getItem("user");

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="outline-none">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={logo}
                      alt="Your Company"
                    />
                  </Link>
                </div>
                {token ? (
                  <>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <NavLink
                        to="/"
                        className={classNames(
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          location.pathname === "/"
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        Home
                      </NavLink>
                      <NavLink
                        to="/create-note"
                        className={classNames(
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          location.pathname === "/create-note"
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        Create Note
                      </NavLink>
                      <NavLink
                        to="/categories"
                        className={classNames(
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          location.pathname === "/categories"
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        Categories
                      </NavLink>
                      <NavLink
                        to="/calendar"
                        className={classNames(
                          "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium",
                          location.pathname === "/calendar"
                            ? "border-indigo-500 text-gray-900"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        Calendar
                      </NavLink>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="sr-only">Open user menu</span>

                            <img
                              className="h-8 w-8 rounded-full"
                              src={
                                "https://ui-avatars.com/api/?name=" + user?.name
                              }
                              alt={user?.name}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {user?.name}
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={logout}
                                  className={classNames(
                                    active ? "bg-red-600 w-full" : "",
                                    "block px-4 w-full py-2 text-sm rounded bg-red-400"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </>
                ) : (
                  // Show login button if the user is not authenticated
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
                    >
                      Log in
                    </Link>
                  </div>
                )}
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/"
                      className={classNames(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        location.pathname === "/"
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      )}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/create-note"
                      className={classNames(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        location.pathname === "/create-note"
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      )}
                    >
                      Create Note
                    </NavLink>
                    <NavLink
                      to="/categories"
                      className={classNames(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        location.pathname === "/categories"
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      )}
                    >
                      Categories
                    </NavLink>
                    <NavLink
                      to="/calendar"
                      className={classNames(
                        "block px-3 py-2 rounded-md text-base font-medium",
                        location.pathname === "/calendar"
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      )}
                    >
                      Calendar
                    </NavLink>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;

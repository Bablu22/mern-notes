import notFoundImage from "../assets/not-found.jpg";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <img
          className="mx-auto w-1/2 mb-4"
          src={notFoundImage}
          alt="Not Found"
        />
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Not Found</h1>
        <p className="text-lg text-gray-600">
          The page you are looking for could not be found.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

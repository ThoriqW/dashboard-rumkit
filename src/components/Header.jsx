import profilePicture from "/assets/profile.jpg";

const Header = () => {
  return (
    <>
      <div className=" flex justify-between items-center p-3 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
          src={profilePicture}
          alt="Bordered avatar"
        />
        <marquee className="ml-5 w-full text-green-800 text-xs sm:text-xl font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
          {" "}
          <p>Selamat Datang di Dashboard Rumkit Tk. III dr. Sindhu Trisno</p>
        </marquee>
      </div>
    </>
  );
};

export default Header;

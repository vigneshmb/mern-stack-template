
function HomePage() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="mx-auto grid grid-cols-1 max-w-screen-xl px-0 dark:bg-zinc-300 bg-slate-600 rounded-xl">
        <div className="text-indigo-700 sm:text-3xl bg-indigo-500">
          <h1 className="font-bold text-zinc-200 sm:text-3xl bg-indigo-500 m-0 p-0 text-center">
            Task Board
          </h1>
        </div>
        <p className="mx-auto mt-2 max-w-md text-center text-gray-700 float-right">
          A tool created to learn the MERN Stack
        </p>
        <div className=" max-w-lg bg-amber-300"></div>
        <p className="text-center text-lg font-medium">
          Please select the option
        </p>

        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          View Boards
        </button>

        <button
          type="submit"
          className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Create Board
        </button>

        <p className="text-center text-sm text-gray-500">
          No account?
          <a className="underline" href="#">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default HomePage;

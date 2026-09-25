import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        {/* Blue Character */}
        <div className="relative mx-auto mb-6 flex h-32 w-34 items-center justify-center rounded-[2.5rem] bg-blue-500 shadow-lg shadow-blue-200">
          {/* Eyes */}
          <div className="absolute top-10 flex gap-6">
            <span className="h-3 w-3 rounded-full bg-white" />
            <span className="h-3 w-3 rounded-full bg-white" />
          </div>

          {/* Mouth */}
          <div className="absolute bottom-9 h-3 w-8 rounded-full bg-blue-200" />

          {/* Little feet */}
          <div className="absolute -bottom-2 left-6 h-4 w-8 rounded-full bg-blue-600" />
          <div className="absolute -bottom-2 right-6 h-4 w-8 rounded-full bg-blue-600" />

          {/* Question mark */}
          <span className="absolute -right-5 -top-5 flex h-10 w-10 rotate-12 items-center justify-center rounded-full bg-white text-xl font-bold text-blue-500 shadow-md">
            ?
          </span>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Component Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-md leading-6 text-gray-500">
          This little blue guy looked everywhere...
        <br/>
          but the component seems to be hiding.
        </p>

   <Link to={"/"}>
        <button
          className="mt-5 rounded-xl bg-blue-500 px-10 py-3 cursor-pointer text-md font-medium text-white transition hover:bg-blue-600 active:scale-95"
        >
          Go Home
        </button>
   
   </Link>
      </div>
    </div>
  )
}
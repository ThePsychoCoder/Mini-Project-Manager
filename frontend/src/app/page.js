export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Mini Project Manager
      </h1>
      <div className="flex flex-col gap-4 w-64">
        <a
          href="/login"
          className="bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700"
        >
          Login
        </a>
        <a
          href="/signup"
          className="bg-green-600 text-white py-2 rounded text-center hover:bg-green-700"
        >
          Sign Up
        </a>
        <a
          href="/projects"
          className="bg-purple-600 text-white py-2 rounded text-center hover:bg-purple-700"
        >
          Projects
        </a>
      </div>
    </div>
  );
}

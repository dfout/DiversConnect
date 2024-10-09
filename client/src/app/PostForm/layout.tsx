"use client"
import { useRouter } from "next/navigation";

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path); // Navigate to the specified path
  };

  return (
    <>
      <h2>Make a Post</h2>
      <button
        onClick={() => handleNavigate("/PostForm/diveForm")}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Post a Dive
      </button>
      <button
        onClick={() => handleNavigate("/PostForm/eventForm")}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Post an Event
      </button>
      <button
        onClick={() => handleNavigate("/PostForm/diveSiteForm")}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Make a Dive Site
      </button>
      <button
        onClick={() => handleNavigate("/PostForm/generalPost")}
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Make a General Post
      </button>
      {children}
    </>
  );
}

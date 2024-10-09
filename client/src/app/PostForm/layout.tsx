import Link from "next/link"

export default function PostLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
    return (
        <>
        <h2>Make a Post</h2>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"><Link href='/PostForm/diveForm'>Post a Dive</Link></button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"><Link href='/PostForm/eventForm'>Post an Event</Link></button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"><Link href='/PostForm/diveSiteForm'>Make a Dive Site</Link></button>
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"><Link href='/PostForm/generalPost'>Make a General Post</Link></button>
        {children}
        </>

    );
  }
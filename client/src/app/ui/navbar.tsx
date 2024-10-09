
import Link from "next/link"

export default function NavBar(){


    

    return(
        <div className='nav-bar'>
            <span>DiversConnect</span>
            <span><Link href='/'>Dashboard</Link></span>
            <span>Find a Dive</span>
            <span><Link href='/PostForm'>Post</Link></span>
            <span>My Profile</span>
        </div>
    )
}
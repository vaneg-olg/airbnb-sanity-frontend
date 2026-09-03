import Link from "next/link"

const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-content">
        <Link href="/">
          <div className="logo"></div>
        </Link>
        <Link href="/bookmarks">
          <a className="nav-bookmarks-link">♥ My Bookmarks</a>
        </Link>
      </div>
    </div>
  )
}

export default NavBar

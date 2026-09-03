import Link from 'next/link'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.nav}>
      <Link href="/">
        <div className={styles.logo}></div>
      </Link>
      <Link href="/bookmarks">
        <button className={styles.bookmarksLink}>♥ My Bookmarks</button>
      </Link>
    </div>
  )
}

export default NavBar

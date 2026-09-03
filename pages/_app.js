import "../styles/globals.css"
import NavBar from "../components/NavBar"
import { BookmarkProvider } from "../context/BookmarkContext"

const MyApp = ({ Component, pageProps }) => {
  return (
    <BookmarkProvider>
      <NavBar />
      <Component {...pageProps} />
    </BookmarkProvider>
  )
}

export default MyApp

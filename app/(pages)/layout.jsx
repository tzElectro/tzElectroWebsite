import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}


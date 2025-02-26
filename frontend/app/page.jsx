import { Create } from "./components/CreateDocument/Create";
import NavBar from "./components/Navbar/NavBar"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import DocsContainer from "./components/UI/DocsContainer";

export default function Home() {
  return (
    <PrivateRoute>
      <section className="h-screen overflow-y-auto scrollbar-hide">
        <nav className="sticky top-0 z-10">
          <NavBar />
        </nav>
        <main>
          <Create />
          <DocsContainer />
        </main>
    
      </section>
    </PrivateRoute>
  );
}

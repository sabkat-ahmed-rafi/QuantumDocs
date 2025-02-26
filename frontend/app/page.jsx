import { Create } from "./components/CreateDocument/Create";
import NavBar from "./components/Navbar/NavBar"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import DocsContainer from "./components/UI/DocsContainer";

export default function Home() {
  return (
    <PrivateRoute>
      <section>
        <nav>
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

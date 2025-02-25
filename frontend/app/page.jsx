import { Create } from "./components/CreateDocument/Create";
import NavBar from "./components/Navbar/NavBar"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import FilterHeader from "./components/UI/FilterHeader";

export default function Home() {
  return (
    <PrivateRoute>
      <section>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Create />
          <FilterHeader />
        </main>
    
      </section>
    </PrivateRoute>
  );
}

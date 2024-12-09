import NavBar from "./components/Navbar/NavBar"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

export default function Home() {
  return (
    <PrivateRoute>
      <section>
        <nav>
          <NavBar/>
        </nav>
        <main className="bg-[#F1F3F4] h-[300px]">

        </main>
    
      </section>
    </PrivateRoute>
  );
}

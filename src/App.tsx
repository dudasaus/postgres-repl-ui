import "./App.css";
import { PGlite } from "@electric-sql/pglite";
import { Repl } from "@electric-sql/pglite-repl";

const pg = new PGlite();

function App() {
  return (
    <div className="container">
      <Repl pg={pg} />
    </div>
  );
}

export default App;

import "./App.css";
import Navbar from "./components/Navbar";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App h-screen bg-custom-gradient flex flex-col">
      <Navbar />
      <Weather />
    </div>
  );
}

export default App;

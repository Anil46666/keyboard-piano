import Piano from "./components/piano.js";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">

      <h1 className="text-4xl mb-10">
        React Piano 🎹
      </h1>

      <Piano/>

    </div>
  );
}

export default App;
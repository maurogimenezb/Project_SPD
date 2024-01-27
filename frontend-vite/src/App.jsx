import TranscriptionPage from "./pages/TranscriptionPage";
import WelcomePage from "./pages/WelcomePage";
import HistorialPage from "./pages/HistorialPage";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/TranscriptionPage" element={<TranscriptionPage />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/HistorialPage" element={<HistorialPage />} />
        {}
      </Routes>
    </div>
  );
}

export default App;
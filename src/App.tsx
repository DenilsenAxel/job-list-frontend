import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={1500} closeButton={false} draggable={false} />
      <Routes>
        <Route path="/" element={<DefaultLayout />}></Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;

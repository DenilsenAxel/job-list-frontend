import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthPage } from "./pages/AuthPage";
import { DefaultLayout } from "./components/layout/DefaultLayout";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { JobListPage } from "./pages/JobListPage";
import { AuthContext } from "./context/AuthProvider";
import React from "react";
import { JobDetailPage } from "./pages/JobDetailPage";

function App() {
  const { token } = React.useContext(AuthContext)!;

  return (
    <div className="App">
      <ToastContainer autoClose={1500} closeButton={false} draggable={false} />
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route
            index
            element={
              <ProtectedRoute token={token} redirectPath="/auth">
                <JobListPage />
              </ProtectedRoute>
            }
          />
          <Route path="job">
            <Route
              path=":id"
              element={
                <ProtectedRoute token={token} redirectPath="/auth">
                  <JobDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;

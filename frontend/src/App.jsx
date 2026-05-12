import { useState } from "react";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import CreateInvoice from "./pages/CreateInvoice";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {

  const [authPage, setAuthPage] = useState("login");

  const [page, setPage] = useState("dashboard");

  const token = localStorage.getItem("token");

  if (!token) {
    return <Login setPage={setPage} />;
  }
  const renderPage = () => {

    if (page === "dashboard") return <Dashboard />;
    if (page === "clients") return <Clients />;
    if (page === "create") return <CreateInvoice />;

  };

  return (
    <Layout page={page} setPage={setPage}>
      {page === "dashboard" && <Dashboard />}
      {page === "clients" && <Clients />}
      {page === "create" && <CreateInvoice />}
    </Layout>
    // <Layout page={page} setPage={setPage}>
    //   {renderPage()}
    // </Layout>

  );
}

export default App;
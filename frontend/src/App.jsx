import { useState } from "react";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import CreateInvoice from "./pages/CreateInvoice";

function App() {

  const [page, setPage] = useState("dashboard");

  const renderPage = () => {

    if (page === "dashboard") return <Dashboard />;
    if (page === "clients") return <Clients />;
    if (page === "create") return <CreateInvoice />;

  };

  return (

    <Layout page={page} setPage={setPage}>
      {renderPage()}
    </Layout>

  );
}

export default App;
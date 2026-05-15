import { useState } from "react";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import CreateInvoice from "./pages/CreateInvoice";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useAuth } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";

import PublicInvoice from "./pages/PublicInvoice";

function App() {

  // dashboard navigation
  const [page, setPage] = useState("dashboard");

  // auth navigation
  const [authPage, setAuthPage] = useState("login");

  // auth context
  const {
    user,
    loading
  } = useAuth();

  // =============================
  // LOADING STATE
  // =============================

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  // =============================
  // AUTH SCREENS
  // =============================

  if (!user) {

    // signup page
    if (authPage === "signup") {
      return (
        <Signup setAuthPage={setAuthPage} />
      );
    }

    // login page
    return (
      <Login setAuthPage={setAuthPage} />
    );
  }

  // =============================
  // APP PAGES
  // =============================

  const renderPage = () => {

    if (page === "dashboard") {
      return <Dashboard />;
    }

    if (page === "clients") {
      return <Clients />;
    }

    if (page === "create") {
      return <CreateInvoice />;
    }

    return <Dashboard />;
  };

  return (

    <Layout
      page={page}
      setPage={setPage}
    >

      {renderPage()}

    </Layout>
  );

  return (

  <Routes>

    <Route
      path="/invoice/public/:id"
      element={<PublicInvoice />}
    />

    <Route
      path="*"
      element={

        <Layout
          page={page}
          setPage={setPage}
        >

          {renderPage()}

        </Layout>
      }
    />

  </Routes>
);
}

const styles = {

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    background: "#f8fafc"
  }

};

export default App;
import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AuthCallBack, { Signup, Login } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import { Header } from "./pages/Home";

const App = () => {
  return(
    <BrowserRouter>
      <Pages />
     </BrowserRouter>
  );
}

export default App;


const Pages = () => {
const pages = useLocation();
  const limits = ['/dashboard'];
  const limitStatus = limits.includes(pages.pathname);
  return(
    <React.Fragment>
    {!limitStatus && <Header />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallBack />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </React.Fragment>
  )
}

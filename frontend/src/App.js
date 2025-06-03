// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/MainLayout";
// import Dashboard from "./pages/Dashboard/dashboard";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/MainLayout";
import ProducerContract from "./pages/ProducerContract";
import ConsumerContract from "./pages/ConsumerContract";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <Layout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/producer-contract" element={<ProducerContract />} />
          <Route path="/consumer-contract" element={<ConsumerContract />} />
          {/* <Route path="/help" element={<HelpSupport />} />
          <Route path="/profile" element={<Profile />} /> */}
        </Route>
        {/* <Route path="*" element={<LoginPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/sign-up" element={<SignupPage />} />
        {/* <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

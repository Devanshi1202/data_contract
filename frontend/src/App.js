import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
// import Layout from "./components/layout/MainLayout";
// import Dashboard from "./pages/Dashboard/dashboard";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LogInPage";
import OtpPage from "./pages/OtpPage";
import ProducerContract from "./pages/ProducerContract";
import ConsumerContract from "./pages/ConsumerContract";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/MainLayout"; 

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;


function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
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
        <Route path="/confirm" element={<OtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;

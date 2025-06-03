// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/MainLayout";
// import Dashboard from "./pages/Dashboard/dashboard";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/website-scan" element={<WebsiteScan />} />
          <Route path="/vendor-management" element={<VendorManagement />} />
          <Route path="/banner" element={<BannerDesigner />} />
          <Route path="/banner/create" element={<BannerPage />} />
          <Route path="/banner/:bannerId" element={<BannerPage />} />
          <Route path="/add-service" element={<AddService />} />
          <Route path="/consent-log" element={<ConsentLog />} />
          <Route path="/consent-details/:id" element={<ConsentDetails />} />
          <Route path="/data-requests" element={<DataRequests />} />
          <Route path="/data-breach" element={<DataBreach />} />
          <Route
            path="/data-breach-details/:id"
            element={<DataBreachDetails />}
          />
          <Route
            path="/data-request-details/:id"
            element={<DataRequestDetails />}
          />
          <Route path="/install-plugin" element={<InstallPlugin />} />
          <Route path="/install-plugin" element={<InstallPlugin />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/privacy-policy/:id"
            element={<PrivacyPolicyDetails />}
          />
          <Route path="/privacy-settings" element={<CreatePrivacyPolicy />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/profile" element={<Profile />} />
        </Route> */}
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

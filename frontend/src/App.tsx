import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Navbar";
import Main from "./components/Layout/MainContent";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import CreatePolicy from "./components/Views/CreatePolicy";
import PolicyDetail from "./components/Views/DetailPolicy";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ListPolicies from "./components/Views/ListPolicies";
import PageNotFound from "./components/Views/PageNotFound";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex flex-1 mt-14">

        {/* Main Content */}
        <Main title="Policies">
          <div className="w-full">
            <Routes>
              {/* Redirect root to policies */}
              <Route path="/" element={<Navigate to="/policies" replace />} />

              {/* Public Routes */}
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/policies" element={<ListPolicies />} />
              <Route path="/policies/:id" element={<PolicyDetail />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/create-policy" element={<CreatePolicy />} />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </Main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

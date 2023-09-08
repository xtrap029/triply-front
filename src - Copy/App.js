import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { SigninContext } from "./contexts/SigninContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import TollCalculator from "./pages/TollCalculator";
import Profile from "./pages/Profile";
import Header from "./layouts/Header";

const queryClient = new QueryClient();

function App() {
  const [userProfile, setUserProfile] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SigninContext.Provider value={{ userProfile, setUserProfile }}>
        <div className="bg-stone-900 heropattern-topography-neutral-900 flex justify-center min-h-screen text-gray-300">
          <div className="lg:w-1/2">
            <Header />
            <div className="container mt-5 p-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/toll-calculator" element={<TollCalculator />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </div>
      </SigninContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

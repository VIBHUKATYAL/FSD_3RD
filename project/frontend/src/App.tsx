import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Lecturers from "./pages/Lecturers";
import Schedule from "./pages/Schedule";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/lecturers" element={<Lecturers />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route
              path="*"
              element={
                <div className="flex h-[50vh] items-center justify-center font-bold text-gray-400 text-xl">
                  Module Coming Soon
                </div>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

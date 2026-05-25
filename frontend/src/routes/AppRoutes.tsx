import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardLayout
from "@/layouts/DashboardLayout";

import DashboardPage
from "@/pages/DashboardPage";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          element={<DashboardLayout />}
        >

          <Route
            path="/"
            element={<DashboardPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;
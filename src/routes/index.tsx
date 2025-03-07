import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage, RegistrationPage } from "../pages";
import { HomePage } from "../pages/home/home-page";
import { BaseLayout } from "../components/common/base-layout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/home" element={<BaseLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

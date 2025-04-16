import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "../components/private-route";
import { IUser } from "../services/auth/DTO";
import { useAuth } from "../context/user-provider";

import {
  LoginPage,
  RegistrationPage,
  CharacterStatusPage,
  CharacterQuestPage,
  CharacterRankingPage,
  CharacterSetupFlow,
  TasksPage,
  MissionsPage,
} from "../pages";

import { HomePage } from "../pages/home/home-page";
import { NarratorLayout } from "../components/common/narrator-layout";
import { CharacterLayout } from "../components/common/character-layout";
import { AccessDeniedPage } from "../pages/auth/access-denied-page";

export default function Router() {
  const { isAuthChecked, user } = useAuth();

  if (!isAuthChecked) {
    return <div>Carregando...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route
          path="/narrator/*"
          element={
            <PrivateRoute requiredRole={IUser.Role.NARRATOR}>
              <NarratorLayout />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<HomePage />} />
        </Route>

        <Route
          path="/character/*"
          element={
            <PrivateRoute requiredRole={IUser.Role.CHARACTER}>
              {user?.specialization && user?.character_class ? (
                <CharacterLayout />
              ) : (
                <CharacterSetupFlow />
              )}
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="status" element={<CharacterStatusPage />} />
          <Route path="quest" element={<CharacterQuestPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="missions" element={<MissionsPage />} />
          <Route path="ranking" element={<CharacterRankingPage />} />
        </Route>

        <Route path="/access-denied" element={<AccessDeniedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

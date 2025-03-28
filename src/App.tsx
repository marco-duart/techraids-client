import GlobalStyles from "./assets/styles/global-styles";
import { ThemeProvider } from "./context/theme-provider";
import Router from "./routes";
import { UserProvider } from "./context/user-provider";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./config/toast-config";

const App = () => {
  return (
    <>
      <ThemeProvider defaultThemeType="auth" defaultThemeMode="light">
        <GlobalStyles />
        <UserProvider>
          <Toaster position="top-center" toastOptions={{ ...toastConfig }} />
          <Router />
        </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;

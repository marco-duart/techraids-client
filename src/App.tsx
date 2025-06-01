import GlobalStyles from "./assets/styles/global-styles";
import { ThemeProvider } from "./context/theme-provider";
import Router from "./routes";
import { UserProvider } from "./context/user-provider";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "./config/toast-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultThemeType="auth" defaultThemeMode="light">
        <GlobalStyles />
        <UserProvider>
          <Toaster position="top-center" toastOptions={{ ...toastConfig }} />
          <Router />
        </UserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
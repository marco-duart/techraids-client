import GlobalStyles from "./assets/styles/global-styles";
import { ThemeProvider } from "./context/theme-provider";
import Router from "./routes";
import { UserProvider } from "./context/user-provider";

const App = () => {
  return (
    <>
      <ThemeProvider defaultThemeType="auth" defaultThemeMode="light">
        <GlobalStyles />
        <UserProvider>
          <Router />
        </UserProvider>
      </ThemeProvider>
    </>
  );
};

export default App;

// import "react-loader-spinner/dist/loader/";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./auth/views";
import { RootContainer } from "./container";
import { Home } from "./pages";
import AppRoutes from "./routes";
import AppTheme from "./theme/views/AppTheme";

const queryClient = new QueryClient();

function App() {
  return (
    <AppTheme>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route element={<RootContainer />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
              {AppRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.protectedRoute ? (
                      <RequireAuth>
                        <route.component />
                      </RequireAuth>
                    ) : (
                      <route.component />
                    )
                  }
                />
              ))}
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppTheme>
  );
}

export default App;

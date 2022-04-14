// import "react-loader-spinner/dist/loader/";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./auth/views";
import { RootContainer } from "./container";
import AppRoutes from "./routes";

function Home() {
  return <h3>Home</h3>;
}

function App() {
  return (
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
  );
}

export default App;

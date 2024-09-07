import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TradingView from "./pages/Tradingview/TradingView";
import Root from "./pages/Root/Root";
import Profile from "./pages/Profile/Profile";
import "primereact/resources/themes/viva-dark/theme.css";
import { PrimeReactProvider } from "primereact/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "trading",
        element: <TradingView />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
const App: React.FC = () => {
  return (
    <PrimeReactProvider>
      <RouterProvider router={router} />;
    </PrimeReactProvider>
  );
};
export default App;

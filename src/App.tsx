import "./App.css";
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import "primereact/resources/themes/viva-dark/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import TradingView from "./pages/Tradingview/TradingView";
import Root from "./pages/Root/Root";
import Profile from "./pages/Profile/Profile";

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

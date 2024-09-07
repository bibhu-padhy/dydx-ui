import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TradingView from "./pages/Tradingview/TradingView";
import Root from "./pages/Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "trading",
        element: <TradingView />,
      },
    ],
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};
export default App;

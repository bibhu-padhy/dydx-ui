import { TabView, TabPanel } from "primereact/tabview";
import Profile from "../Profile/Profile";
import PlaceOrder from "../PlaceOrder/PlaceOrder";
import Positions from "../Positions/Positions";
import TradeHistory from "../TradeHistory/TradeHistory";
import Markets from "../Markets/MarketsPage";

export default function UserInteraction() {
  return (
    <div>
      <TabView>
        <TabPanel header="Markets">
          <Markets />
        </TabPanel>
        <TabPanel header="Place Order">
          <PlaceOrder />
        </TabPanel>
        <TabPanel header="Trade History">
          <TradeHistory />
        </TabPanel>
        <TabPanel header="Positions">
          <Positions />
        </TabPanel>
        <TabPanel header="Profile">
          <Profile />
        </TabPanel>
      </TabView>
    </div>
  );
}

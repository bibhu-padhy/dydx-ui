import { TabView, TabPanel } from "primereact/tabview";
import Profile from "../Profile/Profile";
import PlaceOrder from "../PlaceOrder/PlaceOrder";
import Positions from "../Positions/Positions";

export default function UserInteraction() {
  return (
    <div>
      <TabView>
        <TabPanel header="Place Order">
          <PlaceOrder />
        </TabPanel>
        <TabPanel header="Place Order">
          <Positions />
        </TabPanel>
        <TabPanel header="Profile">
          <Profile />
        </TabPanel>
      </TabView>
    </div>
  );
}

import TradingView from "../Tradingview/TradingView";
import UserInteraction from "../UserInteractionModule/UserInteraction";

export default function Root() {
  return (
    <div>
      <main style={{ flex: 1, padding: "20px" }}>
        <div className="grid">
          <div className="col-9">
            <TradingView />
          </div>
          <div className="col-3">
            <UserInteraction />
          </div>
        </div>
      </main>
    </div>
  );
}

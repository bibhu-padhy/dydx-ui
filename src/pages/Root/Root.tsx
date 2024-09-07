import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/trading">Trading View</Link>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}

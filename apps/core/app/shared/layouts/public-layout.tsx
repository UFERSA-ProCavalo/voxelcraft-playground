import { Outlet } from "react-router";
import { Header } from "../components/Header";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

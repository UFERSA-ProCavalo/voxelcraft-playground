import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { useRef, useState, useEffect } from "react";

export default function PublicLayout() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (!headerRef.current) return;
    setHeaderHeight(headerRef.current.offsetHeight);
    const observer = new window.ResizeObserver(entries => {
      for (let entry of entries) {
        setHeaderHeight(entry.contentRect.height);
      }
    });
    observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div ref={headerRef}>
        <Header />
      </div>
      <main className="flex-1 flex flex-col">
        <Outlet context={{ headerHeight }} />
      </main>
    </div>
  );
}

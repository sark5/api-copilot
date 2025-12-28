"use client";

import { useState } from "react";

type Tab = {
  key: string;
  label: string;
  content: React.ReactNode;
};

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].key);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            style={{
              padding: "6px 12px",
              fontWeight: active === t.key ? "bold" : "normal",
              borderBottom: active === t.key ? "2px solid black" : "none",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>{tabs.find((t) => t.key === active)?.content}</div>
    </div>
  );
}

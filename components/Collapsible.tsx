"use client";

export default function Collapsible({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "8px" }}>
      {children}
    </div>
  );
}

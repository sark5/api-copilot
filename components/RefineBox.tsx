"use client";

import { useState } from "react";

export default function RefineBox({
  onRefine,
  loading,
}: {
  onRefine: (text: string) => void;
  loading: boolean;
}) {
  const [text, setText] = useState("");

  return (
    <div style={{ width: "80%" }}>
      {/* ⬜ TEXTAREA — UNCHANGED */}
      <textarea
        placeholder='Refine spec (e.g. "Add authentication to all APIs")'
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
        }}
      />

      {/* 🔹 CENTERED BUTTON ONLY */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <button
          disabled={loading || !text.trim()}
          onClick={() => {
            onRefine(text.trim());
            setText("");
          }}
          style={{
            padding: "10px 22px",
            borderRadius: "8px",
            background: loading ? "#9ca3af" : "#2563eb",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Refining..." : "Refine Spec"}
        </button>
      </div>
    </div>
  );
}

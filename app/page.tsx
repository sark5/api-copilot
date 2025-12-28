"use client";

import { useState, useDeferredValue } from "react";
import InputPanel from "@/components/InputPanel";
import OutputSections from "@/components/OutputSections";
import RefineBox from "@/components/RefineBox";
import Loading from "@/components/Loading";
import ErrorBox from "@/components/ErrorBox";
import { generateSpec, refineSpec } from "@/lib/api";
import { copyJSON, downloadJSON } from "@/lib/export";
import { SpecOutput } from "@/types/spec";

export default function HomePage() {
  const [text, setText] = useState("");
  const [spec, setSpec] = useState<SpecOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [traceId, setTraceId] = useState("");

  const deferredSpec = useDeferredValue(spec);

  // ---------- GENERATE ----------
  const onGenerate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await generateSpec(text);
      setSpec(res.spec);
      setTraceId(res.trace_id);
    } catch (e: any) {
      setError(e?.detail?.error || "API error");
      setTraceId(e?.detail?.trace_id || "");
    } finally {
      setLoading(false);
    }
  };

  // ---------- REFINE ----------
  const onRefine = async (instruction: string) => {
    if (!spec || !instruction.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await refineSpec(spec, instruction);
      setSpec(res.spec);
      setTraceId(res.trace_id);
    } catch (e: any) {
      setError(e?.detail?.error || "Refinement failed");
      setTraceId(e?.detail?.trace_id || "");
    } finally {
      setLoading(false);
    }
  };

  // ---------- COMMON BUTTON STYLE ----------
  const primaryButtonStyle: React.CSSProperties = {
    padding: "10px 18px",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
  };

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
      <h2 className="text-center my-5 p-3 text-2xl font-bold">
        Requirement → API Copilot
      </h2>

      {/* ---------- INPUT ---------- */}
      <InputPanel
        value={text}
        onChange={setText}
        onSubmit={onGenerate}
        loading={loading}
      />

      {loading && <Loading />}

      {error && (
        <ErrorBox
          msg={`${error}${traceId ? ` (trace_id: ${traceId})` : ""}`}
        />
      )}

      {/* ---------- OUTPUT ---------- */}
      {deferredSpec && (
        <>
          <OutputSections spec={deferredSpec} />

          {/* ---------- EXPORT BUTTONS (STYLED) ---------- */}
          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              style={primaryButtonStyle}
              onClick={() => copyJSON(deferredSpec)}
            >
              Copy JSON
            </button>

            <button
              style={primaryButtonStyle}
              onClick={() => downloadJSON(deferredSpec)}
            >
              Download JSON
            </button>
          </div>

          {/* ---------- REFINE (BOTTOM & CENTERED) ---------- */}
          <div
            style={{
              marginTop: "36px",
              paddingTop: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <RefineBox onRefine={onRefine} loading={loading} />
          </div>
        </>
      )}
    </main>
  );
}

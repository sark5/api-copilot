"use client";

import { memo, useMemo } from "react";
import { SpecOutput } from "@/types/spec";
import Tabs from "./Tabs";
import Collapsible from "./Collapsible";

/* ---------- STYLES ---------- */

const sectionWrapper: React.CSSProperties = {
  padding: "10px 0",
};

const sectionHeaderStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#e5e7eb",
  fontWeight: 600,
  userSelect: "none",
};

const jsonBlockStyle: React.CSSProperties = {
  background: "#0f172a",
  color: "#e5e7eb",
  padding: "14px",
  borderRadius: "8px",
  fontSize: "13px",
  lineHeight: "1.6",
  overflowX: "auto",
};

/* ⭐ GRID for APIs / DB */
const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "16px",
  marginTop: "12px",
};

/* ---------- COMPONENT ---------- */

function OutputSections({ spec }: { spec: SpecOutput }) {
  const tabs = useMemo(
    () => [
      // -------- MODULES & FEATURES --------
      {
        key: "modules",
        label: "Modules & Features",
        content: (
          <div style={sectionWrapper}>
            <div style={sectionHeaderStyle}>Modules & Features</div>
            <Collapsible>
              <pre style={{ ...jsonBlockStyle, marginTop: "12px" }}>
                {JSON.stringify(
                  {
                    modules: spec.modules,
                    features_by_module: spec.features_by_module,
                  },
                  null,
                  2
                )}
              </pre>
            </Collapsible>
          </div>
        ),
      },

      // -------- USER STORIES --------
      {
        key: "stories",
        label: "User Stories",
        content: (
          <div style={sectionWrapper}>
            <div style={sectionHeaderStyle}>User Stories</div>
            <Collapsible>
              <div style={{ marginTop: "12px" }}>
                {spec.user_stories.map((story) => (
                  <pre key={story.id} style={{ ...jsonBlockStyle, marginBottom: "12px" }}>
                    {JSON.stringify(
                      {
                        id: story.id,
                        as_a: story.as_a,
                        i_want: story.i_want,
                        so_that: story.so_that,
                        module: story.module,
                      },
                      null,
                      2
                    )}
                  </pre>
                ))}
              </div>
            </Collapsible>
          </div>
        ),
      },

      // -------- API ENDPOINTS (GRID FIX) --------
      {
        key: "apis",
        label: "API Endpoints",
        content: (
          <div style={sectionWrapper}>
            <div style={sectionHeaderStyle}>API Endpoints</div>
            <Collapsible>
              <div style={gridStyle}>
                {spec.api_endpoints.map((api, idx) => (
                  <pre key={idx} style={jsonBlockStyle}>
                    {JSON.stringify(api, null, 2)}
                  </pre>
                ))}
              </div>
            </Collapsible>
          </div>
        ),
      },

      // -------- DB SCHEMA (GRID FIX) --------
      {
        key: "db",
        label: "DB Schema",
        content: (
          <div style={sectionWrapper}>
            <div style={sectionHeaderStyle}>Database Schema</div>
            <Collapsible>
              <div style={gridStyle}>
                {spec.db_schema.map((table, idx) => (
                  <pre key={idx} style={jsonBlockStyle}>
                    {JSON.stringify(table, null, 2)}
                  </pre>
                ))}
              </div>
            </Collapsible>
          </div>
        ),
      },

      // -------- OPEN QUESTIONS --------
      {
        key: "questions",
        label: "Open Questions",
        content: (
          <div style={sectionWrapper}>
            <div style={sectionHeaderStyle}>Open Questions</div>
            <Collapsible>
              <div style={{ marginTop: "12px" }}>
                {spec.open_questions.map((q, idx) => (
                  <pre key={idx} style={{ ...jsonBlockStyle, marginBottom: "12px" }}>
                    {JSON.stringify(q, null, 2)}
                  </pre>
                ))}
              </div>
            </Collapsible>
          </div>
        ),
      },
    ],
    [spec]
  );

  return (
    <div style={{ padding: "16px 6px" }}>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default memo(OutputSections);

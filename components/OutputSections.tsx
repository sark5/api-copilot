"use client";

import { memo, useMemo } from "react";
import { SpecOutput } from "@/types/spec";
import Tabs from "./Tabs";
import Collapsible from "./Collapsible";

function OutputSections({ spec }: { spec: SpecOutput }) {
  const sectionWrapper = { padding: "10px 0" };

  const tabs = useMemo(
    () => [
      {
        key: "modules",
        label: "Modules & Features",
        content: (
          <div style={sectionWrapper}>
            {spec.modules.map((m) => (
              <div key={m} style={{ marginBottom: "12px" }}>
                <b style={{ fontSize: "16px" }}>{m}</b>
                <Collapsible>
                  <ul style={{ marginTop: "6px" }}>
                    {spec.features_by_module[m]?.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </Collapsible>
              </div>
            ))}
          </div>
        ),
      },

      {
        key: "stories",
        label: "User Stories",
        content: (
          <div style={sectionWrapper}>
            <b>User Stories</b>
            <Collapsible>
              <ul style={{ marginTop: "8px" }}>
                {spec.user_stories.map((s) => (
                  <li key={s.id} style={{ marginBottom: "10px" }}>
                    <b>{s.id}</b> — As a <b>{s.as_a}</b>, I want{" "}
                    <b>{s.i_want}</b>, so that <b>{s.so_that}</b>.
                    <br />
                    <small style={{ color: "#666" }}>
                      Module: {s.module}
                    </small>
                  </li>
                ))}
              </ul>
            </Collapsible>
          </div>
        ),
      },

      {
        key: "apis",
        label: "API Endpoints",
        content: (
          <div style={sectionWrapper}>
            <b>API Endpoints</b>
            <Collapsible>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {spec.api_endpoints.length === 0
                  ? "No API endpoints generated"
                  : JSON.stringify(spec.api_endpoints, null, 2)}
              </pre>
            </Collapsible>
          </div>
        ),
      },

      {
        key: "db",
        label: "DB Schema",
        content: (
          <div style={sectionWrapper}>
            <b>Database Schema</b>
            <Collapsible>
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {spec.db_schema.length === 0
                  ? "No DB schema generated"
                  : JSON.stringify(spec.db_schema, null, 2)}
              </pre>
            </Collapsible>
          </div>
        ),
      },

      {
        key: "questions",
        label: "Open Questions",
        content: (
          <div style={sectionWrapper}>
            <b>Open Questions</b>
            <Collapsible>
              <ul>
                {spec.open_questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
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

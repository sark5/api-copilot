import { SpecOutput } from "@/types/spec";

/**
 * Generate initial spec from raw requirements
 */
export async function generateSpec(requirements_text: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/specs/generate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requirements_text }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}

/**
 * 🔁 Refine an existing spec with an instruction
 */
export async function refineSpec(
  spec: SpecOutput,
  instruction: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/specs/refine`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spec,
        instruction,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}

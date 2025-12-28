export function copyJSON(data: object) {
  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
}

export function downloadJSON(data: object) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "spec.json";
  a.click();
}

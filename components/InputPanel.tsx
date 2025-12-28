type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function InputPanel({
  value,
  onChange,
  onSubmit,
  loading,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center my-8 p-4 space-y-6">
      <textarea
        rows={8}
        placeholder="Paste product requirements here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%" }}
        className="
    w-full max-w-xl
    bg-black/60 text-white
    placeholder-gray-400
    p-4 rounded-xl
    border border-white/10
    shadow-[0_0_30px_rgba(59,130,246,0.15)]
    backdrop-blur-md
    focus:outline-none
    focus:ring-2 focus:ring-blue-500/60
    focus:shadow-[0_0_50px_rgba(59,130,246,0.35)]
    transition-all duration-300
    resize-none
  "
      />
      <button onClick={onSubmit}
        disabled={loading}
        className="relative px-8 py-4 text-lg font-semibold text-white rounded-xl
         bg-gradient-to-r from-blue-500 to-cyan-400
         shadow-[0_0_30px_rgba(59,130,246,0.6)]
         hover:shadow-[0_0_50px_rgba(59,130,246,0.9)]
         hover:scale-105
         transition-all duration-300">
        {loading ? "Generating..." : "Generate Spec"}
      </button>
    </div>
  );
}

export function ScanningLines() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-25"
      style={{
        backgroundImage:
          "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.06) 46%, rgba(57,255,20,0.22) 50%, rgba(57,255,20,0.06) 54%, transparent 100%)",
        backgroundSize: "240px 100%",
        animation: "scanner-move 12s linear infinite",
      }}
    />
  );
}

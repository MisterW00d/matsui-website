import { DotPattern } from "@/components/ui/dot-pattern"

function App() {
  return (
    <div
      className="h-screen w-screen p-[18px] font-['Geist',sans-serif]"
      style={{ backgroundColor: "#0a0a0b" }}
    >
      {/* Ambient purple glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div
          className="w-[600px] h-[400px] rounded-full animate-pulse"
          style={{
            background: "radial-gradient(circle, #6e11b0 0%, transparent 70%)",
            filter: "blur(120px)",
            opacity: 0.5,
          }}
        />
      </div>

      {/* Main card */}
      <div
        className="relative z-10 h-full rounded-2xl border flex flex-col overflow-hidden"
        style={{ backgroundColor: "#141416", borderColor: "#222226" }}
      >
        {/* Dot pattern with radial mask */}
        <DotPattern
          width={24}
          height={24}
          cr={1}
          glow
          className="text-[#6e11b0] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"
        />

        {/* Centered content */}
        <div className="flex-1 flex flex-col items-center justify-center relative z-10 gap-6 px-6">
          {/* Eyebrow */}
          <p
            className="text-[11px] font-medium uppercase tracking-[0.25em] animate-fade-up"
            style={{ color: "#4a4a52", animationDelay: "0ms", animationFillMode: "both" }}
          >
            AI &amp; Operations · Torino, IT
          </p>

          {/* Wordmark */}
          <h1
            className="font-black uppercase leading-none animate-fade-up"
            style={{
              fontSize: "clamp(72px, 10vw, 128px)",
              color: "#2e2e36",
              animationDelay: "100ms",
              animationFillMode: "both",
            }}
          >
            MATSUI
          </h1>

          {/* Payoff */}
          <p
            className="text-sm font-light uppercase tracking-[0.2em] animate-fade-up"
            style={{ color: "#72727e", animationDelay: "200ms", animationFillMode: "both" }}
          >
            So, business?
          </p>

          {/* Purple line */}
          <div
            className="w-[30px] h-px animate-fade-up"
            style={{ backgroundColor: "#6e11b0", animationDelay: "300ms", animationFillMode: "both" }}
          />

          {/* Description */}
          <p
            className="text-sm font-light max-w-md text-center leading-relaxed animate-fade-up"
            style={{ color: "#72727e", animationDelay: "400ms", animationFillMode: "both" }}
          >
            We help businesses move faster and smarter. AI integration and
            operations consulting — from strategy to execution, without the
            noise.
          </p>
        </div>

        {/* Footer */}
        <footer
          className="relative z-10 flex items-center justify-between px-6 py-4 border-t animate-fade-up"
          style={{ borderColor: "#222226", animationDelay: "500ms", animationFillMode: "both" }}
        >
          <span className="text-[11px]" style={{ color: "#4a4a52" }}>
            © 2026 Matsui SRL Società Benefit
          </span>
          <span className="text-[11px]" style={{ color: "#4a4a52" }}>
            P.IVA IT 12990710019 · CF 12990710019 · company [at] matsui.business
          </span>
        </footer>
      </div>
    </div>
  )
}

export default App

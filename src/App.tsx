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

      {/* Main card with dot pattern */}
      <div
        className="relative z-10 h-full rounded-2xl border overflow-hidden"
        style={{ backgroundColor: "#141416", borderColor: "#222226" }}
      >
        <DotPattern
          gap={24}
          dotSize={2}
          baseColor="#2e2e36"
          glowColor="#6e11b0"
          proximity={150}
          glowIntensity={1.2}
          waveSpeed={0.3}
          className="h-full w-full"
        >
          <div className="flex flex-col h-full">
            {/* Centered content */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
              {/* Eyebrow */}
              <p
                className="text-[11px] font-medium uppercase tracking-[0.25em] animate-fade-up"
                style={{ color: "#4a4a52", animationDelay: "0ms", animationFillMode: "both" }}
              >
                AI &amp; Operations · Torino, IT
              </p>

              {/* Wordmark */}
              <h1
                className="uppercase leading-none animate-fade-up"
                style={{
                  fontFamily: "'Aldrich', sans-serif",
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
              className="flex items-center justify-between px-6 py-4 border-t animate-fade-up"
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
        </DotPattern>
      </div>
    </div>
  )
}

export default App

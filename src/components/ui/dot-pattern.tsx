import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface DotPatternProps extends React.HTMLAttributes<HTMLCanvasElement> {
  gap?: number
  radius?: number
  dotColor?: string
  glowColor?: string
  glowRadius?: number
  className?: string
}

export function DotPattern({
  gap = 24,
  radius = 1,
  dotColor = "rgba(60, 60, 68, 0.6)",
  glowColor = "#6e11b0",
  glowRadius = 180,
  className,
  ...props
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const sizeRef = useRef({ w: 0, h: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const syncSize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      sizeRef.current = { w, h }
    }

    const ro = new ResizeObserver(() => syncSize())
    ro.observe(canvas)
    syncSize()

    const draw = () => {
      const { w, h } = sizeRef.current
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      const dpr = window.devicePixelRatio || 1
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const cols = Math.ceil(w / gap) + 1
      const rows = Math.ceil(h / gap) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gap
          const y = row * gap

          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const t = Math.max(0, 1 - dist / glowRadius)

          // Base dot
          ctx.globalAlpha = 1
          ctx.fillStyle = dotColor
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()

          // Glow overlay
          if (t > 0.01) {
            ctx.globalAlpha = t
            ctx.fillStyle = glowColor
            ctx.beginPath()
            ctx.arc(x, y, radius + t * 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    canvas.addEventListener("mousemove", onMove)
    canvas.addEventListener("mouseleave", onLeave)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      ro.disconnect()
      canvas.removeEventListener("mousemove", onMove)
      canvas.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [gap, radius, dotColor, glowColor, glowRadius])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-auto absolute inset-0 h-full w-full",
        className
      )}
      {...props}
    />
  )
}

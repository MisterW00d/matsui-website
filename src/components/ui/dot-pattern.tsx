import { useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"

interface DotPatternProps extends React.HTMLAttributes<HTMLCanvasElement> {
  /** Spacing between dots */
  gap?: number
  /** Base dot radius */
  radius?: number
  /** Base dot color (CSS color string) */
  dotColor?: string
  /** Glow color near cursor (CSS color string) */
  glowColor?: string
  /** Radius of the mouse glow effect in pixels */
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
  const rafRef = useRef<number>(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    const startCol = Math.floor(0 / gap)
    const endCol = Math.ceil(w / gap)
    const startRow = Math.floor(0 / gap)
    const endRow = Math.ceil(h / gap)

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        const x = col * gap
        const y = row * gap

        const dx = x - mx
        const dy = y - my
        const dist = Math.sqrt(dx * dx + dy * dy)

        const t = Math.max(0, 1 - dist / glowRadius)
        const r = radius + t * 1.5
        const alpha = t

        // Base dot
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()

        // Glow overlay
        if (alpha > 0.01) {
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = glowColor
          ctx.globalAlpha = alpha * 0.9
          ctx.fill()
          ctx.globalAlpha = 1
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw)
  }, [gap, radius, dotColor, glowColor, glowRadius])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [draw])

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

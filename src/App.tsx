import { useState, useEffect, useRef } from 'react'
import {
  Shield, Code2, Brain, ArrowRight, Mail, Phone, Linkedin, Github,
  ChevronDown, ExternalLink, Award, Briefcase, GraduationCap, Star,
  Globe, Terminal, Layers, Cpu, Database, Zap, Menu, X
} from 'lucide-react'

// ─── Logo SVG ───────────────────────────────────────────────────────────────
function Logo({ size = 18, fill = 'currentColor' }: { size?: number; fill?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="none">
      <path
        fill={fill}
        d="M 160 88 L 194 34 L 216 0 L 256 0 L 256 40 L 221.5 93.5 L 200 128 L 256 128 L 256 256 L 96 256 L 96 168 L 64.246 220 L 40 256 L 0 256 L 0 216 L 34 162 L 56 128 L 0 128 L 0 0 L 160 0 Z"
      />
    </svg>
  )
}
function FaisalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    let cloudOffset = 0
    let gridOffset = 0

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      size: Math.random() * 2 + 1,
      twinkle: Math.random() * 100,
    }))

    const coins = [
      { x: 250, y: 300 },
      { x: 330, y: 260 },
      { x: 410, y: 220 },
      { x: 680, y: 270 },
      { x: 760, y: 230 },
      { x: 840, y: 190 },
    ]

    const platforms = [
      { x: 180, y: 340, w: 180, h: 24 },
      { x: 560, y: 300, w: 180, h: 24 },
      { x: 780, y: 240, w: 160, h: 24 },
    ]

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      stars.forEach(star => {
        star.x = Math.random() * W
        star.y = Math.random() * H * 0.5
      })
    }

    function drawSky() {
      ctx.fillStyle = '#0a0a1a'
      ctx.fillRect(0, 0, W, H)
    }

    function drawMoon() {
      const x = W - 180
      const y = 120

      ctx.fillStyle = 'rgba(255,224,102,0.15)'
      ctx.beginPath()
      ctx.arc(x, y, 70, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ffe066'
      const size = 8

      for (let i = 0; i < 8; i += 1) {
        for (let j = 0; j < 8; j += 1) {
          if (Math.hypot(i - 4, j - 4) < 4) {
            ctx.fillRect(x + i * size - 32, y + j * size - 32, size, size)
          }
        }
      }
    }

    function drawStars(time: number) {
      stars.forEach(s => {
        const alpha = 0.5 + Math.sin(time * 0.002 + s.twinkle) * 0.5
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fillRect(s.x, s.y, s.size, s.size)
      })
    }

    function drawMountains() {
      const layers = [
        { color: '#16162e', height: 180 },
        { color: '#222244', height: 140 },
        { color: '#2c2250', height: 100 },
      ]

      layers.forEach((layer, index) => {
        ctx.fillStyle = layer.color
        ctx.beginPath()
        ctx.moveTo(0, H)

        for (let x = 0; x <= W + 100; x += 100) {
          const peak = H - layer.height - Math.sin((x + index * 120) * 0.01) * 50
          ctx.lineTo(x, peak)
        }

        ctx.lineTo(W, H)
        ctx.closePath()
        ctx.fill()
      })
    }

    function drawClouds() {
      cloudOffset += 0.2
      ctx.fillStyle = 'rgba(200,180,255,0.25)'

      for (let i = 0; i < 8; i += 1) {
        const x = ((i * 220) - cloudOffset) % (W + 300)
        const y = 80 + (i % 3) * 40

        for (let j = 0; j < 5; j += 1) {
          ctx.fillRect(x + j * 20, y, 20, 12)
        }
        for (let j = 1; j < 4; j += 1) {
          ctx.fillRect(x + j * 20, y - 10, 20, 12)
        }
      }
    }

    function drawGrid() {
      const horizon = H * 0.65
      ctx.strokeStyle = '#00ff88'
      ctx.lineWidth = 1

      for (let i = 0; i < 20; i += 1) {
        const y = horizon + i * i * 3 + (gridOffset % 20)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.stroke()
      }

      for (let x = -W; x < W * 2; x += 50) {
        ctx.beginPath()
        ctx.moveTo(W / 2, horizon)
        ctx.lineTo(x, H)
        ctx.stroke()
      }

      gridOffset += 0.5
    }

    function drawPlatforms() {
      platforms.forEach(p => {
        ctx.fillStyle = '#6644aa'
        ctx.fillRect(p.x, p.y, p.w, p.h)

        ctx.fillStyle = '#d8c8ff'
        ctx.fillRect(p.x, p.y, p.w, 4)

        ctx.shadowBlur = 15
        ctx.shadowColor = '#aa88ff'
        ctx.fillRect(p.x, p.y, p.w, 2)
        ctx.shadowBlur = 0
      })
    }

    function drawCoins(time: number) {
      coins.forEach((c, index) => {
        const bob = Math.sin(time * 0.004 + index) * 5
        ctx.shadowBlur = 15
        ctx.shadowColor = '#ffe066'
        ctx.fillStyle = '#ffe066'
        ctx.fillRect(c.x, c.y + bob, 16, 16)
        ctx.fillStyle = '#fff4b0'
        ctx.fillRect(c.x + 4, c.y + 4 + bob, 4, 4)
        ctx.shadowBlur = 0
      })
    }

    function drawHero(time: number) {
      const x = 100
      const y = H - 180 + Math.sin(time * 0.008) * 4
      ctx.fillStyle = '#ff4466'
      ctx.fillRect(x, y, 32, 32)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(x + 8, y + 8, 4, 4)
      ctx.fillRect(x + 20, y + 8, 4, 4)
      ctx.fillStyle = '#cc3355'
      ctx.fillRect(x + 4, y + 32, 8, 10)
      ctx.fillRect(x + 20, y + 32, 8, 10)
    }

    function drawHUD() {
      ctx.fillStyle = '#00ff88'
      ctx.font = '24px Courier New'
      ctx.shadowBlur = 8
      ctx.shadowColor = '#00ff88'
      ctx.fillText('SCORE 008420', 30, 40)
      ctx.fillText('LIVES x03', 30, 70)
      ctx.shadowBlur = 0
    }

    function drawCRT() {
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)'
        ctx.fillRect(0, y, W, 2)
      }
      const gradient = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.45)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)
    }

    let frameId = 0

    function animate(time: number) {
      ctx.clearRect(0, 0, W, H)
      drawSky()
      drawStars(time)
      drawMoon()
      drawClouds()
      drawMountains()
      drawGrid()
      drawPlatforms()
      drawCoins(time)
      drawHero(time)
      drawHUD()
      drawCRT()
      frameId = requestAnimationFrame(animate)
    }

    resize()
    frameId = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

function MoizBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0
    const fontSize = 18
    let columns = 0
    let rainDrops: number[] = []

    const chars =
      '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const logs = [
      'ACCESSING SECURE NODE...',
      'FIREWALL BREACH DETECTED',
      'INTRUSION VECTOR ACTIVE',
      'ROOT ACCESS: DENIED',
      'IP TRACE: 192.168.0.22',
      'IP TRACE: 10.0.4.71',
      'THREAT LEVEL: CRITICAL',
      'SYSTEM OVERRIDE ENABLED',
      'PACKET SNIFFER ONLINE',
    ]

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      columns = Math.floor(W / fontSize)
      rainDrops = Array.from({ length: columns }, () => Math.random() * -100)
    }

    function drawHex(x: number, y: number, size: number) {
      ctx.beginPath()

      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)

        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }

      ctx.closePath()
      ctx.stroke()
    }

    function drawHexGrid() {
      ctx.strokeStyle = 'rgba(0,255,136,0.08)'
      ctx.lineWidth = 1
      const size = 40
      const hexHeight = Math.sqrt(3) * size

      for (let y = -hexHeight; y < H + hexHeight; y += hexHeight) {
        for (let x = -size; x < W + size; x += size * 1.5) {
          const offsetX = (Math.floor(y / hexHeight) % 2) * size * 0.75
          drawHex(x + offsetX, y, size)
        }
      }
    }

    function drawMatrixRain() {
      ctx.fillStyle = 'rgba(2,12,10,0.12)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#00ff88'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < rainDrops.length; i += 1) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        const x = i * fontSize
        const y = rainDrops[i] * fontSize

        ctx.fillText(text, x, y)

        if (y > H && Math.random() > 0.975) {
          rainDrops[i] = 0
        }

        rainDrops[i] += 1
      }
    }

    function drawPanels(time: number) {
      const pulse = 0.5 + Math.sin(time * 0.004) * 0.5
      ctx.fillStyle = 'rgba(0,51,34,0.55)'
      ctx.fillRect(40, 120, 420, 420)
      ctx.strokeStyle = 'rgba(0,255,136,0.8)'
      ctx.lineWidth = 2
      ctx.strokeRect(40, 120, 420, 420)

      ctx.fillStyle = '#00ff88'
      ctx.font = '22px Courier New'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#00ff88'
      ctx.fillText('THREAT INTELLIGENCE', 60, 160)
      ctx.shadowBlur = 0

      ctx.font = '16px Courier New'
      for (let i = 0; i < logs.length; i += 1) {
        const y = 200 + i * 26
        ctx.fillStyle = i % 3 === 0 ? '#00ff88' : 'rgba(0,255,136,0.75)'
        ctx.fillText(`> ${logs[i]}`, 60, y)
      }

      ctx.fillStyle = 'rgba(0,0,0,0.4)'
      ctx.fillRect(60, 470, 360, 50)
      ctx.strokeStyle = '#00ff88'
      ctx.strokeRect(60, 470, 360, 50)
      ctx.fillStyle = `rgba(255,0,60,${pulse})`
      ctx.fillText('FIREWALL STATUS: BREACHED', 75, 502)
    }

    function drawAlert(time: number) {
      const pulse = 0.4 + Math.sin(time * 0.008) * 0.6
      ctx.fillStyle = `rgba(255,0,60,${pulse})`
      ctx.font = 'bold 34px Courier New'
      ctx.shadowBlur = 20
      ctx.shadowColor = '#ff003c'
      ctx.textAlign = 'center'
      ctx.fillText('!! SECURITY BREACH DETECTED !!', W / 2, 70)
      ctx.shadowBlur = 0
      ctx.textAlign = 'start'
    }

    function drawVirus(time: number) {
      const cx = W - 260
      const cy = H / 2
      const rotation = time * 0.001
      const glow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 140)
      glow.addColorStop(0, 'rgba(0,255,180,0.5)')
      glow.addColorStop(1, 'rgba(0,255,180,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, 140, 0, Math.PI * 2)
      ctx.fill()

      for (let i = 0; i < 24; i += 1) {
        const angle = (Math.PI * 2 / 24) * i + rotation
        const inner = 70
        const outer = 110
        const x1 = cx + Math.cos(angle) * inner
        const y1 = cy + Math.sin(angle) * inner
        const x2 = cx + Math.cos(angle) * outer
        const y2 = cy + Math.sin(angle) * outer
        ctx.strokeStyle = '#00ffcc'
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.fillStyle = '#00ffcc'
        ctx.beginPath()
        ctx.arc(x2, y2, 6, 0, Math.PI * 2)
        ctx.fill()
      }

      const gradient = ctx.createRadialGradient(cx - 20, cy - 20, 10, cx, cy, 90)
      gradient.addColorStop(0, '#88ffee')
      gradient.addColorStop(1, '#009977')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(cx, cy, 75, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(255,255,255,0.2)'
      for (let i = 0; i < 8; i += 1) {
        ctx.beginPath()
        ctx.arc(cx, cy, 20 + i * 7, rotation + i, rotation + Math.PI + i)
        ctx.stroke()
      }
    }

    function drawPadlock() {
      const x = W - 140
      const y = 60
      ctx.strokeStyle = '#00ff88'
      ctx.lineWidth = 5
      ctx.shadowBlur = 15
      ctx.shadowColor = '#00ff88'
      ctx.beginPath()
      ctx.arc(x, y, 25, Math.PI, 0)
      ctx.stroke()
      ctx.strokeRect(x - 25, y, 50, 45)
      ctx.shadowBlur = 0
    }

    function drawCRT() {
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)'
        ctx.fillRect(0, y, W, 2)
      }
      const gradient = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, W)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)
    }

    let frameId = 0

    function animate(time: number) {
      ctx.fillStyle = '#020c0a'
      ctx.fillRect(0, 0, W, H)
      drawMatrixRain()
      drawHexGrid()
      drawPanels(time)
      drawAlert(time)
      drawVirus(time)
      drawPadlock()
      drawCRT()
      frameId = requestAnimationFrame(animate)
    }

    resize()
    frameId = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

function RehanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0
    let H = 0

    const labels = [
      { text: 'HTML', color: '#4fc3f7', x: 220, y: 180, r: 140 },
      { text: 'CSS', color: '#a78bfa', x: 500, y: 120, r: 180 },
      { text: 'JS', color: '#fbbf24', x: 800, y: 220, r: 120 },
      { text: 'C/O', color: '#34d399', x: 950, y: 420, r: 150 },
      { text: 'UI', color: '#f472b6', x: 320, y: 480, r: 160 },
    ]

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function drawDotGrid() {
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      for (let x = 0; x < W; x += 30) {
        for (let y = 0; y < H; y += 30) {
          ctx.fillRect(x, y, 2, 2)
        }
      }
    }

    function drawBackgroundGlow() {
      const glows = [
        { x: W * 0.3, y: H * 0.3, color: 'rgba(79,195,247,0.25)', r: 240 },
        { x: W * 0.7, y: H * 0.4, color: 'rgba(167,139,250,0.22)', r: 260 },
        { x: W * 0.5, y: H * 0.7, color: 'rgba(52,211,153,0.18)', r: 260 },
      ]

      glows.forEach(g => {
        const gradient = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r)
        gradient.addColorStop(0, g.color)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    function drawMonitor(cx: number, cy: number, time: number) {
      const w = 240
      const h = 140

      ctx.save()
      ctx.translate(cx, cy)
      ctx.transform(1, 0.5, -1, 0.5, 0, 0)

      ctx.fillStyle = '#18293d'
      ctx.fillRect(0, 0, w, h)
      ctx.fillStyle = '#09131f'
      ctx.fillRect(12, 12, w - 24, h - 24)

      const codeColors = ['#4fc3f7', '#a78bfa', '#34d399', '#fbbf24', '#f472b6']
      for (let i = 0; i < 10; i += 1) {
        ctx.fillStyle = codeColors[i % codeColors.length]
        ctx.fillRect(24, 24 + i * 10, 60 + Math.random() * 120, 4)
      }

      ctx.shadowBlur = 20
      ctx.shadowColor = '#4fc3f7'
      ctx.strokeStyle = '#4fc3f7'
      ctx.strokeRect(12, 12, w - 24, h - 24)
      ctx.shadowBlur = 0
      ctx.restore()

      ctx.fillStyle = '#2a3c52'
      ctx.beginPath()
      ctx.moveTo(cx + 20, cy + 90)
      ctx.lineTo(cx + 80, cy + 120)
      ctx.lineTo(cx + 40, cy + 140)
      ctx.lineTo(cx - 20, cy + 110)
      ctx.closePath()
      ctx.fill()
    }

    function drawKeyboard(cx: number, cy: number) {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.transform(1, 0.5, -1, 0.5, 0, 0)
      ctx.fillStyle = '#162536'
      ctx.fillRect(0, 0, 180, 60)
      for (let y = 0; y < 4; y += 1) {
        for (let x = 0; x < 12; x += 1) {
          ctx.fillStyle = x % 3 === 0 ? '#4fc3f7' : '#2d4159'
          ctx.fillRect(8 + x * 14, 8 + y * 12, 10, 8)
        }
      }
      ctx.restore()
    }

    function drawPhone(x: number, y: number) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(-0.35)
      ctx.fillStyle = '#1f3045'
      ctx.fillRect(0, 0, 70, 140)
      ctx.fillStyle = '#0a121d'
      ctx.fillRect(8, 10, 54, 112)
      ctx.strokeStyle = '#34d399'
      ctx.strokeRect(8, 10, 54, 112)
      ctx.fillStyle = '#34d399'
      for (let i = 0; i < 5; i += 1) {
        ctx.fillRect(16, 24 + i * 18, 30 + Math.random() * 15, 6)
      }
      ctx.restore()
    }

    function drawCharts(x: number, y: number, time: number) {
      for (let i = 0; i < 5; i += 1) {
        const h = 30 + Math.sin(time * 0.002 + i) * 20
        ctx.fillStyle = i % 2 === 0 ? '#4fc3f7' : '#a78bfa'
        ctx.fillRect(x + i * 28, y - h, 18, h)
      }
      ctx.strokeStyle = '#34d399'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(x + 180, y - 20)
      for (let i = 0; i < 6; i += 1) {
        ctx.lineTo(x + 180 + i * 30, y - 40 - Math.sin(time * 0.002 + i) * 25)
      }
      ctx.stroke()
    }

    function drawPlant(x: number, y: number) {
      ctx.fillStyle = '#4b5563'
      ctx.fillRect(x, y, 30, 25)
      ctx.strokeStyle = '#34d399'
      ctx.lineWidth = 4
      for (let i = 0; i < 5; i += 1) {
        ctx.beginPath()
        ctx.moveTo(x + 15, y)
        ctx.lineTo(x + 5 + i * 5, y - 25 - Math.random() * 15)
        ctx.stroke()
      }
    }

    function drawGear(x: number, y: number, r: number, time: number, color: string, speed: number) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(time * speed)
      ctx.strokeStyle = color
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.arc(0, 0, r, 0, Math.PI * 2)
      ctx.stroke()
      for (let i = 0; i < 8; i += 1) {
        const angle = (Math.PI * 2 / 8) * i
        const x1 = Math.cos(angle) * r
        const y1 = Math.sin(angle) * r
        const x2 = Math.cos(angle) * (r + 12)
        const y2 = Math.sin(angle) * (r + 12)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
      }
      ctx.restore()
    }

    function drawConnections() {
      ctx.strokeStyle = 'rgba(79,195,247,0.35)'
      ctx.setLineDash([6, 6])
      const points = [
        [420, 260],
        [600, 450],
        [850, 300],
        [1000, 500],
        [300, 540],
      ]
      for (let i = 0; i < points.length - 1; i += 1) {
        ctx.beginPath()
        ctx.moveTo(points[i][0], points[i][1])
        ctx.lineTo(points[i + 1][0], points[i + 1][1])
        ctx.stroke()
      }
      ctx.setLineDash([])
    }

    function drawLabels(time: number) {
      labels.forEach((label, index) => {
        const float = Math.sin(time * 0.002 + index) * 12
        ctx.save()
        ctx.translate(label.x, label.y + float)
        ctx.shadowBlur = 18
        ctx.shadowColor = label.color
        ctx.fillStyle = label.color
        ctx.font = 'bold 28px Courier New'
        ctx.fillText(label.text, 0, 0)
        ctx.restore()
      })
    }

    function drawCRT() {
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.12)'
        ctx.fillRect(0, y, W, 2)
      }
      const gradient = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, W)
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.45)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)
    }

    let frameId = 0

    function animate(time: number) {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#0d1b2a'
      ctx.fillRect(0, 0, W, H)
      drawBackgroundGlow()
      drawDotGrid()
      drawConnections()
      drawMonitor(W * 0.42, H * 0.28, time)
      drawKeyboard(W * 0.45, H * 0.56)
      drawPhone(W * 0.72, H * 0.38)
      drawCharts(W * 0.62, H * 0.72, time)
      drawPlant(W * 0.25, H * 0.65)
      drawPlant(W * 0.82, H * 0.68)
      drawGear(W * 0.22, H * 0.25, 28, time, '#4fc3f7', 0.001)
      drawGear(W * 0.82, H * 0.22, 22, time, '#a78bfa', -0.0015)
      drawLabels(time)
      drawCRT()
      frameId = requestAnimationFrame(animate)
    }

    resize()
    frameId = requestAnimationFrame(animate)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

// ─── Types ──────────────────────────────────────────────────────────────────
type Page = 'home' | 'team' | 'about' | 'contact'

// ─── Team Data ──────────────────────────────────────────────────────────────
const members = [
  {
    id: 'moiz',
    name: 'Abdul Moiz',
    role: 'Cybersecurity Engineer',
    tagline: 'Breaking things to make them stronger.',
    email: 'abdulmoizkhan154@gmail.com',
    phone: '+923479679055',
    linkedin: 'https://www.linkedin.com/in/abdulmoixz',
    icon: Shield,
    accentColor: '#60a5fa',
    domain: 'Cybersecurity',
    summary:
      'Cybersecurity student at NUTECH and Google Cybersecurity Professional with hands-on penetration testing, API security, and bug bounty hunting experience. Currently interning at Cisco Academy UET Peshawar. Active CTF player and security researcher.',
    education: [
      { degree: 'BSc Cybersecurity', institution: 'National University of Technology, Islamabad', year: '2024 – Present' },
      { degree: 'Google Cybersecurity Professional Certificate', institution: 'Coursera · Google', year: '2025' },
      { degree: 'Cisco Certified Network Associate', institution: 'Cisco Academy', year: '2025' },
    ],
    experience: [
      {
        title: 'Bug Bounty & Security Researcher',
        org: 'Freelance',
        period: '2024 – Present',
        bullets: [
          'Identifying and reporting vulnerabilities in web apps, APIs, and mobile platforms.',
          'Specialized in API exploitation and authentication flaws.',
          'Active CTF competitor solving real-world security challenges.',
        ],
      },
      {
        title: 'Cybersecurity Intern',
        org: 'Cisco Networking Academy, UET Peshawar',
        period: 'Aug 2025 – Sept 2025',
        bullets: [
          'Network defense simulations and network security research.',
          'Hands-on exposure to firewalls, routers, and secure network design.',
          'Supported senior instructors and documented lab results.',
        ],
      },
      {
        title: 'Cybersecurity Intern',
        org: 'Microsoft Learn Student Ambassadors, UET Peshawar',
        period: 'July 2025 – Aug 2025',
        bullets: [
          'Projects on ethical hacking, network scanning, and information gathering.',
          'Explored session security, password cracking, and system security basics.',
          'Delivered project documentation and live demos.',
        ],
      },
    ],
    skills: [
      'Penetration Testing', 'Bug Bounty', 'API Security', 'Auth Flaws',
      'Burp Suite', 'Nmap', 'Wireshark', 'Metasploit', 'Nessus',
      'Kali Linux', 'SIEM', 'Python', 'Bash', 'SQL', 'C++',
      'IDS/IPS', 'Digital Forensics', 'CTFs',
    ],
    languages: ['Pashto (Native)', 'Urdu (Advanced)', 'English (Advanced)'],
  },
  {
    id: 'faisal',
    name: 'Rana Faisal Mustafa',
    role: 'Game & App Developer',
    tagline: 'Crafting experiences pixel by pixel.',
    email: 'faisalmustafa8686@gmail.com',
    phone: '0302-0071917',
    linkedin: 'https://github.com',
    icon: Code2,
    accentColor: '#a78bfa',
    domain: 'Software Development',
    summary:
      'Motivated CS student at NUTECH specialising in game and application development. Proficient in Python, Java, C#, and C++ with hands-on project experience spanning 2D games, custom data structures, and cross-platform app development. Self-driven learner who picks up new frameworks independently.',
    education: [
      { degree: 'BS Computer Science', institution: 'NUTECH University, Islamabad', year: '2024 – 2028 (Expected)' },
    ],
    experience: [
      {
        title: 'Freelance Video Editor & Website Moderator',
        org: 'Self-employed',
        period: '2019 – Present',
        bullets: [
          'Produced and edited promotional and YouTube videos for multiple clients.',
          'Managed full post-production workflows end-to-end.',
          'Moderated websites for content quality and user engagement.',
        ],
      },
    ],
    projects: [
      { name: 'JavaFX Fighting Game', tech: 'Java · JavaFX · OOP', desc: '2D turn-based fighting game with character classes, attack mechanics, and JavaFX UI built on OOP principles.' },
      { name: 'Python 2D Game', tech: 'Python · Pygame', desc: 'Interactive 2D game with sprite animations, collision detection, and event-driven gameplay logic.' },
      { name: 'NeoVim-Style Text Editor', tech: 'C++ · FLTK · Data Structures', desc: 'Feature-complete text editor from scratch — Gap Buffer for O(1) insertion, custom stack for unlimited undo/redo, Vim-style modal editing. Scored 105/100.' },
      { name: 'Pac-Man Clone', tech: 'C# · MonoGame', desc: 'Pac-Man recreation self-learning MonoGame. Clean architecture with Entities, Screens, and Systems. Targets .NET 9.' },
    ],
    skills: [
      'Python', 'Java', 'C#', 'C++', 'JavaScript',
      'Pygame', 'JavaFX', 'MonoGame', 'React Native',
      'OOP', 'Data Structures & Algorithms', 'Memory Management',
      'Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'UI/UX',
    ],
    languages: ['English (Fluent)', 'Urdu (Native)'],
  },
  {
    id: 'rehan',
    name: 'Rehan Shahzad',
    role: 'AI & Web Developer',
    tagline: 'Teaching machines to understand the world.',
    email: 'rehanshahzad6018@gmail.com',
    phone: '0331-9658521',
    linkedin: 'https://github.com',
    icon: Brain,
    accentColor: '#f472b6',
    domain: 'AI / ML · Web Dev',
    summary:
      'CS student at NUTECH specialising in web and application development with a strong focus on machine learning and AI. Proficient in Python, Java, C++, SQL, PHP, and JavaScript with real-world project experience from attendance systems to fully deployed commercial websites and AI-powered applications.',
    education: [
      { degree: 'BS AI', institution: 'NUTECH University, Islamabad', year: '2024 – 2028 (Expected)' },
    ],
    experience: [
      {
        title: 'Web Developer',
        org: 'Techora (Web-Based Company)',
        period: 'During Studies',
        bullets: [
          'Designed and developed the company website (front-end + back-end).',
          'Collaborated with team to deliver production-ready product meeting client requirements.',
        ],
      },
      {
        title: 'Developer',
        org: 'Hooriya Departmental Store',
        period: 'During Studies',
        bullets: [
          'Built and deployed the store website and Windows desktop application from scratch.',
          'Integrated and managed product/inventory database for live business operations.',
        ],
      },
    ],
    projects: [
      { name: 'RAG System', tech: 'Python · Flask · ChromaDB · Claude API · SQLite', desc: 'Full-stack Retrieval-Augmented Generation app — upload PDFs, index them into vector DB, and ask natural language questions answered by Claude AI.' },
      { name: 'AI Image Classifier', tech: 'Python · Flask · Claude Vision API · SQLite', desc: 'Vision-powered image analysis tool using Claude API to classify images, extract text (OCR), identify elements, and answer custom questions.' },
      { name: 'Techora Website', tech: 'HTML · CSS · JavaScript · PHP', desc: 'Production-ready website for Techora covering front-end design and back-end functionality. techora.pk' },
      { name: 'Hooriya Store System', tech: 'JavaScript · SQL · Web · Desktop', desc: 'Full website and Windows desktop app for a departmental store with real-time inventory database integration.' },
      { name: 'Attendance Management System', tech: 'Python · Database', desc: 'Functional attendance tracking system with database integration for student/employee recording and reporting.' },
      { name: 'Flappy Bird (OOP/GUI)', tech: 'Java/Python · OOP · GUI', desc: 'Classic Flappy Bird recreation built using OOP principles with a graphical user interface.' },
    ],
    skills: [
      'Python', 'Java', 'C#', 'C++', 'JavaScript', 'PHP',
      'MySQL', 'SQLite', 'Machine Learning', 'Flask',
      'ChromaDB', 'Claude API', 'React Native', 'HTML', 'CSS',
      'Web Development', 'Desktop Apps', 'RAG Systems',
    ],
    languages: ['English (Fluent)', 'Urdu (Native)'],
  },
]

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav({ active, setPage }: { active: Page; setPage: (p: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Team', page: 'team' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 sm:pt-6 px-4 sm:px-8 gap-2 sm:gap-3">
      {/* Logo pill */}
      <button
        onClick={() => setPage('home')}
        className="flex items-center justify-center rounded-full w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-opacity hover:opacity-80"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
        aria-label="CGW Home"
      >
        <Logo size={18} fill="rgb(240,240,238)" />
      </button>

      {/* Desktop nav pill */}
      <div
        className="hidden sm:flex items-center gap-8 rounded-xl px-8 py-3"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {links.map(l => (
          <button
            key={l.page}
            onClick={() => setPage(l.page)}
            className={`nav-link text-[13px] font-medium transition-colors duration-200 ${
              active === l.page ? 'text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Mobile menu toggle */}
      <button
        className="sm:hidden flex items-center justify-center rounded-full w-10 h-10 shrink-0 text-gray-400"
        style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="absolute top-[72px] left-4 right-4 rounded-xl p-4 flex flex-col gap-3"
          style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => { setPage(l.page); setMobileOpen(false) }}
              className={`text-left text-[14px] font-medium py-1 transition-colors ${
                active === l.page ? 'text-white' : 'text-gray-400'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Hero Page ───────────────────────────────────────────────────────────────
function HeroPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4"
      />
      {/* Gradient overlay */}
      <div className="video-overlay absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Spacer for nav */}
        <div className="h-20" />

        {/* Hero bottom-left content */}
        <div className="flex-1 flex items-end pb-10 sm:pb-16 lg:pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
          <div className="max-w-sm">
            {/* Badge */}
            <button
              onClick={() => setPage('about')}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-blue-400 hover:text-blue-300 transition-colors mb-3 group animate-fadeUp"
            >
              code guard win
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </button>

            {/* Headline */}
            <h1 className="font-display text-[2.2rem] sm:text-[2.8rem] leading-[1.1] font-normal text-white tracking-tight mb-4 animate-fadeUp delay-100">
              Where Security meets Software &amp; Intelligence.
            </h1>

            {/* Sub */}
            <p className="text-[13px] text-gray-400 font-normal mb-5 animate-fadeUp delay-200">
              A three-person collective blending cybersecurity, game development, and AI engineering into one powerhouse team.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fadeUp delay-300">
              <button
                onClick={() => setPage('team')}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-400 border border-blue-500 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
              >
                Meet the team
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </button>
              <button
                onClick={() => setPage('contact')}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-400 border border-gray-700 rounded-full px-5 py-2.5 hover:border-gray-500 hover:text-gray-200 transition-all duration-200"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center pb-6 animate-fadeIn delay-800">
          <ChevronDown size={18} className="text-gray-600 animate-float" />
        </div>
      </div>

      {/* Domain tags — bottom right */}
      <div className="absolute bottom-16 right-6 sm:right-12 lg:right-28 z-10 flex flex-col gap-2 items-end animate-fadeIn delay-500">
        {[
          { icon: Shield, label: 'Cybersecurity', color: '#60a5fa' },
          { icon: Code2, label: 'Software Dev', color: '#a78bfa' },
          { icon: Brain, label: 'AI & ML', color: '#f472b6' },
        ].map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex items-center gap-2 text-[11px] font-medium px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color }}
          >
            <Icon size={11} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Team Page ──────────────────────────────────────────────────────────────
function MemberCard({ m, onClick }: { m: typeof members[0]; onClick: () => void }) {
  const Icon = m.icon
  return (
    <div
      className="card-glow cursor-pointer rounded-2xl p-6 flex flex-col gap-4"
      style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
      onClick={onClick}
    >
      <div className="accent-line rounded-full" />
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${m.accentColor}18` }}
        >
          <Icon size={20} style={{ color: m.accentColor }} />
        </div>
        <span
          className="text-[10px] font-medium px-2.5 py-1 rounded-full"
          style={{ background: `${m.accentColor}15`, color: m.accentColor, border: `1px solid ${m.accentColor}30` }}
        >
          {m.domain}
        </span>
      </div>

      <div>
        <div className="font-display text-[1.35rem] text-white leading-tight">{m.name}</div>
        <div className="text-[12px] text-gray-500 mt-0.5">{m.role}</div>
      </div>

      <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-3">{m.summary}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {m.skills.slice(0, 5).map(s => (
          <span key={s} className="skill-tag text-[10px] px-2 py-0.5 rounded-full text-gray-400">{s}</span>
        ))}
        {m.skills.length > 5 && (
          <span className="text-[10px] text-gray-600 px-2 py-0.5">+{m.skills.length - 5} more</span>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: m.accentColor }}>
        View profile
        <ArrowRight size={12} />
      </div>
    </div>
  )
}

function TeamPage({ setSelected }: { setSelected: (id: string) => void }) {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 animate-fadeUp">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-3">The Team</div>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] leading-[1.1] text-white mb-4">
            Three minds.<br />One collective.
          </h2>
          <p className="text-[14px] text-gray-500 max-w-lg leading-relaxed">
            CGW unites a cybersecurity researcher, a game & app developer, and an AI/web engineer — each exceptional in their domain, stronger together.
          </p>
        </div>

        <hr className="section-divider mb-14" />

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {members.map((m, i) => (
            <div key={m.id} className={`animate-fadeUp delay-${(i + 1) * 100 + 200}`}>
              <MemberCard m={m} onClick={() => setSelected(m.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Member Profile Page ─────────────────────────────────────────────────────
function ProfilePage({ id, onBack }: { id: string; onBack: () => void }) {
  const m = members.find(x => x.id === id)!
  const Icon = m.icon
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }) }, [id])

  return (
    <div ref={scrollRef} className="relative min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      {m.id === 'faisal' && <FaisalBackground />}
      {m.id === 'moiz' && <MoizBackground />}
      {m.id === 'rehan' && <RehanBackground />}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[12px] text-gray-500 hover:text-gray-300 transition-colors mb-10 animate-fadeUp"
        >
          ← Back to team
        </button>

        {/* Profile header */}
        <div className="flex flex-col sm:flex-row items-start gap-6 mb-10 animate-fadeUp delay-100">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: `${m.accentColor}20`, border: `1px solid ${m.accentColor}30` }}
          >
            <Icon size={28} style={{ color: m.accentColor }} />
          </div>
          <div>
            <div className="font-display text-[2rem] sm:text-[2.5rem] text-white leading-tight">{m.name}</div>
            <div className="text-[13px] text-gray-500 mt-1">{m.role}</div>
            <div className="flex flex-wrap gap-3 mt-3">
              <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-[11.5px] text-gray-500 hover:text-gray-300 transition-colors">
                <Mail size={11} /> {m.email}
              </a>
              <span className="flex items-center gap-1.5 text-[11.5px] text-gray-500">
                <Phone size={11} /> {m.phone}
              </span>
            </div>
          </div>
        </div>

        <div className="accent-line rounded-full mb-8" />

        {/* Summary */}
        <section className="mb-10 animate-fadeUp delay-200">
          <SectionLabel icon={Star} label="Summary" />
          <p className="text-[14px] text-gray-400 leading-relaxed">{m.summary}</p>
        </section>

        {/* Education */}
        <section className="mb-10 animate-fadeUp delay-300">
          <SectionLabel icon={GraduationCap} label="Education" />
          <div className="flex flex-col gap-4">
            {m.education.map((e, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-[14px] font-medium text-white">{e.degree}</div>
                <div className="text-[12px] text-gray-500 mt-0.5">{e.institution}</div>
                <div className="text-[11px] text-gray-600 mt-1">{e.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-10 animate-fadeUp delay-400">
          <SectionLabel icon={Briefcase} label="Experience" />
          <div className="flex flex-col gap-5">
            {m.experience.map((e, i) => (
              <div key={i} className="rounded-xl p-4" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-[14px] font-medium text-white">{e.title}</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">{e.org}</div>
                  </div>
                  <span className="text-[11px] text-gray-600 shrink-0">{e.period}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] text-gray-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: m.accentColor }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects (if any) */}
        {'projects' in m && (
          <section className="mb-10 animate-fadeUp delay-500">
            <SectionLabel icon={Layers} label="Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(m as any).projects.map((p: any, i: number) => (
                <div key={i} className="rounded-xl p-4 card-glow" style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-[13px] font-medium text-white mb-1">{p.name}</div>
                  <div className="text-[10px] font-medium mb-2" style={{ color: m.accentColor }}>{p.tech}</div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="mb-10 animate-fadeUp delay-500">
          <SectionLabel icon={Zap} label="Skills" />
          <div className="flex flex-wrap gap-2">
            {m.skills.map(s => (
              <span key={s} className="skill-tag text-[11px] px-3 py-1 rounded-full text-gray-400">{s}</span>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section className="animate-fadeUp delay-600">
          <SectionLabel icon={Globe} label="Languages" />
          <div className="flex flex-wrap gap-2">
            {m.languages.map(l => (
              <span key={l} className="text-[11px] px-3 py-1 rounded-full text-gray-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{l}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={13} className="text-gray-600" />
      <span className="text-[11px] font-medium text-gray-600 uppercase tracking-widest">{label}</span>
    </div>
  )
}

// ─── About Page ──────────────────────────────────────────────────────────────
function AboutPage() {
  const pillars = [
    { icon: Shield, color: '#60a5fa', title: 'Cybersecurity', desc: 'From penetration testing and bug bounty hunting to network defense and digital forensics — we think like attackers so we can defend like experts.' },
    { icon: Code2, color: '#a78bfa', title: 'Software Development', desc: 'Games, applications, editors — built from scratch with a love for data structures, clean architecture, and code that actually works.' },
    { icon: Brain, color: '#f472b6', title: 'Artificial Intelligence', desc: 'Machine learning, RAG systems, computer vision — deploying AI that solves real problems and integrates with the real world.' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-4xl mx-auto">
        <div className="animate-fadeUp mb-14">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-3">About CGW</div>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] leading-[1.1] text-white mb-5">
            Built by students.<br />Thinking like professionals.
          </h2>
          <p className="text-[14px] text-gray-400 leading-relaxed max-w-xl">
            CGW is a student-led technology collective based in Islamabad, Pakistan. We started as three classmates at NUTECH University who realised our skills complemented each other perfectly — and decided to build something together.
          </p>
        </div>

        <hr className="section-divider mb-14" />

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {pillars.map(({ icon: Icon, color, title, desc }, i) => (
            <div
              key={title}
              className={`card-glow rounded-2xl p-6 animate-fadeUp delay-${(i + 1) * 100 + 200}`}
              style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div className="text-[15px] font-medium text-white mb-2">{title}</div>
              <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="rounded-2xl p-8 animate-fadeUp delay-600"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: '3', label: 'Core Members' },
              { value: '10+', label: 'Projects Shipped' },
              { value: '3+', label: 'Certifications' },
              { value: '2024', label: 'Founded' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-[2.5rem] text-white leading-tight">{value}</div>
                <div className="text-[11px] text-gray-600 mt-1 uppercase tracking-widest">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="mt-14 animate-fadeUp delay-700">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-4">Mission</div>
          <blockquote className="font-display text-[1.6rem] sm:text-[2rem] text-gray-300 leading-relaxed border-l-2 border-gray-700 pl-6">
            "We believe the best technology is secure, thoughtfully built, and intelligently designed. That's what we're here to create."
          </blockquote>
        </div>
      </div>
    </div>
  )
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 sm:px-12 md:px-20 lg:px-28">
      <div className="max-w-3xl mx-auto">
        <div className="animate-fadeUp mb-14">
          <div className="text-[11px] font-medium text-gray-600 uppercase tracking-widest mb-3">Contact</div>
          <h2 className="font-display text-[2.5rem] sm:text-[3.5rem] leading-[1.1] text-white mb-4">
            Let's work<br />together.
          </h2>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-lg">
            Interested in collaborating, hiring, or just want to talk tech? Reach out to the team.
          </p>
        </div>

        <hr className="section-divider mb-14" />

        {/* Company contact */}
        <div
          className="rounded-2xl p-6 mb-8 animate-fadeUp delay-200"
          style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Logo size={20} fill="rgb(240,240,238)" />
            <span className="font-display text-[1.2rem] text-white">CGW</span>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:cgwoffical@gmail.com"
              className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <Mail size={13} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
              </div>
              cgwoffical@gmail.com
            </a>
            <div className="flex items-center gap-3 text-[12px] text-gray-600">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <Terminal size={13} className="text-gray-600" />
              </div>
              Islamabad, Pakistan
            </div>
          </div>
        </div>

        {/* Individual contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {members.map((m, i) => {
            const Icon = m.icon
            return (
              <div
                key={m.id}
                className={`card-glow rounded-2xl p-5 animate-fadeUp delay-${(i + 3) * 100}`}
                style={{ background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${m.accentColor}18` }}>
                    <Icon size={14} style={{ color: m.accentColor }} />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-white">{m.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-gray-600">{m.role.split(' ')[0]}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`mailto:${m.email}`}
                    className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <Mail size={10} /> {m.email.split('@')[0]}…
                  </a>
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
                    <Phone size={10} /> {m.phone}
                  </span>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <ExternalLink size={10} /> LinkedIn / GitHub
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center animate-fadeUp delay-700">
          <a
            href="mailto:cgwoffical@gmail.com"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-400 border border-blue-500 rounded-full px-7 py-3 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
          >
            Send us an email
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t px-6 sm:px-12 md:px-20 lg:px-28 py-10" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size={15} fill="rgb(100,100,100)" />
          <span className="text-[12px] text-gray-700">CGW · Islamabad, Pakistan</span>
        </div>
        <div className="flex items-center gap-6">
          {(['home', 'team', 'about', 'contact'] as Page[]).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className="text-[11px] text-gray-700 hover:text-gray-400 transition-colors capitalize"
            >
              {p}
            </button>
          ))}
        </div>
        <a
          href="mailto:cgwoffical@gmail.com"
          className="text-[11px] text-gray-700 hover:text-gray-400 transition-colors"
        >
          cgwoffical@gmail.com
        </a>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const handleSetPage = (p: Page) => {
    setSelectedMember(null)
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectMember = (id: string) => {
    setSelectedMember(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedMember(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="grain">
      <Nav active={page} setPage={handleSetPage} />

      {page === 'home' && <HeroPage setPage={handleSetPage} />}

      {page === 'team' && (
        selectedMember
          ? <ProfilePage id={selectedMember} onBack={handleBack} />
          : <TeamPage setSelected={handleSelectMember} />
      )}

      {page === 'about' && <AboutPage />}
      {page === 'contact' && <ContactPage />}

      {page !== 'home' && <Footer setPage={handleSetPage} />}
    </div>
  )
}

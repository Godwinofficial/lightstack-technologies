import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, PhoneOff, RefreshCw, Volume2, Sparkles } from "lucide-react";

interface AIVoiceVisualizerProps {
  state: "idle" | "listening" | "thinking" | "speaking";
  transcript: string;
  interimTranscript?: string;
  onStop: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  voiceVolume?: number; // Volume of the agent speaking
}

export function AIVoiceVisualizer({
  state,
  transcript,
  interimTranscript = "",
  onStop,
  isMuted,
  onToggleMute,
  voiceVolume = 0
}: AIVoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [micVolume, setMicVolume] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Hook into microphone decibels when listening
  useEffect(() => {
    if (state === "listening" && !isMuted) {
      const initAudio = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          streamRef.current = stream;

          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;

          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64; // Small fft for quick responsive volume checking
          analyserRef.current = analyser;

          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          
          const checkVolume = () => {
            if (!analyserRef.current) return;
            analyserRef.current.getByteFrequencyData(dataArray);
            
            // Calculate average amplitude
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            // Normalize volume (0 to 1)
            setMicVolume(average / 128.0);
            
            animationFrameRef.current = requestAnimationFrame(checkVolume);
          };
          
          checkVolume();
        } catch (err) {
          console.warn("Microphone not accessible for real-time visualization:", err);
          // Fallback to synthetic volume simulation
          const simulateVolume = () => {
            if (state === "listening") {
              setMicVolume(0.1 + Math.random() * 0.15);
              animationFrameRef.current = requestAnimationFrame(simulateVolume);
            }
          };
          simulateVolume();
        }
      };

      initAudio();
    } else {
      setMicVolume(0);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, [state, isMuted]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    window.addEventListener("resize", handleResize);

    // Particle system variables
    const particleCount = 120;
    const particles: Array<{
      angle: number;
      distance: number;
      size: number;
      speed: number;
      color: string;
      seed: number;
    }> = [];

    // Initialize particles around a center circle
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      particles.push({
        angle,
        distance: 140 + Math.random() * 80,
        size: 1.5 + Math.random() * 3,
        speed: 0.005 + Math.random() * 0.015,
        color: `hsla(${210 + Math.random() * 40}, 95%, ${60 + Math.random() * 20}%, ${0.3 + Math.random() * 0.5})`,
        seed: Math.random() * 100
      });
    }

    let globalRotation = 0;
    let waveOffset = 0;

    const render = () => {
      if (!ctx || !canvas) return;
      
      // Clear with tailwind slate bg trail for motion blur
      ctx.fillStyle = "rgba(10, 15, 30, 0.15)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height) * 0.18; // base orb radius

      globalRotation += 0.002;
      waveOffset += 0.05;

      // ----------------------------------------------------
      // DRAW BACKGROUND NEBULA GLOW
      // ----------------------------------------------------
      let glowSize = baseRadius * 1.5;
      let primaryColor = "rgba(59, 130, 246, 0.15)"; // blue
      let accentColor = "rgba(0, 123, 255, 0.05)";

      if (state === "listening") {
        const factor = isMuted ? 0 : micVolume;
        glowSize = baseRadius * (1.5 + factor * 0.8);
        primaryColor = `rgba(59, 130, 246, ${0.18 + factor * 0.2})`;
      } else if (state === "thinking") {
        glowSize = baseRadius * (1.4 + Math.sin(waveOffset * 2) * 0.15);
        primaryColor = "rgba(139, 92, 246, 0.2)"; // purple
        accentColor = "rgba(59, 130, 246, 0.1)";
      } else if (state === "speaking") {
        glowSize = baseRadius * (1.5 + voiceVolume * 0.7);
        primaryColor = `rgba(6, 182, 212, ${0.2 + voiceVolume * 0.25})`; // cyan
      }

      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, glowSize);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(0.5, accentColor);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // ----------------------------------------------------
      // STATE-SPECIFIC ORB DRAWING
      // ----------------------------------------------------
      if (state === "idle") {
        // Breathing Orb
        const breath = Math.sin(waveOffset) * 8;
        const radius = baseRadius + breath;

        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius + 20, 0, Math.PI * 2);
        ctx.stroke();

      } else if (state === "listening") {
        // Reacting Audio Ring
        const audioFactor = isMuted ? 0 : micVolume;
        const wavePoints = 80;
        ctx.beginPath();
        
        for (let i = 0; i <= wavePoints; i++) {
          const angle = (i / wavePoints) * Math.PI * 2;
          // Add noise matching real volume
          const noise = audioFactor > 0 
            ? Math.sin(angle * 12 + waveOffset * 2) * audioFactor * 45 * (0.5 + Math.random() * 0.5)
            : Math.sin(angle * 8 + waveOffset) * 3;
          
          const r = baseRadius + noise;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 + audioFactor * 0.5})`;
        ctx.lineWidth = 3 + audioFactor * 3;
        ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Secondary outer breathing wave
        ctx.beginPath();
        for (let i = 0; i <= wavePoints; i++) {
          const angle = (i / wavePoints) * Math.PI * 2;
          const noise = Math.sin(angle * 5 - waveOffset) * (8 + audioFactor * 15);
          const r = baseRadius + 30 + noise;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = "rgba(59, 130, 246, 0.15)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

      } else if (state === "thinking") {
        // Swirling Cybernetic Rings
        const ringCount = 3;
        for (let rIdx = 0; rIdx < ringCount; rIdx++) {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(globalRotation * (rIdx === 1 ? -3 : 2) + (rIdx * Math.PI) / 3);
          
          ctx.beginPath();
          // Draw oval rotating rings
          const rx = baseRadius * (1.1 - rIdx * 0.1);
          const ry = baseRadius * (0.6 - rIdx * 0.05);
          ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
          
          ctx.strokeStyle = rIdx === 0 
            ? "rgba(139, 92, 246, 0.6)" 
            : rIdx === 1 ? "rgba(59, 130, 246, 0.4)" : "rgba(6, 182, 212, 0.3)";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // Swirling core nucleus
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * 0.3 + Math.sin(waveOffset * 3) * 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(139, 92, 246, 0.4)";
        ctx.fill();

      } else if (state === "speaking") {
        // Pulse Ring representing speech
        const activeVol = voiceVolume;
        const ptsCount = 120;
        ctx.beginPath();
        
        for (let i = 0; i <= ptsCount; i++) {
          const angle = (i / ptsCount) * Math.PI * 2;
          const pulse = Math.sin(angle * 16 + waveOffset * 3.5) * (activeVol * 35);
          const r = baseRadius + pulse;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.closePath();
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.6 + activeVol * 0.4})`;
        ctx.lineWidth = 4 + activeVol * 4;
        ctx.shadowColor = "rgba(6, 182, 212, 0.6)";
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // Echo ripples
        if (activeVol > 0.15) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, baseRadius + 40 + activeVol * 60, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 - activeVol * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // ----------------------------------------------------
      // DRAW ORBITING PARTICLE SWARM
      // ----------------------------------------------------
      particles.forEach((p, index) => {
        let currentRadius = baseRadius;
        
        if (state === "idle") {
          p.angle += p.speed * 0.3;
          p.distance = 150 + Math.sin(waveOffset * 0.5 + p.seed) * 15;
        } else if (state === "listening") {
          const fact = isMuted ? 0 : micVolume;
          p.angle += p.speed * (1 + fact * 2);
          p.distance = 150 + fact * 80 + Math.sin(waveOffset + p.seed) * (15 + fact * 25);
        } else if (state === "thinking") {
          // Spiraling towards center vortex
          p.angle += p.speed * 4;
          // Float inwards
          p.distance -= 0.8;
          if (p.distance < baseRadius * 0.3) {
            p.distance = baseRadius * (1.2 + Math.random() * 0.6);
          }
        } else if (state === "speaking") {
          p.angle += p.speed * (1 + voiceVolume * 3);
          p.distance = 160 + voiceVolume * 90 + Math.sin(waveOffset * 1.5 + p.seed) * (10 + voiceVolume * 30);
        }

        const x = centerX + Math.cos(p.angle) * p.distance;
        const y = centerY + Math.sin(p.angle) * p.distance;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size * (state === "speaking" ? (1 + voiceVolume) : 1), 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle connectors when close
        if (state === "thinking" && index % 12 === 0) {
          ctx.strokeStyle = "rgba(139, 92, 246, 0.08)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      });

      // Draw active core center text
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Floating glowing label for aesthetic
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.font = `900 ${baseRadius * 0.4}px "Outfit", sans-serif`;
      ctx.fillText("LSTK-AI", centerX, centerY - 5);

      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [state, micVolume, voiceVolume]);

  // Status mapping
  const statusTexts = {
    idle: "Ready to Talk",
    listening: isMuted ? "Muted" : "Listening...",
    thinking: "Deepening Knowledge...",
    speaking: "Lightstack AI speaking"
  };

  const statusColors = {
    idle: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    listening: isMuted ? "text-red-400 border-red-500/20 bg-red-500/5" : "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 animate-pulse",
    thinking: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    speaking: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[#070b19] text-white z-50 overflow-hidden font-sans p-6 md:p-10 select-none">
      {/* Background Matrix/Blueprint Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      
      {/* Header Deck */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-blue-500/30 flex items-center justify-center bg-blue-500/5">
            <Sparkles className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/50">LIGHTSTACK AUDIO AGENT</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`h-1.5 w-1.5 rounded-full ${state === "listening" && !isMuted ? "bg-emerald-500 animate-ping" : state === "thinking" ? "bg-purple-500 animate-spin" : "bg-blue-500"}`}></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-white/90">NODE-01 CONNECTED</span>
            </div>
          </div>
        </div>

        {/* State Badge */}
        <div className={`px-4 py-1.5 border text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${statusColors[state]}`}>
          {statusTexts[state]}
        </div>
      </div>

      {/* Center Interactive Visualizer Stage */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Subtitles & Transcription deck */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col gap-8 mb-4 items-center">
        
        {/* Dynamic Speech Subtitles Box */}
        <div className="w-full min-h-[100px] flex items-center justify-center p-6 md:p-8 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-none text-center">
          <AnimatePresence mode="wait">
            {state === "listening" ? (
              <motion.div
                key="listening-sub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl"
              >
                {interimTranscript || transcript ? (
                  <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                    {transcript}
                    <span className="text-blue-400 font-normal">{interimTranscript}</span>
                  </p>
                ) : (
                  <p className="text-lg md:text-xl font-bold text-white/30 tracking-wide uppercase">
                    {isMuted ? "Unmute microphone to speak..." : "Say something, I'm listening..."}
                  </p>
                )}
              </motion.div>
            ) : state === "thinking" ? (
              <motion.div
                key="thinking-sub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-purple-500 rounded-full animate-bounce"></span>
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">ENGINEERING RESPONSE</p>
              </motion.div>
            ) : (
              <motion.div
                key="agent-sub"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl"
              >
                {transcript ? (
                  <p className="text-lg md:text-xl font-bold leading-relaxed text-blue-100">
                    {transcript}
                  </p>
                ) : (
                  <p className="text-lg md:text-xl font-bold text-white/20 tracking-wide uppercase">
                    Lightstack AI Standing By
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Controller Buttons Panel */}
        <div className="flex items-center justify-center gap-6 md:gap-10 p-4 border border-white/5 bg-white/[0.02] backdrop-blur-xl">
          
          {/* Mute Button */}
          <button
            onClick={onToggleMute}
            className={`w-14 h-14 flex items-center justify-center transition-all duration-300 active:scale-95 border ${
              isMuted
                ? "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
            }`}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call Button */}
          <button
            onClick={onStop}
            className="w-20 h-14 bg-red-600 border border-red-500 hover:bg-red-500 text-white flex items-center justify-center transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
            title="End Call and exit voice mode"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          {/* Simulate Action (or Voice Sync feedback indicator) */}
          <div className="w-14 h-14 flex items-center justify-center border border-white/5 bg-white/[0.01] text-white/20">
            <Volume2 className={`w-5 h-5 ${state === "speaking" ? "text-cyan-400 animate-pulse" : ""}`} />
          </div>
        </div>

        {/* Tech Specs Footer labels */}
        <div className="flex justify-between items-center w-full px-4 text-[8px] font-black uppercase tracking-[0.3em] text-white/20">
          <div>LATENCY: {"< 120MS"}</div>
          <div className="h-px bg-white/5 flex-1 mx-8 hidden sm:block"></div>
          <div>SAMPLING RATE: 44.1KHZ</div>
          <div className="h-px bg-white/5 flex-1 mx-8 hidden sm:block"></div>
          <div>ENCRYPTION: AES-256</div>
        </div>
      </div>
    </div>
  );
}

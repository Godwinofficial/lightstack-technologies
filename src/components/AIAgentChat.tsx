import React, { useState, useEffect, useRef, useCallback } from "react";
import { OPEN_ROUTER_API_KEY, API_URL, MODEL, LIGHTSTACK_CONTEXT } from "../lib/aiKnowledge";

const VOICES_PREFERRED = ["Google UK English Male", "Google US English", "Microsoft David", "Alex"];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const getOfflineSimulationResponse = (query: string): string => {
  const q = query.toLowerCase();
  if (q.includes("adlc") || q.includes("framework") || q.includes("agentic")) {
    return "Our Agentic AI systems are engineered using our proprietary ADLC (Agentic Development Life Cycle) framework. This guided deployment methodology ensures governed, production-grade AI agents with multi-agent orchestrations, structural guardrails, and low hallucination rates to solve complex reasoning tasks.";
  }
  if (q.includes("mobile") || q.includes("app") || q.includes("android") || q.includes("ios") || q.includes("phone")) {
    return "For mobile app development, we engineer high-performance iOS and Android applications with native-level precision. We build secure, offline-first mobile ecosystems that integrate deeply with complex enterprise stacks and scale globally.";
  }
  if (q.includes("enterprise") || q.includes("architecture") || q.includes("legacy") || q.includes("modernize")) {
    return "Our Enterprise Architecture services are built to modernize legacy infrastructure and architect high-performance platforms. We focus on extreme modularity, core business automation, and guarantee sub-120ms operational latency.";
  }
  if (q.includes("web") || q.includes("portal") || q.includes("development") || q.includes("website")) {
    return "We design and engineer bespoke web ecosystems and specialized industrial web tools. Every platform is tailored for concrete returns on investment, high accessibility, and optimized performance.";
  }
  if (q.includes("latency") || q.includes("accuracy") || q.includes("fast") || q.includes("metric") || q.includes("speed")) {
    return "We guarantee elite operational thresholds across all deployments: under 120 milliseconds transaction latency and a 99.98% engineering logic accuracy rating.";
  }
  if (q.includes("contact") || q.includes("phone") || q.includes("email") || q.includes("book") || q.includes("consult") || q.includes("call")) {
    return "You can book a technical architecture consultation with our engineering team by emailing us at contact@lightstackgroup.com or calling our telephone hotline at +260 973 848 066.";
  }
  if (q.includes("who") || q.includes("what") || q.includes("lightstack") || q.includes("about") || q.includes("collective")) {
    return "Lightstack Technologies is an elite custom software engineering collective founded in 2024. We combine the disciplined reliability of traditional enterprise software with the adaptive intelligence of governed agentic AI. Every outcome is measurable.";
  }
  return "I am Aletheia, Lightstack's AI consultant. Connection error, I have initiated offline simulation mode. Ask me about our ADLC framework, enterprise architecture, custom web portals, native mobile app, or support contacts!";
};

export function AIAgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm the Lightstack AI assistant. I can help you learn about our engineering services, discuss your project ideas, or answer any questions. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [voiceError, setVoiceError] = useState("");
  const [waveValues, setWaveValues] = useState<number[]>(Array(20).fill(4));
  const [pulseActive, setPulseActive] = useState(false);

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(typeof window !== "undefined" ? window.speechSynthesis : null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const waveIntervalRef = useRef<any>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animate waveform
  useEffect(() => {
    if (isListening || isSpeaking) {
      waveIntervalRef.current = setInterval(() => {
        setWaveValues(
          Array(20)
            .fill(0)
            .map(() => Math.random() * 32 + 4)
        );
      }, 80);
    } else {
      clearInterval(waveIntervalRef.current);
      setWaveValues(Array(20).fill(4));
    }
    return () => clearInterval(waveIntervalRef.current);
  }, [isListening, isSpeaking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      synthRef.current?.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    // Strip markdown
    const clean = text
      .replace(/[*_`#~]/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\n+/g, ". ")
      .trim();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 1.05;
    utter.pitch = 1.0;
    utter.volume = 1;
    // Pick best voice
    const voices = synthRef.current.getVoices();
    const preferred = voices.find((v) => VOICES_PREFERRED.some((p) => v.name.includes(p)));
    if (preferred) utter.voice = preferred;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => {
      setIsSpeaking(false);
      if (isVoiceMode) {
        setTimeout(() => startListening(), 400);
      }
    };
    utter.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utter);
  }, [isVoiceMode]);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.onstart = () => {
      setIsListening(true);
      setVoiceError("");
      setTranscript("");
    };
    recognition.onresult = (e: any) => {
      const t = Array.from(e.results)
        .map((r: any) => r[0].transcript)
        .join("");
      setTranscript(t);
    };
    recognition.onend = () => {
      setIsListening(false);
      setTranscript((t) => {
        if (t.trim()) sendMessage(t.trim(), true);
        return "";
      });
    };
    recognition.onerror = (e: any) => {
      setIsListening(false);
      if (e.error !== "no-speech") setVoiceError(`Mic error: ${e.error}`);
    };
    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string, fromVoice = false) => {
      if (!text.trim() || isLoading) return;
      const userMsg: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);
      setPulseActive(true);

      try {
        const history = [...messages, userMsg].slice(-12);
        const sysPrompt = LIGHTSTACK_CONTEXT + (fromVoice || isVoiceMode
          ? "\n\nIMPORTANT: This is a voice conversation. Keep your response to 1-2 short sentences. No lists, no markdown."
          : "");

        const openRouterMessages = [];
        if (sysPrompt) {
          openRouterMessages.push({ role: "system", content: sysPrompt });
        }
        history.forEach(msg => {
          openRouterMessages.push({ role: msg.role, content: msg.content });
        });

        let res: Response | null = null;
        let retries = 3;
        let delay = 1000;

        for (let i = 0; i <= retries; i++) {
          try {
            res = await fetch(API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPEN_ROUTER_API_KEY}`,
                "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "https://lightstackgroup.com",
                "X-Title": "Lumina AI"
              },
              body: JSON.stringify({
                model: MODEL,
                messages: openRouterMessages,
                max_tokens: fromVoice || isVoiceMode ? 150 : 600,
                temperature: 0.7,
              }),
            });

            if (res.status === 429 && i < retries) {
              console.warn(`[API] Rate limited (429). Retrying in ${delay}ms...`);
              await new Promise(resolve => setTimeout(resolve, delay));
              delay *= 2; // exponential backoff
              continue;
            }
            break;
          } catch (fetchErr) {
            if (i === retries) throw fetchErr;
            console.warn(`[API] Network error. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
          }
        }

        let reply = "";
        if (!res || !res.ok) {
          console.warn(`[API] OpenRouter rate-limited or failed (Status: ${res?.status || "unknown"}). Activating offline fallback.`);
          reply = getOfflineSimulationResponse(text);
        } else {
          const data = await res.json();
          reply = data.choices?.[0]?.message?.content || "No response received.";
        }

        const assistantMsg: Message = { role: "assistant", content: reply };
        setMessages((prev) => [...prev, assistantMsg]);

        if (fromVoice || isVoiceMode) {
          setTimeout(() => speak(reply), 100);
        }
      } catch (err: any) {
        console.error("Widget API Error:", err);
        const fallbackReply = getOfflineSimulationResponse(text);
        const fallbackMsg: Message = { role: "assistant", content: fallbackReply };
        setMessages((prev) => [...prev, fallbackMsg]);
        if (fromVoice || isVoiceMode) {
          setTimeout(() => speak(fallbackReply), 100);
        }
      } finally {
        setIsLoading(false);
        setPulseActive(false);
      }
    },
    [messages, isLoading, isVoiceMode, speak]
  );

  const toggleVoiceMode = () => {
    if (isVoiceMode) {
      synthRef.current?.cancel();
      recognitionRef.current?.stop();
      setIsVoiceMode(false);
      setIsListening(false);
      setIsSpeaking(false);
      setTranscript("");
    } else {
      setIsVoiceMode(true);
      setTimeout(() => startListening(), 600);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#090a15",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#e8eaf0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(16,185,129,0.07) 0%, transparent 60%)",
      }} />

      {/* Header */}
      <header style={{
        position: "relative", zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(9,10,21,0.8)",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(99,102,241,0.4)",
            fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: -1,
          }}>L</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.3px", color: "#f0f1f8" }}>Lightstack AI</div>
            <div style={{ fontSize: 11, color: "#6366f1", fontWeight: 500, letterSpacing: "0.5px" }}>ENGINEERING BEYOND CODE</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Status dot */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%",
              background: isLoading ? "#f59e0b" : "#10b981",
              boxShadow: `0 0 6px ${isLoading ? "#f59e0b" : "#10b981"}`,
            }} />
            {isLoading ? "Thinking…" : isListening ? "Listening…" : isSpeaking ? "Speaking…" : "Ready"}
          </div>

          {/* Voice Mode Toggle */}
          <button
            onClick={toggleVoiceMode}
            style={{
              padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 12, letterSpacing: "0.3px",
              background: isVoiceMode
                ? "linear-gradient(135deg, #6366f1, #10b981)"
                : "rgba(255,255,255,0.06)",
              color: isVoiceMode ? "#fff" : "#94a3b8",
              boxShadow: isVoiceMode ? "0 0 16px rgba(99,102,241,0.35)" : "none",
              transition: "all 0.3s ease",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span style={{ fontSize: 14 }}>{isVoiceMode ? "🎙️" : "🔇"}</span>
            {isVoiceMode ? "Voice Mode ON" : "Voice Mode"}
          </button>
        </div>
      </header>

      {/* Voice Mode Overlay */}
      {isVoiceMode && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 50,
          background: "rgba(9,10,21,0.96)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 32,
        }}>
          {/* Animated orb */}
          <div style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Outer rings */}
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                position: "absolute",
                width: 180 + i * 40,
                height: 180 + i * 40,
                borderRadius: "50%",
                border: `1px solid rgba(99,102,241,${0.15 - i * 0.04})`,
                animation: `ringPulse ${1.2 + i * 0.3}s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }} />
            ))}
            {/* Core orb */}
            <div style={{
              width: 120, height: 120, borderRadius: "50%",
              background: isListening
                ? "radial-gradient(circle, #10b981 0%, #059669 60%, #064e3b 100%)"
                : isSpeaking
                ? "radial-gradient(circle, #6366f1 0%, #4f46e5 60%, #1e1b4b 100%)"
                : "radial-gradient(circle, #334155 0%, #1e293b 100%)",
              boxShadow: isListening
                ? "0 0 40px rgba(16,185,129,0.5), 0 0 80px rgba(16,185,129,0.2)"
                : isSpeaking
                ? "0 0 40px rgba(99,102,241,0.5), 0 0 80px rgba(99,102,241,0.2)"
                : "0 0 20px rgba(0,0,0,0.5)",
              transition: "all 0.4s ease",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 36,
              animation: (isListening || isSpeaking) ? "orbPulse 1.5s ease-in-out infinite" : "none",
            }}>
              {isListening ? "🎤" : isSpeaking ? "🔊" : isLoading ? "⚡" : "💬"}
            </div>
          </div>

          {/* Waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: 3, height: 48 }}>
            {waveValues.map((h, i) => (
              <div key={i} style={{
                width: 3, borderRadius: 2,
                height: `${h}px`,
                background: isListening
                  ? `rgba(16,185,129,${0.5 + (h / 36) * 0.5})`
                  : isSpeaking
                  ? `rgba(99,102,241,${0.5 + (h / 36) * 0.5})`
                  : "rgba(148,163,184,0.2)",
                transition: "height 0.08s ease",
              }} />
            ))}
          </div>

          {/* Status label */}
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 20, fontWeight: 600, color: "#f0f1f8", marginBottom: 8,
              letterSpacing: "-0.3px",
            }}>
              {isListening ? "Listening…" : isSpeaking ? "Speaking…" : isLoading ? "Processing…" : "Tap mic to speak"}
            </div>
            {transcript && (
              <div style={{
                fontSize: 14, color: "#94a3b8", maxWidth: 400, textAlign: "center",
                background: "rgba(255,255,255,0.04)", padding: "10px 20px", borderRadius: 12,
              }}>
                {transcript}
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", gap: 16 }}>
            <button
              onClick={() => isListening ? stopListening() : startListening()}
              disabled={isLoading || isSpeaking}
              style={{
                width: 60, height: 60, borderRadius: "50%", border: "none",
                cursor: isLoading || isSpeaking ? "not-allowed" : "pointer",
                background: isListening
                  ? "linear-gradient(135deg, #ef4444, #b91c1c)"
                  : "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: isListening ? "0 0 24px rgba(239,68,68,0.4)" : "0 0 24px rgba(16,185,129,0.4)",
                fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
                opacity: isLoading || isSpeaking ? 0.4 : 1,
                transition: "all 0.2s",
              }}
            >
              {isListening ? "⏹" : "🎤"}
            </button>

            <button
              onClick={() => { synthRef.current?.cancel(); setIsSpeaking(false); }}
              disabled={!isSpeaking}
              style={{
                width: 60, height: 60, borderRadius: "50%", border: "none",
                cursor: isSpeaking ? "pointer" : "not-allowed",
                background: "rgba(255,255,255,0.06)",
                fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
                opacity: isSpeaking ? 1 : 0.3,
                transition: "all 0.2s",
              }}
            >
              🔇
            </button>

            <button
              onClick={toggleVoiceMode}
              style={{
                width: 60, height: 60, borderRadius: "50%",
                cursor: "pointer",
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          {voiceError && (
            <div style={{ color: "#f87171", fontSize: 13, background: "rgba(239,68,68,0.1)", padding: "8px 16px", borderRadius: 8 }}>
              {voiceError}
            </div>
          )}

          {/* Last message preview */}
          {messages.length > 1 && (
            <div style={{
              position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
              maxWidth: 500, width: "90%",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, padding: "14px 18px",
            }}>
              <div style={{ fontSize: 11, color: "#6366f1", fontWeight: 600, marginBottom: 6, letterSpacing: "0.5px" }}>LAST RESPONSE</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                {messages[messages.length - 1].role === "assistant"
                  ? messages[messages.length - 1].content.slice(0, 120) + (messages[messages.length - 1].content.length > 120 ? "…" : "")
                  : "—"}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 16px",
        position: "relative", zIndex: 5,
        scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.2) transparent",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: 10,
              alignItems: "flex-end",
            }}>
              {msg.role === "assistant" && (
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg, #6366f1, #10b981)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, color: "#fff",
                }}>L</div>
              )}
              <div style={{
                maxWidth: "78%",
                padding: "11px 15px",
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                  : "rgba(255,255,255,0.05)",
                border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                fontSize: 14, lineHeight: 1.6,
                color: msg.role === "user" ? "#fff" : "#d1d5db",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                boxShadow: msg.role === "user"
                  ? "0 4px 16px rgba(99,102,241,0.25)"
                  : "none",
              }}>
                {msg.content}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speak(msg.content)}
                    style={{
                      marginLeft: 8, background: "none", border: "none",
                      color: "#4b5563", cursor: "pointer", fontSize: 13,
                      padding: 2, borderRadius: 4,
                      verticalAlign: "middle",
                      opacity: 0.6,
                    }}
                    title="Read aloud"
                  >🔊</button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg, #6366f1, #10b981)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 800, color: "#fff",
              }}>L</div>
              <div style={{
                padding: "12px 18px", borderRadius: "18px 18px 18px 4px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex", gap: 5, alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#6366f1",
                    animation: `dotBounce 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "12px 16px 16px",
        background: "rgba(9,10,21,0.9)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        {voiceError && !isVoiceMode && (
          <div style={{ color: "#f87171", fontSize: 12, marginBottom: 8, textAlign: "center" }}>{voiceError}</div>
        )}
        <div style={{
          maxWidth: 720, margin: "0 auto",
          display: "flex", gap: 10, alignItems: "flex-end",
        }}>
          {/* Voice mic button */}
          <button
            onClick={() => isListening ? stopListening() : startListening()}
            disabled={isLoading || isSpeaking}
            style={{
              width: 44, height: 44, borderRadius: 12,
              cursor: isLoading ? "not-allowed" : "pointer", flexShrink: 0,
              background: isListening
                ? "linear-gradient(135deg, #ef4444, #b91c1c)"
                : "rgba(255,255,255,0.06)",
              border: isListening ? "none" : "1px solid rgba(255,255,255,0.1)",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isListening ? "0 0 16px rgba(239,68,68,0.4)" : "none",
              transition: "all 0.2s",
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            {isListening ? "⏹" : "🎤"}
          </button>

          {/* Text input */}
          <div style={{
            flex: 1, position: "relative",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14, overflow: "hidden",
            transition: "border-color 0.2s",
          }}>
            <textarea
              ref={inputRef}
              value={isListening ? transcript : input}
              onChange={(e) => !isListening && setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening…" : "Ask Lightstack AI anything…"}
              rows={1}
              disabled={isLoading || isListening}
              style={{
                width: "100%", background: "transparent", border: "none",
                outline: "none", resize: "none", padding: "11px 14px",
                fontSize: 16, color: "#e2e8f0", lineHeight: 1.5,
                fontFamily: "inherit", boxSizing: "border-box",
                caretColor: "#6366f1",
                opacity: isListening ? 0.7 : 1,
              }}
            />
          </div>

          {/* Send */}
          <button
            onClick={() => sendMessage(isListening ? transcript : input)}
            disabled={isLoading || (!input.trim() && !transcript.trim())}
            style={{
              width: 44, height: 44, borderRadius: 12,
              cursor: isLoading ? "not-allowed" : "pointer", flexShrink: 0,
              background: input.trim() || transcript.trim()
                ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: input.trim() ? "0 0 16px rgba(99,102,241,0.3)" : "none",
              transition: "all 0.2s",
              opacity: isLoading || (!input.trim() && !transcript.trim()) ? 0.4 : 1,
            }}
          >
            ↑
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 11, color: "#334155", marginTop: 8 }}>
          Powered by <span style={{ color: "#6366f1" }}>Lightstack Group</span> · lightstackgroup.com
        </div>
      </div>

      <style>{`
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.2); border-radius: 2px; }
      `}</style>
    </div>
  );
}

export default AIAgentChat;

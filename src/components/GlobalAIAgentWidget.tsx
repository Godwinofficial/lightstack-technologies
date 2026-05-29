import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, MessageSquare, X, Send, Mic, Trash2, Key, HelpCircle, 
  ArrowRight, KeyRound, Volume2, MicOff, AlertCircle
} from "lucide-react";
import { AIVoiceVisualizer } from "./AIVoiceVisualizer";
import { getOfflineSimulationResponse } from "./AIAgentChat";
import { toast } from "sonner";

const MODEL = "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";

const LIGHTSTACK_CONTEXT = `You are the official AI assistant for Lightstack Group (lightstackgroup.com). You are knowledgeable, professional, and helpful.

About Lightstack Group:
- Tagline: "Engineering Beyond Code"
- Lightstack designs and engineers websites, mobile apps, and bespoke software systems for ambitious teams worldwide.
- Services: Web Development, Mobile App Development, Bespoke Software Systems, UI/UX Design
- Known for building high-quality digital products for ambitious teams worldwide
- Based in Zambia, serving clients globally
- Keywords: software engineering, web development, mobile apps, bespoke software, digital agency, Zambia tech, UI/UX design
- Website: lightstackgroup.com

Your role:
- Answer questions about Lightstack Group's services, capabilities, and approach
- Help potential clients understand what Lightstack can do for them
- Be enthusiastic about technology and engineering
- Keep responses concise and conversational when in voice mode (2-3 sentences max)
- For voice interactions, avoid using markdown, bullet points, or special characters
- Always be helpful, professional, and reflect Lightstack's "Engineering Beyond Code" spirit`;

const MINI_SUGGESTIONS = [
  { label: "What is the ADLC framework?", query: "Can you explain Lightstack's ADLC framework for Agentic AI?" },
  { label: "Book a consultation", query: "I would like to contact Lightstack to discuss a custom enterprise architecture project." }
];

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function GlobalAIAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState("");
  
  // Chat States
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I am Aletheia, Lightstack's virtual AI consultant. How can I assist you with custom engineering, native mobile apps, or our ADLC agent framework today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Voice/Audio States
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voiceVolume, setVoiceVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const voiceVolumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Listen to router/location changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
      
      // Periodically monitor location changes (useful inside SPA routers)
      const interval = setInterval(() => {
        if (window.location.pathname !== pathname) {
          setPathname(window.location.pathname);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [pathname]);

  // Load voices for synthesis
  useEffect(() => {
    if (typeof window !== "undefined" && isOpen) {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        const defaultVoice = availableVoices.find(
          v => v.lang.includes("en-US") && (v.name.includes("Google") || v.name.includes("Natural"))
        ) || availableVoices.find(v => v.lang.startsWith("en"));
        
        if (defaultVoice) {
          setSelectedVoiceName(defaultVoice.name);
        }
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isSending, isOpen]);

  // If on the /agent route, hide the widget entirely to avoid UI collision
  if (pathname === "/agent") return null;

  // Speak synthesized response out loud
  const speakText = (text: string) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    if (voiceVolumeIntervalRef.current) clearInterval(voiceVolumeIntervalRef.current);
    setVoiceVolume(0);

    let cleanText = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/```[\s\S]*?```/g, "[Code segment omitted]")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/#+/g, "")
      .trim();

    if (!cleanText) return;

    const sentences = cleanText.match(/[^.!?]+[.!?]+(\s|$)/g) || [cleanText];
    let sentenceIndex = 0;

    const speakNextSentence = () => {
      if (!synthRef.current || sentenceIndex >= sentences.length || !isVoiceMode) {
        if (isVoiceMode) {
          setVoiceState("listening");
          setVoiceTranscript("");
          setInterimTranscript("");
          startSpeechRecognition();
        }
        return;
      }

      const sentenceText = sentences[sentenceIndex].trim();
      if (!sentenceText) {
        sentenceIndex++;
        speakNextSentence();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(sentenceText);
      activeUtteranceRef.current = utterance;
      
      const activeVoice = voices.find(v => v.name === selectedVoiceName);
      if (activeVoice) utterance.voice = activeVoice;
      
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setVoiceState("speaking");
        setVoiceTranscript(sentenceText);
        voiceVolumeIntervalRef.current = setInterval(() => {
          setVoiceVolume(0.3 + Math.random() * 0.5);
        }, 100);
      };

      utterance.onend = () => {
        if (voiceVolumeIntervalRef.current) clearInterval(voiceVolumeIntervalRef.current);
        setVoiceVolume(0);
        sentenceIndex++;
        speakNextSentence();
      };

      utterance.onerror = () => {
        if (voiceVolumeIntervalRef.current) clearInterval(voiceVolumeIntervalRef.current);
        setVoiceVolume(0);
        sentenceIndex++;
        speakNextSentence();
      };

      synthRef.current.speak(utterance);
    };

    speakNextSentence();
  };

  const stopSpeechSynthesis = () => {
    if (synthRef.current) synthRef.current.cancel();
    if (voiceVolumeIntervalRef.current) clearInterval(voiceVolumeIntervalRef.current);
    setVoiceVolume(0);
  };

  // Connect to OpenRouter API (Universal client)
  const submitQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: queryText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsSending(true);

    if (isVoiceMode) {
      setVoiceState("thinking");
      stopSpeechSynthesis();
    }

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      })).slice(-12);
      history.push({ role: "user", content: queryText });

      const sysPrompt = LIGHTSTACK_CONTEXT + (isVoiceMode
        ? "\n\nIMPORTANT: This is a voice conversation. Keep your response to 1-2 short sentences. No lists, no markdown."
        : "");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: isVoiceMode ? 150 : 600,
          system: sysPrompt,
          messages: history,
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.content?.find((b: any) => b.type === "text")?.text || "I didn't get a response. Please try again.";

      const assistantMessage: Message = {
        role: "assistant",
        content: replyContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (isVoiceMode) {
        speakText(replyContent);
      }
    } catch (err: any) {
      console.error("Widget API Error:", err);
      
      const offlineReply = getOfflineSimulationResponse(queryText);
      const simulationMessage: Message = {
        role: "assistant",
        content: `[Offline Simulation Mode - pre-configured AI connection issue.]\n\n${offlineReply}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, simulationMessage]);
      toast.warning("API connection issue. Switch to simulation mode.");
      
      if (isVoiceMode) {
        speakText(offlineReply);
      }
    } finally {
      setIsSending(false);
    }
  };

  // Speech Recognition (STT)
  const startSpeechRecognition = () => {
    if (typeof window === "undefined" || isMuted) return;

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      toast.error("Speech recognition not supported in this browser.");
      return;
    }

    stopSpeechRecognitionOnly();

    const recognition = new SpeechRecognitionClass();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setVoiceState("listening");
      setVoiceTranscript("");
      setInterimTranscript("");
    };

    recognition.onresult = (event: any) => {
      let finalSpeech = "";
      let interimSpeech = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalSpeech += event.results[i][0].transcript;
        } else {
          interimSpeech += event.results[i][0].transcript;
        }
      }

      if (finalSpeech) {
        setVoiceTranscript(prev => (prev + " " + finalSpeech).trim());
      }
      setInterimTranscript(interimSpeech);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      
      const activeQuery = (voiceTranscript + " " + finalSpeech + " " + interimSpeech).trim();
      if (activeQuery.length > 3) {
        silenceTimerRef.current = setTimeout(() => {
          submitVoiceQuery(activeQuery);
        }, 1800);
      }
    };

    recognition.onend = () => {
      if (isVoiceMode && voiceState === "listening" && !isMuted) {
        try {
          recognition.start();
        } catch (e) {}
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error(err);
    }
  };

  const stopSpeechRecognitionOnly = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
  };

  const submitVoiceQuery = (query: string) => {
    stopSpeechRecognitionOnly();
    if (!query || query.trim().length < 2) {
      setVoiceState("listening");
      startSpeechRecognition();
      return;
    }
    submitQuery(query);
  };

  const handleEnterVoiceMode = () => {
    setIsVoiceMode(true);
    setVoiceState("listening");
    stopSpeechSynthesis();
    setTimeout(() => {
      if (!isMuted) startSpeechRecognition();
    }, 100);
  };

  const handleExitVoiceMode = () => {
    setIsVoiceMode(false);
    setVoiceState("idle");
    stopSpeechRecognitionOnly();
    stopSpeechSynthesis();
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopSpeechRecognitionOnly();
      setVoiceState("listening");
      setVoiceTranscript("");
      setInterimTranscript("");
    } else {
      setTimeout(() => startSpeechRecognition(), 100);
    }
  };


  const handleResetWidgetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Operational registers cleared. How can I assist you with Lightstack's systems today?",
        timestamp: new Date()
      }
    ]);
    stopSpeechSynthesis();
  };

  return (
    <>
      {/* Immersive Voice Mode Overlay */}
      <AnimatePresence>
        {isVoiceMode && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <AIVoiceVisualizer
              state={voiceState}
              transcript={voiceState === "speaking" ? voiceTranscript : (voiceTranscript || interimTranscript)}
              interimTranscript={voiceState === "listening" ? interimTranscript : ""}
              onStop={handleExitVoiceMode}
              isMuted={isMuted}
              onToggleMute={handleToggleMute}
              voiceVolume={voiceVolume}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger button */}
      <div className="fixed bottom-8 right-8 z-40 select-none">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              layoutId="widget-orb"
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-[#001c4a] hover:bg-primary border border-primary/20 hover:border-primary/50 text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 cursor-pointer relative overflow-hidden"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              title="Speak with Aletheia"
            >
              {/* Pulsing breathing background */}
              <span className="absolute inset-0 bg-primary/10 animate-ping [animation-duration:3s]"></span>
              <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Mini glassmorphic window */}
        <AnimatePresence>
          {isOpen && !isVoiceMode && (
            <motion.div
              layoutId="widget-window"
              className="fixed sm:absolute bottom-4 sm:bottom-0 right-4 sm:right-0 left-4 sm:left-auto w-auto sm:w-[380px] h-[75vh] sm:h-[550px] bg-white/90 backdrop-blur-xl border border-border shadow-2xl flex flex-col overflow-hidden z-50"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              {/* Blueprint lines on background */}
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.02] pointer-events-none"></div>

              {/* Widget Header */}
              <div className="px-5 py-4 border-b border-border bg-white flex justify-between items-center relative z-10 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-foreground">Aletheia</h4>
                    <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Lightstack AI</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetWidgetChat}
                    className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors"
                    title="Clear Widget registers"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-muted-foreground hover:text-foreground"
                    title="Close assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 bg-muted/[0.02] relative z-0"
              >
                {messages.map((m, idx) => {
                  const isAssistant = m.role === "assistant";
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
                    >
                      {isAssistant && (
                        <div className="w-6 h-6 flex-shrink-0 bg-primary text-white flex items-center justify-center font-bold text-[10px]">
                          A
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5 max-w-[85%]">
                        <div
                          className={`p-3.5 text-xs leading-relaxed ${
                            isAssistant
                              ? "bg-white border border-border text-foreground font-medium"
                              : "bg-primary text-white font-medium"
                          }`}
                        >
                          <p className="whitespace-pre-line">{m.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
                {isSending && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                    <div className="w-6 h-6 flex-shrink-0 bg-primary text-white flex items-center justify-center font-bold text-[10px] animate-pulse">
                      A
                    </div>
                    <div className="p-3 bg-white border border-border flex items-center gap-1 justify-center min-w-[60px]">
                      <span className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Compact Suggestions tags */}
              <div className="px-4 py-2 bg-white flex flex-col gap-1 border-t border-border flex-shrink-0">
                <div className="text-[8px] font-black uppercase text-muted-foreground/50 tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" /> Quick consultations
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  {MINI_SUGGESTIONS.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => submitQuery(s.query)}
                      className="text-left py-1.5 px-3 border border-border hover:border-primary bg-muted/10 hover:bg-primary/[0.01] text-[10px] font-bold text-foreground flex items-center justify-between uppercase tracking-wider group transition-all"
                    >
                      <span className="truncate">{s.label}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitQuery(inputText);
                }}
                className="p-3 border-t border-border bg-white flex gap-2.5 items-center flex-shrink-0 relative z-10"
              >
                <button
                  type="button"
                  onClick={handleEnterVoiceMode}
                  className="p-3 border border-border hover:bg-muted text-primary transition-all flex-shrink-0 active:scale-95"
                  title="Speak live"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask Aletheia about systems..."
                  className="flex-1 px-3 py-3 border border-border text-xs focus:outline-none focus:border-primary bg-muted/5 font-medium"
                  disabled={isSending}
                />

                <button
                  type="submit"
                  disabled={isSending || !inputText.trim()}
                  className="p-3 bg-primary text-white font-black text-xs hover:bg-primary/95 transition-all flex-shrink-0 flex items-center justify-center active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

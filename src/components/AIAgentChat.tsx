import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Mic, Volume2, VolumeX, Sparkles, Trash2, ArrowRight, 
  HelpCircle, Cpu, Globe, Layers, Smartphone, ChevronRight, X, Play, RefreshCw, Key
} from "lucide-react";
import { AIVoiceVisualizer } from "./AIVoiceVisualizer";
import { toast } from "sonner";

const MODEL = "claude-sonnet-4-20250514";
const API_URL = "https://api.anthropic.com/v1/messages";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp: Date;
}

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

const SUGGESTIONS = [
  { label: "What is the ADLC framework?", query: "Can you explain Lightstack's ADLC framework for Agentic AI?" },
  { label: "Tell me about your mobile apps", query: "What technical architecture does Lightstack use for native mobile apps?" },
  { label: "How fast are your systems?", query: "What operational latency and accuracy metrics do Lightstack systems guarantee?" },
  { label: "Book a technical architecture consultation", query: "I would like to contact Lightstack to discuss a custom enterprise architecture project." }
];

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
  return "I am Aletheia, Lightstack's AI consultant. The active OpenRouter API key has reached its credit limit, so I have initiated offline simulation mode. Ask me about our ADLC framework, enterprise architecture, custom web portals, native mobile apps, or support contacts!";
};

export function AIAgentChat() {
  // Chat history & inputs
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Welcome to Lightstack Technologies. I am Aletheia, your AI consultant. I can answer questions about our Agentic AI systems, enterprise software engineering capabilities, or walk you through our ADLC framework. Would you like to type, or enter Live Voice Mode to interact verbally?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Settings & configs
  
  // Voice Synthesis (TTS) settings
  const [speechRate, setSpeechRate] = useState(1.05);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // Live Voice Mode States
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [voiceTranscript, setVoiceTranscript] = useState(""); // Speech-to-Text dynamic buffer
  const [interimTranscript, setInterimTranscript] = useState(""); // Speech-to-Text active buffer
  const [voiceVolume, setVoiceVolume] = useState(0); // Fake volume animation during TTS

  // Refs for Web Speech & scroll sync
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const voiceVolumeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Populate browser voices
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Pick a natural English voice by default
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
  }, []);



  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, voiceTranscript]);

  // Clean TTS voice output synthesis helper
  const speakText = (text: string) => {
    if (!synthRef.current) return;
    
    // Stop any ongoing speech
    synthRef.current.cancel();
    if (voiceVolumeIntervalRef.current) clearInterval(voiceVolumeIntervalRef.current);
    setVoiceVolume(0);

    // Clean text: strip out markdown stars, links, brackets, and code blocks for spoken voice
    let cleanText = text
      .replace(/\*\*/g, "") // Bold
      .replace(/\*/g, "")  // Italic
      .replace(/```[\s\S]*?```/g, "[Code segment omitted]") // Code blocks
      .replace(/`([^`]+)`/g, "$1") // Inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Links
      .replace(/#+/g, "") // Headers
      .trim();

    if (!cleanText) return;

    // Split speech into manageable sentences (browsers perform better with short sentences)
    const sentences = cleanText.match(/[^.!?]+[.!?]+(\s|$)/g) || [cleanText];
    let sentenceIndex = 0;

    const speakNextSentence = () => {
      if (!synthRef.current || sentenceIndex >= sentences.length || !isVoiceMode) {
        // Speech completed! Return back to listening state
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
      
      // Select preferred voice
      const activeVoice = voices.find(v => v.name === selectedVoiceName);
      if (activeVoice) utterance.voice = activeVoice;
      
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setVoiceState("speaking");
        setVoiceTranscript(sentenceText); // Show active spoken text as subtitles

        // Simulate real voice volume fluctuations for Canvas visualizer
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

      utterance.onerror = (e) => {
        console.error("Speech Synthesis Error:", e);
        if (voiceVolumeIntervalRef.current) clearInterval(voiceVolumeIntervalRef.current);
        setVoiceVolume(0);
        sentenceIndex++;
        speakNextSentence();
      };

      synthRef.current.speak(utterance);
    };

    speakNextSentence();
  };

  // Stop current Speech Synthesis
  const stopSpeechSynthesis = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (voiceVolumeIntervalRef.current) {
      clearInterval(voiceVolumeIntervalRef.current);
    }
    setVoiceVolume(0);
  };

  // Connect to OpenRouter API (Universal client)
  const submitQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    // Add user message to log
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

      // Append new message
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

      // If in Voice Mode, speak the reply out loud!
      if (isVoiceMode) {
        speakText(replyContent);
      }
    } catch (err: any) {
      console.error("Lightstack API Error:", err);
      
      const offlineReply = getOfflineSimulationResponse(queryText);
      
      const simulationMessage: Message = {
        role: "assistant",
        content: `[Offline Simulation Mode - pre-configured AI connection issue.]\n\n${offlineReply}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, simulationMessage]);
      toast.warning("API connection issue. Initiated offline simulation mode.");
      
      if (isVoiceMode) {
        speakText(offlineReply);
      }
    } finally {
      setIsSending(false);
    }
  };

  // ----------------------------------------------------
  // SPEECH RECOGNITION (STT) PROCESS
  // ----------------------------------------------------
  const startSpeechRecognition = () => {
    if (typeof window === "undefined" || isMuted) return;

    // Check compatibility
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      toast.error("Web Speech Recognition not supported in this browser. Try Chrome, Edge, or Safari.");
      return;
    }

    // Stop existing instance
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

      // Auto-Submit on silence detection!
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      
      const activeQuery = (voiceTranscript + " " + finalSpeech + " " + interimSpeech).trim();
      if (activeQuery.length > 3) {
        silenceTimerRef.current = setTimeout(() => {
          // Submit query automatically
          submitVoiceQuery(activeQuery);
        }, 1800); // 1.8 seconds of silence trigger
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        toast.error("Microphone access blocked. Please enable mic permissions.");
        setIsMuted(true);
        setVoiceState("idle");
      }
    };

    recognition.onend = () => {
      // Auto-restart recognition if Voice Mode is active and we're not speaking or thinking
      if (isVoiceMode && voiceState === "listening" && !isMuted) {
        try {
          recognition.start();
        } catch (e) {
          // ignore double starts
        }
      }
    };

    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
    }
  };

  const stopSpeechRecognitionOnly = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  };

  // Submit voice transcript to OpenRouter
  const submitVoiceQuery = (query: string) => {
    stopSpeechRecognitionOnly();
    if (!query || query.trim().length < 2) {
      setVoiceState("listening");
      startSpeechRecognition();
      return;
    }
    submitQuery(query);
  };

  // Enter Live Voice Mode
  const handleEnterVoiceMode = () => {
    setIsVoiceMode(true);
    setVoiceState("listening");
    stopSpeechSynthesis();
    
    // Tiny delay to allow window state transition
    setTimeout(() => {
      if (!isMuted) {
        startSpeechRecognition();
      } else {
        setVoiceState("listening");
        setVoiceTranscript("");
      }
    }, 100);

    toast.info("Entering Live Voice Mode. Connect your microphone.");
  };

  // Exit Live Voice Mode
  const handleExitVoiceMode = () => {
    setIsVoiceMode(false);
    setVoiceState("idle");
    stopSpeechRecognitionOnly();
    stopSpeechSynthesis();
    toast.info("Returned to text chat dashboard.");
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    
    if (nextMuted) {
      stopSpeechRecognitionOnly();
      setVoiceState("listening");
      setVoiceTranscript("");
      setInterimTranscript("");
      toast.info("Microphone muted.");
    } else {
      toast.info("Microphone active.");
      setTimeout(() => {
        startSpeechRecognition();
      }, 100);
    }
  };

  // Reset chat thread
  const handleResetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Operational registers cleared. System calibrated. How can I assist you with Lightstack's architecture today?",
        timestamp: new Date()
      }
    ]);
    stopSpeechSynthesis();
    toast.success("Chat history cleared.");
  };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] py-32 bg-white text-[#001c4a] relative overflow-hidden font-sans">
      {/* Immersive Voice Mode Overlay */}
      <AnimatePresence>
        {isVoiceMode && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
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

      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Main Header grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-primary"></span>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Virtual AI Consultant
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
              TALK TO <span className="text-primary">ALETHEIA.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end gap-4">
            {/* Live voice mode button */}
            <button
              onClick={handleEnterVoiceMode}
              className="flex items-center gap-3 px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-primary/95 transition-all active:scale-95 shadow-md shadow-primary/20"
            >
              <Mic className="w-4 h-4" /> Live Voice Mode
            </button>
          </div>
        </div>

        {/* Main Chat Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block: Chat Feed */}
          <div className="lg:col-span-8 flex flex-col border border-border min-h-[550px] max-h-[700px] bg-muted/[0.05]">
            
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-border bg-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-black uppercase tracking-widest">Active Consultation Session</span>
              </div>

              <button
                onClick={handleResetChat}
                className="text-muted-foreground hover:text-red-500 transition-colors"
                title="Clear Consultation Registers"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Message scroll list */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {messages.map((m, idx) => {
                const isAssistant = m.role === "assistant";
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.25) }}
                    className={`flex gap-4 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant && (
                      <div className="w-8 h-8 flex-shrink-0 bg-primary text-white flex items-center justify-center font-bold text-xs select-none">
                        A
                      </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div
                        className={`p-5 text-sm md:text-base leading-relaxed ${
                          isAssistant
                            ? "bg-white border border-border text-foreground font-medium"
                            : "bg-primary text-white font-medium"
                        }`}
                      >
                        <p className="whitespace-pre-line">{m.content}</p>
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest text-muted-foreground/40 mt-1 ${isAssistant ? "text-left" : "text-right"}`}>
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {!isAssistant && (
                      <div className="w-8 h-8 flex-shrink-0 bg-foreground text-background flex items-center justify-center font-bold text-xs select-none">
                        U
                      </div>
                    )}
                  </motion.div>
                );
              })}
              {isSending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 justify-start"
                >
                  <div className="w-8 h-8 flex-shrink-0 bg-primary text-white flex items-center justify-center font-bold text-xs animate-pulse select-none">
                    A
                  </div>
                  <div className="p-5 bg-white border border-border max-w-[80%] flex items-center gap-1.5 min-w-[80px] justify-center">
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitQuery(inputText);
              }}
              className="p-4 border-t border-border bg-white flex gap-4 items-center"
            >
              <button
                type="button"
                onClick={handleEnterVoiceMode}
                className="p-4 border border-border hover:bg-muted text-primary hover:text-primary-foreground transition-all flex-shrink-0 active:scale-95"
                title="Enter voice consultation mode"
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Query Aletheia about systems, ADLC framework, mobile app capabilities..."
                className="flex-1 px-4 py-4 border border-border text-sm focus:outline-none focus:border-primary rounded-none h-14 bg-muted/10 font-medium"
                disabled={isSending}
              />

              <button
                type="submit"
                disabled={isSending || !inputText.trim()}
                className="px-6 py-4 bg-primary text-white font-black text-xs uppercase tracking-widest hover:bg-primary/95 transition-all h-14 flex-shrink-0 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
              >
                Send <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Block: Capabilities & Suggestions Cards */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Consultation Prompt Chips */}
            <div className="border border-border p-6 md:p-8 bg-white flex flex-col gap-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#001c4a]/50 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-primary" /> SUGGESTED SUBJECTS
              </h3>
              <div className="flex flex-col gap-3">
                {SUGGESTIONS.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputText(s.query);
                      submitQuery(s.query);
                    }}
                    className="w-full text-left p-4 border border-border hover:border-primary bg-muted/5 hover:bg-primary/[0.02] text-xs font-bold text-foreground leading-relaxed uppercase tracking-wider flex items-center justify-between gap-3 group transition-all"
                  >
                    <span>{s.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Corporate Tech Rigor Panel */}
            <div className="bg-foreground text-background p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="relative z-10 space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> ALETHEIA GROUNDING
                </h3>
                
                <p className="text-xs text-white/50 leading-relaxed font-medium">
                  Aletheia is grounded on the Lightstack corporate index. She answers with rigorous technical specifications and architectural details based on live services active on lightstackgroup.com.
                </p>

                <div className="h-px bg-white/10 my-4"></div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/5">
                      <Cpu className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-white/40">CORE STACK</div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">Governed Agentic AI</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/5">
                      <Layers className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-white/40">FRAMEWORK</div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">ADLC Orchestrations</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center border border-white/5">
                      <Smartphone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase text-white/40">ARCHITECTURES</div>
                      <div className="text-xs font-black text-white uppercase tracking-wider">Offline-First Mobile</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

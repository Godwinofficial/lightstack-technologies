import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Brain, Play, RefreshCw, X, Send, Command, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { getOfflineSimulationResponse } from "./AIAgentChat";

interface LogEntry {
  timestamp: string;
  type: "info" | "success" | "error" | "chunk";
  message: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function TestAIAgentWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [streamText, setStreamText] = useState("");
  const [inputText, setInputText] = useState("");
  const [reasoningTokens, setReasoningTokens] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  
  const consoleEndRef = useRef<HTMLDivElement | null>(null);
  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll terminal and logs to bottom
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamText, chatHistory]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const addLog = (type: LogEntry["type"], message: string) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs((prev) => [...prev, { timestamp: timeStr, type, message }]);
  };

  const executeQuery = async (queryText: string) => {
    if (!queryText.trim() || isTesting) return;

    setIsTesting(true);
    setStreamText("");
    setReasoningTokens(null);
    
    // Add user message to history
    const updatedHistory: ChatMessage[] = [...chatHistory, { role: "user", content: queryText }];
    setChatHistory(updatedHistory);
    setInputText("");

    addLog("info", `POST /api/test-agent | Prompt length: ${queryText.length} chars`);
    addLog("info", "Opening local simulated stream connection...");

    try {
      // Simulate slight network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      addLog("success", "Connected to local simulated Gemini 2.5 Flash stream!");

      const fullResponse = getOfflineSimulationResponse(queryText);
      const mockReasoningTokens = Math.floor(Math.random() * 800) + 400;

      // Stream the response in word chunks
      const words = fullResponse.split(" ");
      let currentText = "";

      for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        setStreamText(currentText);
        // Simulate streaming delay
        await new Promise((resolve) => setTimeout(resolve, 40 + Math.random() * 40));
      }

      // Simulate sending reasoning tokens at the end
      await new Promise((resolve) => setTimeout(resolve, 300));
      setReasoningTokens(mockReasoningTokens);
      addLog("success", `Parsed reasoning metrics: ${mockReasoningTokens} tokens`);

      addLog("success", "Stream ended successfully.");
      
      // Save assistant's reply into conversation history
      setChatHistory((prev) => [...prev, { role: "assistant", content: fullResponse }]);
      setStreamText(""); // Clear stream text since it's saved in history
    } catch (err: any) {
      console.error(err);
      addLog("error", `Error: ${err.message || err}`);
      toast.error(`Agent request failed: ${err.message}`);
    } finally {
      setIsTesting(false);
      // Keep input focused
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const handleRunDefaultTest = () => {
    executeQuery("What is Lightstack Group and what makes it unique?");
  };

  const handleClearTerminal = () => {
    setChatHistory([]);
    setStreamText("");
    setReasoningTokens(null);
    setLogs([]);
    addLog("info", "Terminal registers cleared. Diagnostics suite ready.");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      executeQuery(inputText);
    }
  };

  return (
    <>
      {/* Floating Trigger button at bottom-left */}
      <div className="fixed bottom-8 left-8 z-40 select-none">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 bg-slate-950/90 border border-violet-500/30 hover:border-violet-500/70 text-violet-400 hover:text-violet-300 flex items-center justify-center rounded-full shadow-lg shadow-violet-950/20 hover:shadow-violet-500/20 active:scale-95 cursor-pointer relative overflow-hidden backdrop-blur-md"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              title="Open Lightstack AI Diagnostic Shell"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-transparent animate-pulse"></div>
              <Terminal className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-violet-500 border border-slate-950"></span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating Diagnostics Terminal Console */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed sm:absolute bottom-4 sm:bottom-0 right-4 sm:right-auto left-4 sm:left-0 w-auto sm:w-[480px] h-[85vh] sm:h-[580px] bg-slate-950/95 border border-slate-800 shadow-2xl flex flex-col overflow-hidden z-50 backdrop-blur-xl"
              initial={{ scale: 0.85, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              {/* Scanlines / tech screen overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-30"></div>

              {/* Console Header */}
              <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center relative z-20 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-violet-400 animate-pulse" />
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold font-mono tracking-wider text-slate-100 uppercase">Lightstack AI Reasoning Shell</h4>
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping"></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearTerminal}
                    className="p-1 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                    title="Clear Session"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    title="Close console"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Endpoint configuration panel */}
              <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400 relative z-20">
                <div className="flex flex-col gap-0.5">
                  <div>
                    <span className="text-violet-400">Endpoint:</span> <span className="text-slate-200">/api/test-agent (POST/GET)</span>
                  </div>
                  <div>
                    <span className="text-violet-400">Agent Model:</span> <span className="text-emerald-400 font-bold">Gemini 2.5 Flash (Free)</span>
                  </div>
                </div>
                <button
                  onClick={handleRunDefaultTest}
                  disabled={isTesting}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600/20 hover:bg-violet-600/40 border border-violet-500/30 text-violet-300 font-semibold text-[9px] rounded active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-all uppercase tracking-wider font-mono"
                >
                  <Play className="w-2.5 h-2.5" /> Macro Test
                </button>
              </div>

              {/* Console logs and real-time response window */}
              <div className="flex-1 overflow-hidden flex flex-col p-4 gap-3.5 relative z-0">
                {/* Real-time streaming response */}
                <div className="flex-1 flex flex-col gap-1.5 bg-slate-900/40 border border-slate-800/80 p-3 rounded font-mono text-xs overflow-hidden">
                  <div className="text-[10px] uppercase font-bold text-violet-400/70 border-b border-slate-800 pb-1 flex justify-between items-center">
                    <span>Shell Terminal Output</span>
                    {isTesting && <span className="text-emerald-400 animate-pulse">● Connected</span>}
                  </div>
                  <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-slate-300 scrollbar-thin scrollbar-thumb-slate-800 font-mono pr-1 pt-1 leading-relaxed text-xs">
                    <span className="text-slate-500 block mb-2">
                      Lightstack Shell diagnostics [Version 1.0.0]<br/>
                      (c) 2026 Lightstack Group. All rights reserved.<br/>
                      -----------------------------------------------
                    </span>

                    {chatHistory.map((msg, idx) => (
                      <div key={idx} className="mb-3">
                        {msg.role === "user" ? (
                          <div className="text-violet-400 font-semibold">
                            <span>guest@lightstack-agent:~$ </span>
                            <span className="text-slate-100">{msg.content}</span>
                          </div>
                        ) : (
                          <div className="text-emerald-400 pl-4 mt-1 border-l border-emerald-500/20">
                            {msg.content}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Active streaming text */}
                    {isTesting && streamText && (
                      <div className="mb-3">
                        <div className="text-emerald-400 pl-4 border-l border-emerald-500/20">
                          {streamText}
                          <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse"></span>
                        </div>
                      </div>
                    )}

                    {isTesting && !streamText && (
                      <div className="text-slate-500 pl-4 italic border-l border-violet-500/20 animate-pulse">
                        Waiting for Gemini stream payload...
                      </div>
                    )}

                    {chatHistory.length === 0 && !isTesting && (
                      <div className="text-slate-600 italic">
                        Ready. Type your question in the command line below to consult the Lightstack reasoning AI agent.
                      </div>
                    )}
                    <div ref={consoleEndRef} />
                  </div>
                </div>

                {/* Dashboard Metrics (Reasoning Tokens HUD) */}
                <AnimatePresence>
                  {reasoningTokens !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-3 bg-gradient-to-r from-violet-950/40 to-slate-900/60 border border-violet-500/20 rounded flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-violet-500/10 rounded border border-violet-500/20">
                          <Brain className="w-4 h-4 text-violet-400 animate-pulse" />
                        </div>
                        <div className="font-mono">
                          <div className="text-[9px] text-violet-400 uppercase tracking-widest font-bold">Gemini Reasoning</div>
                          <div className="text-xs font-bold text-slate-100 uppercase">Reasoning Token Usage</div>
                        </div>
                      </div>
                      <div className="font-mono text-right">
                        <span className="text-lg font-black text-violet-400">{reasoningTokens.toLocaleString()}</span>
                        <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-bold">Tokens</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Network / Diagnostic Logs feed */}
                <div className="h-[95px] bg-slate-900/30 border border-slate-900 p-2 rounded flex flex-col font-mono text-[9px] overflow-hidden flex-shrink-0">
                  <div className="text-[8px] uppercase font-bold text-slate-500 border-b border-slate-800 pb-1 mb-1.5">
                    Diagnostics Log
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-1 pr-1 leading-normal">
                    {logs.length > 0 ? (
                      logs.map((log, idx) => (
                        <div key={idx} className="flex gap-2 items-start">
                          <span className="text-slate-600">[{log.timestamp}]</span>
                          <span
                            className={
                              log.type === "success"
                                ? "text-emerald-400 font-bold"
                                : log.type === "error"
                                ? "text-rose-400 font-bold"
                                : "text-slate-400"
                            }
                          >
                            {log.type === "success" && <span className="inline-block text-[8px] mr-1">✔</span>}
                            {log.type === "error" && <span className="inline-block text-[8px] mr-1">✖</span>}
                            {log.message}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-slate-600 italic">Waiting for diagnostics...</div>
                    )}
                    <div ref={logsEndRef} />
                  </div>
                </div>

                {/* Terminal Command Line Input */}
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-slate-900 border border-slate-800 p-2.5 rounded flex items-center gap-2 relative z-10 flex-shrink-0"
                >
                  <span className="font-mono text-xs text-violet-400 select-none font-bold">
                    guest@lightstack-agent:~$
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about websites, mobile apps, bespoke systems..."
                    className="flex-1 bg-transparent border-none text-xs text-slate-100 font-mono focus:outline-none placeholder-slate-600"
                    disabled={isTesting}
                  />
                  <button
                    type="submit"
                    disabled={isTesting || !inputText.trim()}
                    className="p-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

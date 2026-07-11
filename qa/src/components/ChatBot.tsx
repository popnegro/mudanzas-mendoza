import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { MessageSquare, X, Send, Sparkles, CornerDownLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const SUGGESTION_CHIPS = [
  '¿Cómo embalar una heladera?',
  '¿Hacen fletes de urgencia hoy?',
  '¿Qué pasa si sopla Viento Zonda?',
  '¿Cómo empacar platos y copas?'
];

export default function ChatBot({ isOpen, onClose, onOpen }: ChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Che, soy tu Asistente Virtual de Mudanzas Mendoza 2026. 🧉\n\n¿Te estás por mudar o necesitás un flete rápido? Consultame lo que quieras sobre cómo embalar, el viento zonda, ingresos a barrios privados o cómo armar tus cajas. ¡Te ayudo al toque!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6) // Send recent history for context
        })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: data.text || 'Disculpame, se me complicó el cableado un segundo. ¿Me repetís la pregunta o preferís hablar directo por WhatsApp?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat API Error:', error);
      const errMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'assistant',
        text: '¡Che! Hubo un detalle de conexión, pero no pasa nada. Escribinos un WhatsApp al toque y un asesor te ayuda con todo en un minuto.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence mode="popLayout">
        {/* Floating Chat Bubble Button */}
        {!isOpen && (
          <motion.button
            key="chat-bubble"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={onOpen}
            aria-label="Abrir asistente de IA"
            className="flex items-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold p-4 sm:px-5 sm:py-4 rounded-full shadow-2xl transition-all cursor-pointer group relative"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="hidden sm:inline-block text-sm tracking-wide">¿Dudas? Preguntá a la IA</span>
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </motion.button>
        )}

        {/* Expanded Chat Window */}
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[360px] sm:w-[400px] h-[540px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
          >
            {/* Header */}
            <div className="bg-slate-950 px-4 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg border border-amber-500/30">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    Asistente Mendoza 2026
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                      <Sparkles className="w-2.5 h-2.5" /> IA
                    </span>
                  </h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    Asesorando online
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/60 scrollbar-thin">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-semibold rounded-br-none'
                        : 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700/50'
                    }`}
                  >
                    {/* Clean up simple markdown asterisks in the chatbot UI for a professional feel */}
                    {msg.text.split('\n').map((line, lIdx) => {
                      let formatted = line;
                      const isBold = line.startsWith('**') && line.endsWith('**');
                      if (isBold) {
                        formatted = line.replace(/\*\*/g, '');
                        return <strong key={lIdx} className="block text-amber-400 my-1">{formatted}</strong>;
                      }
                      // Handle list items
                      if (line.trim().startsWith('* ')) {
                        return <span key={lIdx} className="block pl-3 border-l-2 border-amber-500/30 my-0.5 text-slate-300">{line.replace('* ', '• ')}</span>;
                      }
                      return <span key={lIdx} className="block">{formatted}</span>;
                    })}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 mr-auto bg-slate-800/50 border border-slate-800 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Escribiendo...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggestions chips */}
            <div className="px-3 py-2 bg-slate-950 border-t border-slate-800 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap">
              {SUGGESTION_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="inline-block bg-slate-800 hover:bg-slate-700 text-[10px] font-semibold text-slate-300 hover:text-white px-2.5 py-1.5 rounded-full border border-slate-700 transition-all cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribí acá tu duda..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none resize-none max-h-16"
              />
              <button
                onClick={() => handleSend(input)}
                aria-label="Enviar mensaje"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-xl transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

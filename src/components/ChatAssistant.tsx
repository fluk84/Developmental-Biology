import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatMode } from '../types';
import { 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  Loader2, 
  Search, 
  Brain, 
  Zap, 
  Globe, 
  Copy, 
  Check, 
  RotateCcw,
  Bot,
  User,
  ExternalLink
} from 'lucide-react';

interface ChatAssistantProps {
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

const SUGGESTED_QUESTIONS = [
  "อธิบายความแตกต่างระหว่าง Gastrulation และ Neurulation",
  "Totipotent, Pluripotent และ Multipotent ต่างกันอย่างไรในตัวอ่อน?",
  "Sonic Hedgehog (Shh) ควบคุมการสร้างแกนของรยางค์ (Limb bud) อย่างไร?",
  "ทำไมกรดโฟลิกจึงช่วยป้องกันภาวะ Spina bifida ในหญิงตั้งครรภ์?",
  "สรุป 4 ปัจจัยของ Yamanaka (iPSCs) และการนำมาใช้ในเวชศาสตร์ฟื้นฟู",
];

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: 'สวัสดีครับ! ผมคือ ดร. ไบโอเดฟ (Dr. BioDev) ผู้ช่วยอัจฉริยะด้านชีววิทยาพัฒนาการและคัพภวิทยา (Developmental Biology & Embryology)\n\nคุณสามารถสอบถามเกี่ยวกับกลไกการเจริญของตัวอ่อน, การแบ่งเซลล์, การกำหนดชะตากรรม, วิถีส่งสัญญาณโมเลกุล (Shh, Wnt, BMP), หรือความผิดปกติแต่กำเนิดได้ตลอดเวลาครับ',
      timestamp: new Date(),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [activeMode, setActiveMode] = useState<ChatMode>('thinking'); // default high thinking
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external initial prompt if passed
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputPrompt).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Build conversation history for the API
      const historyPayload = newHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          mode: activeMode,
          history: historyPayload,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'ไม่สามารถประมวลผลคำตอบได้');
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || 'ไม่มีข้อมูลตอบกลับ',
        timestamp: new Date(),
        modeUsed: activeMode,
        groundingChunks: data.groundingMetadata?.groundingChunks || [],
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: unknown) {
      const error = err as { message?: string };
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: `เกิดข้อผิดพลาด: ${error.message || 'โปรดตรวจสอบการเชื่อมต่อและลองใหม่อีกครั้ง'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Audio Recording & Transcription
  const handleToggleVoiceInput = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());

        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          setIsLoading(true);
          try {
            const transRes = await fetch('/api/gemini/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                audioBase64: base64Audio,
                mimeType: 'audio/webm',
              }),
            });
            const transData = await transRes.json();
            if (transRes.ok && transData.transcription) {
              setInputPrompt((prev) => (prev ? `${prev} ${transData.transcription}` : transData.transcription));
            }
          } catch (err) {
            console.error('Transcription error:', err);
          } finally {
            setIsLoading(false);
          }
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการเข้าถึงในเบราว์เซอร์');
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: 'เริ่มต้นบทสนทนาใหม่แล้วครับ มีประเด็นทางชีววิทยาพัฒนาการเรื่องใดที่ต้องการศึกษาเพิ่มเติมหรือไม่ครับ?',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[600px] bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Chat Header and Mode Selectors */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Dr. BioDev Gemini Chatbot</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                AI Expert
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              ผู้ช่วยค้นคว้า อธิบาย วิเคราะห์งานวิจัย และตอบคำถามคัพภวิทยา
            </div>
          </div>
        </div>

        {/* AI Modes Toggle: Thinking vs Fast vs Search Grounding */}
        <div className="flex items-center gap-1.5 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveMode('thinking')}
            id="chat-mode-thinking"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeMode === 'thinking'
                ? 'bg-white dark:bg-slate-70โ0 text-slate-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
            title="คิดวิเคราะห์เชิงลึก (High Thinking Level)"
          >
            <Brain className="w-3.5 h-3.5 text-violet-500" />
            <span>โหมดคิดวิเคราะห์ลึก</span>
          </button>

          <button
            onClick={() => setActiveMode('fast')}
            id="chat-mode-fast"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeMode === 'fast'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
            title="ตอบสนองฉับไว (Low Latency Flash-Lite)"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>ตอบไวพิเศษ</span>
          </button>

          <button
            onClick={() => setActiveMode('search')}
            id="chat-mode-search"
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              activeMode === 'search'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
            title="เชื่อมต่อฐานข้อมูล Google Search สำหรับงานวิจัยล่าสุด"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-500" />
            <span>สืบค้น Google สด</span>
          </button>

          <button
            onClick={handleResetChat}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-1 transition"
            title="ล้างการสนทนา"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700/60 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Grounding web sources if available */}
                {msg.groundingChunks && msg.groundingChunks.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/80 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-cyan-500" />
                      <span>แหล่งข้อมูลอ้างอิงจาก Google Search:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundingChunks.map((chunk, idx) => (
                        <a
                          key={idx}
                          href={chunk.web?.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 hover:underline border border-slate-200 dark:border-slate-600"
                        >
                          <span className="truncate max-w-[180px]">{chunk.web?.title || 'แหล่งข้อมูลอ้างอิง'}</span>
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer action */}
                {!isUser && (
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/40 text-[10px] text-slate-400">
                    <span>
                      {msg.modeUsed === 'thinking' && '🧠 High Thinking Processed'}
                      {msg.modeUsed === 'fast' && '⚡ Ultra Low-latency'}
                      {msg.modeUsed === 'search' && '🌐 Google Grounded'}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-500" />
                          <span>คัดลอกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>คัดลอกคำตอบ</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-xl mr-auto justify-start">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl rounded-bl-none p-3.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
              <span>
                {activeMode === 'thinking'
                  ? 'Dr. BioDev กำลังวิเคราะห์เหตุผลเชิงลึกทางชีววิทยาพัฒนาการ...'
                  : activeMode === 'search'
                  ? 'กำลังสืบค้นฐานข้อมูลทางวิทยาศาสตร์สดจาก Google Search...'
                  : 'กำลังประมวลผลคำตอบฉับไว...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/30 overflow-x-auto flex gap-2">
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Audio speech input */}
          <button
            type="button"
            onClick={handleToggleVoiceInput}
            className={`p-2.5 rounded-xl border transition ${
              isRecording
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
            title={isRecording ? 'หยุดบันทึกเสียง' : 'พูดคำถามด้วยไมโครโฟน (Audio Transcription)'}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            id="chat-input"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="พิมพ์คำถามชีววิทยาพัฒนาการ เช่น 'อธิบายบทบาทของ Notochord ในระยะ Neurulation'..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            id="chat-send-btn"
            disabled={!inputPrompt.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
          >
            <span>ส่ง</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

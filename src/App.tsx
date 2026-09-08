/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabKey } from './types';
import { Navbar } from './components/Navbar';
import { HeroOverview } from './components/HeroOverview';
import { StagesTimeline } from './components/StagesTimeline';
import { GermLayersMap } from './components/GermLayersMap';
import { CellFateSimulator } from './components/CellFateSimulator';
import { MolecularRegulation } from './components/MolecularRegulation';
import { ClinicalSignificance } from './components/ClinicalSignificance';
import { ChatAssistant } from './components/ChatAssistant';
import { QuizSection } from './components/QuizSection';
import { ImageAnalyzerModal } from './components/ImageAnalyzerModal';
import { DiagramGeneratorModal } from './components/DiagramGeneratorModal';
import { ExportPdfModal } from './components/ExportPdfModal';
import { GlossaryModal } from './components/GlossaryModal';
import { Dna, Printer, FileDown, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isImageAnalyzerOpen, setIsImageAnalyzerOpen] = useState<boolean>(false);
  const [isDiagramGeneratorOpen, setIsDiagramGeneratorOpen] = useState<boolean>(false);
  const [isExportPdfOpen, setIsExportPdfOpen] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [initialGlossaryTerm, setInitialGlossaryTerm] = useState<string | undefined>(undefined);
  const [isPrintFriendlyActive, setIsPrintFriendlyActive] = useState<boolean>(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);

  // Sync dark mode class with root html
  useEffect(() => {
    if (isDarkMode && !isPrintFriendlyActive) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, isPrintFriendlyActive]);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleTogglePrintFriendly = () => {
    setIsPrintFriendlyActive((prev) => !prev);
  };

  const handleOpenChatWithTopic = (topic: string) => {
    setChatInitialPrompt(topic);
    setActiveTab('chat');
  };

  const handleOpenGlossary = (termId?: string) => {
    setInitialGlossaryTerm(termId);
    setIsGlossaryOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isPrintFriendlyActive 
        ? 'bg-slate-100 text-slate-900 print-friendly-theme' 
        : 'bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'
    }`}>
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectTab={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isPrintFriendlyActive={isPrintFriendlyActive}
        onTogglePrintFriendly={handleTogglePrintFriendly}
        onOpenGlossary={() => handleOpenGlossary()}
        onOpenExportPdf={() => setIsExportPdfOpen(true)}
        onOpenImageAnalyzer={() => setIsImageAnalyzerOpen(true)}
        onOpenDiagramGenerator={() => setIsDiagramGeneratorOpen(true)}
      />

      {/* Print-Friendly Mode Sticky Notification Banner */}
      {isPrintFriendlyActive && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5 text-xs text-amber-900 dark:text-amber-200 no-print flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Printer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>กำลังแสดงผลใน <strong>โหมดเอกสารสำหรับพิมพ์และอ่านออฟไลน์ (Print-Friendly Study Mode)</strong>: ปรับโทนสีสว่าง คอนทราสต์คมชัดเพื่อการอ่านและการพิมพ์กระดาษ</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExportPdfOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-sm cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>ดาวน์โหลด PDF</span>
            </button>
            <button
              onClick={() => setIsPrintFriendlyActive(false)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer"
            >
              <span>กลับสู่โหมดปกติ</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Offline Study Bar above content */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 no-print flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>โมดูลการเรียน: <strong className="text-slate-800 dark:text-slate-200">{activeTab.toUpperCase()}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenGlossary()}
            id="btn-quick-open-glossary"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 transition text-xs font-semibold cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>คลังคำศัพท์ชีววิทยาพัฒนาการ (Glossary)</span>
          </button>
          <button
            onClick={() => setIsExportPdfOpen(true)}
            id="btn-quick-export-pdf"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition text-xs font-semibold cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>ส่งออกบทเรียนนี้เป็น PDF</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <HeroOverview
            onNavigate={setActiveTab}
            onOpenChatWithTopic={handleOpenChatWithTopic}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'stages' && (
          <StagesTimeline 
            onAskAI={handleOpenChatWithTopic}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'germ-layers' && (
          <GermLayersMap 
            onAskAI={handleOpenChatWithTopic}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'fate-simulator' && (
          <CellFateSimulator onAskAI={handleOpenChatWithTopic} />
        )}

        {activeTab === 'molecular' && (
          <MolecularRegulation 
            onAskAI={handleOpenChatWithTopic}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'clinical' && (
          <ClinicalSignificance 
            onAskAI={handleOpenChatWithTopic}
            onOpenGlossary={handleOpenGlossary}
          />
        )}

        {activeTab === 'chat' && (
          <ChatAssistant
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt(null)}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizSection onAskAI={handleOpenChatWithTopic} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <Dna className="w-4 h-4 text-emerald-500" />
            <span>ชีววิทยาพัฒนาการ: กระบวนการและกลไกการพัฒนาของสิ่งมีชีวิต</span>
          </div>
          <div>
            แพลตฟอร์มการเรียนรู้และวิจัยชีววิทยาเชิงโต้ตอบ • ขับเคลื่อนด้วย Google Gemini API
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => {
          setIsGlossaryOpen(false);
          setInitialGlossaryTerm(undefined);
        }}
        onOpenChatWithTopic={handleOpenChatWithTopic}
        initialTermId={initialGlossaryTerm}
      />

      <ExportPdfModal
        isOpen={isExportPdfOpen}
        onClose={() => setIsExportPdfOpen(false)}
        activeTab={activeTab}
        isPrintFriendlyActive={isPrintFriendlyActive}
        onTogglePrintFriendly={handleTogglePrintFriendly}
      />

      <ImageAnalyzerModal
        isOpen={isImageAnalyzerOpen}
        onClose={() => setIsImageAnalyzerOpen(false)}
        onAskAIWithResult={(text) => handleOpenChatWithTopic(text)}
      />

      <DiagramGeneratorModal
        isOpen={isDiagramGeneratorOpen}
        onClose={() => setIsDiagramGeneratorOpen(false)}
      />
    </div>
  );
}


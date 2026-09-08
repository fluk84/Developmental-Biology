import React from 'react';
import { TabKey } from '../types';
import { 
  BookOpen, 
  GitMerge, 
  Layers, 
  Dna, 
  FlaskConical, 
  Stethoscope, 
  HelpCircle, 
  MessageSquare, 
  Sparkles, 
  Camera, 
  Image as ImageIcon,
  Sun,
  Moon,
  FileDown,
  Printer
} from 'lucide-react';

interface NavbarProps {
  activeTab: TabKey;
  setActiveTab?: (tab: TabKey) => void;
  onSelectTab?: (tab: TabKey) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  isPrintFriendlyActive?: boolean;
  onTogglePrintFriendly?: () => void;
  onOpenGlossary: () => void;
  onOpenExportPdf: () => void;
  onOpenImageAnalyzer: () => void;
  onOpenDiagramGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode,
  isPrintFriendlyActive,
  onTogglePrintFriendly,
  onOpenGlossary,
  onOpenExportPdf,
  onOpenImageAnalyzer,
  onOpenDiagramGenerator
}) => {
  const handleSelectTab = (tab: TabKey) => {
    if (onSelectTab) {
      onSelectTab(tab);
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  const tabs: Array<{ id: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'overview', label: 'บทคัดย่อ & บทนำ', icon: BookOpen },
    { id: 'stages', label: 'ระยะการเจริญ (Stages)', icon: GitMerge },
    { id: 'germ-layers', label: 'เนื้อเยื่อ 3 ชั้น & อวัยวะ', icon: Layers },
    { id: 'molecular', label: 'กลไกโมเลกุล & ยีน', icon: Dna },
    { id: 'fate-simulator', label: 'ห้องทดลองเซลล์ (Simulator)', icon: FlaskConical },
    { id: 'clinical', label: 'การแพทย์ & เคสศึกษา', icon: Stethoscope },
    { id: 'quiz', label: 'แบบทดสอบความรู้', icon: HelpCircle },
    { id: 'chat', label: 'ถาม AI (Dr. BioDev)', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Main Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleSelectTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <Dna className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">ชีววิทยาพัฒนาการ</span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Developmental Biology
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">กระบวนการและกลไกการพัฒนาของสิ่งมีชีวิต</p>
            </div>
          </div>

          {/* Quick AI Action Buttons & Theme Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenImageAnalyzer}
              id="nav-btn-analyzer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm"
              title="วิเคราะห์ภาพตัวอ่อนหรือสไลด์เนื้อเยื่อด้วย Gemini Vision"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">วิเคราะห์ภาพตัวอ่อน</span>
              <span className="sm:hidden">วิเคราะห์ภาพ</span>
            </button>

            <button
              onClick={onOpenDiagramGenerator}
              id="nav-btn-diagram-gen"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm"
              title="สร้างภาพวาดทางวิทยาศาสตร์พร้อมเลือกสัดส่วนภาพ"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">สร้างภาพประกอบ</span>
              <span className="sm:hidden">สร้างภาพ</span>
            </button>

            <button
              onClick={onOpenGlossary}
              id="nav-btn-glossary"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 transition shadow-sm cursor-pointer"
              title="เปิดคลังคำศัพท์ชีววิทยาพัฒนาการ พร้อมระบบค้นคว้าข้อมูลล่าสุดด้วย Google Search Grounding"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">คลังคำศัพท์</span>
              <span className="sm:hidden">คำศัพท์</span>
            </button>

            <button
              onClick={onOpenExportPdf}
              id="nav-btn-export-pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 transition shadow-sm cursor-pointer"
              title="ส่งออกบทเรียนปัจจุบันหรือเนื้อหาทั้งหมดเป็นเอกสาร PDF สำหรับอ่านออฟไลน์"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">ส่งออก PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            {onTogglePrintFriendly && (
              <button
                onClick={onTogglePrintFriendly}
                id="nav-btn-print-friendly"
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition shadow-sm cursor-pointer ${
                  isPrintFriendlyActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title={isPrintFriendlyActive ? 'ปิดโหมดเอกสารสำหรับพิมพ์' : 'เปิดโหมดเอกสารสำหรับพิมพ์/อ่านแบบเปเปอร์'}
              >
                <Printer className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">{isPrintFriendlyActive ? 'โหมดพิมพ์: เปิด' : 'โหมดพิมพ์'}</span>
              </button>
            )}

            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                id="nav-btn-darkmode"
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm"
                title={isDarkMode ? 'เปลี่ยนเป็นธีมสว่าง' : 'เปลี่ยนเป็นธีมมืด'}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-300" />}
              </button>
            )}

            <button
              onClick={() => handleSelectTab('chat')}
              id="nav-btn-chat"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition shadow-sm ${
                activeTab === 'chat'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dr. BioDev AI</span>
            </button>
          </div>
        </div>

        {/* Scrollable navigation tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-800/80 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => handleSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

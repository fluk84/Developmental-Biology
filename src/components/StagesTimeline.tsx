import React, { useState } from 'react';
import { STAGES_DATA } from '../data/developmentalData';
import { StageInfo } from '../types';
import { GlossaryText, GlossaryTerm } from './GlossaryText';
import { GlossaryPopover } from './GlossaryPopover';
import { 
  GitMerge, 
  Clock, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

interface StagesTimelineProps {
  onAskAI: (question: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const StagesTimeline: React.FC<StagesTimelineProps> = ({ onAskAI, onOpenGlossary }) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(3); // default Blastocyst
  const currentStage: StageInfo = STAGES_DATA[selectedStageIndex];

  // Helper to render responsive SVG diagram for each embryonic stage
  const renderStageDiagram = (type: StageInfo['diagramType']) => {
    switch (type) {
      case 'zygote':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-48 sm:h-56">
            <defs>
              <radialGradient id="zygoteGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.15" />
              </radialGradient>
            </defs>
            {/* Zona Pellucida */}
            <circle cx="150" cy="120" r="95" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="6 3" />
            <circle cx="150" cy="120" r="85" fill="url(#zygoteGrad)" stroke="#059669" strokeWidth="2" />
            {/* Polar bodies */}
            <circle cx="215" cy="80" r="10" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
            <text x="230" y="85" fontSize="10" fill="#047857" fontWeight="bold">Polar body</text>
            {/* Pronuclei */}
            <circle cx="130" cy="120" r="22" fill="#6ee7b7" stroke="#047857" strokeWidth="2" />
            <circle cx="170" cy="120" r="22" fill="#6ee7b7" stroke="#047857" strokeWidth="2" />
            <text x="120" y="124" fontSize="11" fill="#064e3b" fontWeight="bold">♀</text>
            <text x="165" y="124" fontSize="11" fill="#064e3b" fontWeight="bold">♂</text>
            <text x="150" y="195" textAnchor="middle" fontSize="12" fill="#047857" fontWeight="600">
              ไซโกต (Totipotent Zygote)
            </text>
          </svg>
        );
      case 'cleavage':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-48 sm:h-56">
            <circle cx="150" cy="120" r="95" fill="none" stroke="#0d9488" strokeWidth="6" strokeDasharray="6 3" />
            {/* 4 blastomeres visible */}
            <g transform="translate(150, 120)">
              <circle cx="-38" cy="-38" r="42" fill="#5eead4" fillOpacity="0.5" stroke="#0f766e" strokeWidth="2" />
              <circle cx="38" cy="-38" r="42" fill="#5eead4" fillOpacity="0.5" stroke="#0f766e" strokeWidth="2" />
              <circle cx="-38" cy="38" r="42" fill="#5eead4" fillOpacity="0.5" stroke="#0f766e" strokeWidth="2" />
              <circle cx="38" cy="38" r="42" fill="#5eead4" fillOpacity="0.5" stroke="#0f766e" strokeWidth="2" />
              <circle cx="-38" cy="-38" r="8" fill="#0f766e" />
              <circle cx="38" cy="-38" r="8" fill="#0f766e" />
              <circle cx="-38" cy="38" r="8" fill="#0f766e" />
              <circle cx="38" cy="38" r="8" fill="#0f766e" />
            </g>
            <text x="150" y="210" textAnchor="middle" fontSize="12" fill="#0f766e" fontWeight="600">
              บลาสโตเมียร์ 4 เซลล์ (Cleavage)
            </text>
          </svg>
        );
      case 'morula':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-48 sm:h-56">
            <circle cx="150" cy="120" r="95" fill="none" stroke="#06b6d4" strokeWidth="6" strokeDasharray="6 3" />
            {/* Cluster of tightly packed cells */}
            <g transform="translate(150, 120)">
              {[-45, 0, 45].map((x, i) =>
                [-45, 0, 45].map((y, j) => {
                  if (Math.sqrt(x * x + y * y) <= 65) {
                    return (
                      <g key={`${i}-${j}`}>
                        <circle cx={x} cy={y} r="24" fill="#67e8f9" fillOpacity="0.6" stroke="#0891b2" strokeWidth="2" />
                        <circle cx={x} cy={y} r="5" fill="#0e7490" />
                      </g>
                    );
                  }
                  return null;
                })
              )}
            </g>
            <text x="150" y="210" textAnchor="middle" fontSize="12" fill="#0e7490" fontWeight="600">
              Compacted Morula (ผลหม่อน 16-32 เซลล์)
            </text>
          </svg>
        );
      case 'blastocyst':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-48 sm:h-56">
            {/* Trophoblast ring */}
            <circle cx="150" cy="120" r="88" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            {/* Blastocoel cavity */}
            <path d="M 90,130 Q 150,195 210,130 Q 150,65 90,130 Z" fill="#bae6fd" opacity="0.4" />
            {/* Inner Cell Mass (ICM) cluster at top */}
            <g transform="translate(150, 80)">
              <circle cx="-20" cy="-10" r="16" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
              <circle cx="0" cy="-15" r="17" fill="#0369a1" stroke="#075985" strokeWidth="1.5" />
              <circle cx="20" cy="-10" r="16" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
              <circle cx="-10" cy="8" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
              <circle cx="10" cy="8" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            </g>
            {/* Labels */}
            <line x1="150" y1="80" x2="230" y2="55" stroke="#0369a1" strokeWidth="1.5" />
            <text x="235" y="55" fontSize="10" fill="#0369a1" fontWeight="bold">Inner Cell Mass (ICM)</text>
            <line x1="75" y1="130" x2="35" y2="150" stroke="#0284c7" strokeWidth="1.5" />
            <text x="35" y="165" fontSize="10" fill="#0284c7" fontWeight="bold">Trophoblast</text>
            <text x="150" y="160" textAnchor="middle" fontSize="11" fill="#075985" fontWeight="bold">
              Blastocoel
            </text>
            <text x="150" y="215" textAnchor="middle" fontSize="12" fill="#0369a1" fontWeight="600">
              บลาสโตซิสต์ (Blastocyst - Day 5)
            </text>
          </svg>
        );
      case 'gastrula':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-48 sm:h-56">
            {/* 3 Germ Layers in cross section */}
            {/* Ectoderm (Blue top) */}
            <path d="M 60,85 Q 150,55 240,85 L 240,105 Q 150,75 60,105 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            {/* Mesoderm (Orange middle) with primitive streak invagination */}
            <path d="M 60,108 Q 150,78 240,108 L 240,128 Q 150,98 60,128 Z" fill="#fb923c" stroke="#ea580c" strokeWidth="2" />
            {/* Invaginating arrow */}
            <path d="M 150,65 L 150,115" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow)" />
            {/* Endoderm (Red bottom) */}
            <path d="M 60,131 Q 150,101 240,131 L 240,151 Q 150,121 60,151 Z" fill="#f87171" stroke="#dc2626" strokeWidth="2" />
            {/* Labels */}
            <text x="248" y="95" fontSize="10" fill="#0284c7" fontWeight="bold">Ectoderm</text>
            <text x="248" y="118" fontSize="10" fill="#ea580c" fontWeight="bold">Mesoderm</text>
            <text x="248" y="141" fontSize="10" fill="#dc2626" fontWeight="bold">Endoderm</text>
            <text x="150" y="190" textAnchor="middle" fontSize="11" fill="#4338ca" fontWeight="bold">
              Primitive Streak & EMT
            </text>
            <text x="150" y="215" textAnchor="middle" fontSize="12" fill="#3730a3" fontWeight="600">
              แกสตรูเลชัน (Gastrulation)
            </text>
          </svg>
        );
      case 'neurula':
        return (
          <svg viewBox="0 0 300 240" className="w-full h-48 sm:h-56">
            {/* Neural tube closed ring */}
            <circle cx="150" cy="95" r="28" fill="#818cf8" stroke="#4f46e5" strokeWidth="2.5" />
            <circle cx="150" cy="95" r="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            {/* Neural Crest cells on flanks */}
            <circle cx="112" cy="78" r="8" fill="#a855f7" />
            <circle cx="188" cy="78" r="8" fill="#a855f7" />
            {/* Somites on left and right */}
            <rect x="80" y="105" width="28" height="36" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            <rect x="192" y="105" width="28" height="36" rx="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            {/* Notochord underneath */}
            <circle cx="150" cy="145" r="12" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
            {/* Ectoderm covering */}
            <path d="M 50,75 Q 150,40 250,75" fill="none" stroke="#38bdf8" strokeWidth="3" />
            {/* Labels */}
            <text x="150" y="60" textAnchor="middle" fontSize="10" fill="#4f46e5" fontWeight="bold">Neural Tube</text>
            <text x="65" y="125" fontSize="9" fill="#d97706" fontWeight="bold">Somite</text>
            <text x="150" y="172" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="bold">Notochord</text>
            <text x="150" y="215" textAnchor="middle" fontSize="12" fill="#4338ca" fontWeight="600">
              การสร้างหลอดประสาทและโซไมท์ (Neurulation)
            </text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Stage Navigator Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <GitMerge className="w-4 h-4" />
              <span>ลำดับขั้นตอนการเกิดตัวอ่อน (Embryogenesis Timeline)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              6 ระยะสำคัญของการพัฒนาการ (Key Developmental Stages)
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedStageIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedStageIndex === 0}
              id="stage-nav-prev"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="ระยะก่อนหน้า"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              ระยะที่ {selectedStageIndex + 1} จาก {STAGES_DATA.length}
            </span>
            <button
              onClick={() => setSelectedStageIndex((prev) => Math.min(STAGES_DATA.length - 1, prev + 1))}
              disabled={selectedStageIndex === STAGES_DATA.length - 1}
              id="stage-nav-next"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="ระยะถัดไป"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Timeline Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-6">
          {STAGES_DATA.map((stage, idx) => {
            const isSelected = selectedStageIndex === idx;
            return (
              <button
                key={stage.id}
                id={`stage-btn-${idx}`}
                onClick={() => setSelectedStageIndex(idx)}
                className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm ring-2 ring-emerald-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-[11px] font-bold text-slate-400">ระยะที่ {idx + 1}</span>
                <span className="text-xs font-bold truncate mt-0.5">{stage.nameEn}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{stage.timeframe}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Detailed Interactive Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Diagram */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              แผนภาพจำลองโครงสร้าง
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentStage.timeframe}
            </span>
          </div>

          <div className="w-full flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
            {renderStageDiagram(currentStage.diagramType)}
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg">
              <div className="text-[11px] text-slate-400">จำนวนเซลล์</div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">{currentStage.cellCount}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg">
              <div className="text-[11px] text-slate-400">ศักยภาพเซลล์</div>
              <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                <GlossaryPopover 
                  term={selectedStageIndex <= 1 ? 'Totipotent' : selectedStageIndex <= 3 ? 'Pluripotent' : 'Multipotent'}
                  onOpenChatWithTopic={onAskAI}
                  onOpenFullGlossary={onOpenGlossary}
                >
                  {selectedStageIndex <= 1 ? 'Totipotent' : selectedStageIndex <= 3 ? 'Pluripotent' : 'Multipotent'}
                </GlossaryPopover>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Explanation & Molecular Drivers */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <GlossaryPopover
                    term={currentStage.nameEn}
                    onOpenChatWithTopic={onAskAI}
                    onOpenFullGlossary={onOpenGlossary}
                  >
                    <span>{currentStage.nameTh}</span>
                  </GlossaryPopover>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                  {currentStage.nameEn}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {onOpenGlossary && (
                  <button
                    onClick={() => onOpenGlossary(currentStage.nameEn.toLowerCase())}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-medium hover:bg-teal-100 transition"
                    title="เปิดนิยามในคลังคำศัพท์"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span className="hidden sm:inline">คลังศัพท์</span>
                  </button>
                )}
                <button
                  onClick={() => onAskAI(`ช่วยอธิบายกลไกและเหตุการณ์สำคัญในระยะ "${currentStage.nameEn}" (${currentStage.nameTh}) อย่างละเอียด พร้อมตัวอย่างความผิดปกติที่อาจเกิดขึ้น`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ถาม AI เชิงลึก</span>
                </button>
              </div>
            </div>

            <div className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              <GlossaryText
                text={currentStage.description}
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>

            {/* Key Events Checklist */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>เหตุการณ์สำคัญระดับเซลล์ (Key Cellular Events)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentStage.keyEvents.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div className="leading-snug">
                      <GlossaryText
                        text={evt}
                        onOpenChatWithTopic={onAskAI}
                        onOpenFullGlossary={onOpenGlossary}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Molecular Drivers / Genes */}
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-500" />
                <span>โมเลกุลและยีนควบคุมหลัก (Molecular Drivers)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentStage.molecularDrivers.map((driver, idx) => (
                  <GlossaryPopover
                    key={idx}
                    term={driver}
                    onOpenChatWithTopic={onAskAI}
                    onOpenFullGlossary={onOpenGlossary}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 transition"
                  >
                    {driver}
                  </GlossaryPopover>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

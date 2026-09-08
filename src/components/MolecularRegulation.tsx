import React, { useState } from 'react';
import { SIGNALING_PATHWAYS } from '../data/developmentalData';
import { SignalingPathway } from '../types';
import { GlossaryText, GlossaryTerm } from './GlossaryText';
import { GlossaryPopover } from './GlossaryPopover';
import { 
  Dna, 
  Sparkles, 
  Share2, 
  AlertTriangle, 
  Layers, 
  CheckCircle2,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface MolecularRegulationProps {
  onAskAI: (question: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const MolecularRegulation: React.FC<MolecularRegulationProps> = ({ onAskAI, onOpenGlossary }) => {
  const [selectedPathwayId, setSelectedPathwayId] = useState<string>('shh');
  const currentPathway = SIGNALING_PATHWAYS.find((p) => p.id === selectedPathwayId) || SIGNALING_PATHWAYS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Principles Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="max-w-3xl space-y-2 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Dna className="w-4 h-4" />
            <span>การควบคุมระดับโมเลกุลและพันธุกรรม (Molecular & Genetic Regulation)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            การแสดงออกของยีนที่แตกต่างกัน (Differential Gene Expression)
          </h2>
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <GlossaryText
              text='แม้เซลล์แทบทั้งหมดในร่างกายจะมีรหัสพันธุกรรม DNA เดียวกัน แต่การควบคุมให้ยีนบางชุด "เปิด" หรือ "ปิด" ในเวลาและสถานที่ที่เหมาะสม (Spatiotemporal regulation) ผ่านปัจจัยควบคุมการถอดรหัสและโครงข่ายสัญญาณเคมี คือหัวใจสำคัญของชีววิทยาพัฒนาการ'
              onOpenChatWithTopic={onAskAI}
              onOpenFullGlossary={onOpenGlossary}
            />
          </div>
        </div>

        {/* 3 Molecular Mechanisms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">
              1. ปัจจัยควบคุมการถอดรหัส (Transcription Factors)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <GlossaryText
                text="โปรตีนที่เข้าจับกับ Enhancer หรือ Promoter เพื่อเปิดหรือยับยั้งยีนเป้าหมาย เช่น Oct4, Sox2, Nanog, Pax6 และ MyoD"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-1">
              2. วิถีส่งสัญญาณระหว่างเซลล์ (Cell-Cell Signaling)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <GlossaryText
                text="Ligand เช่น Wnt, Shh, BMP, FGF จับกับตัวรับบนเยื่อหุ้มเซลล์ ส่งต่อสัญญาณผ่าน Cytoplasm เข้าสู่ Nucleus เพื่อเปลี่ยนชะตากรรมเซลล์"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="text-violet-600 dark:text-violet-400 font-bold text-sm mb-1">
              3. การควบคุมเหนือพันธุกรรม (Epigenetics)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <GlossaryText
                text="DNA Methylation และการดัดแปลง Histone ที่ทำให้เซลล์สามารถ 'จดจำ' ความจำเพาะของตนเองและถ่ายทอดต่อไปยังเซลล์ลูกได้"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pathways Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Pathway Buttons */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
            5 วิถีส่งสัญญาณหลักในตัวอ่อน
          </div>
          {SIGNALING_PATHWAYS.map((pathway: SignalingPathway) => {
            const isSelected = pathway.id === selectedPathwayId;
            return (
              <button
                key={pathway.id}
                onClick={() => setSelectedPathwayId(pathway.id)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm ring-1 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold">{pathway.name}</div>
                  <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{pathway.fullName}</div>
                </div>
                <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-500' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Column: Pathway Details */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Developmental Signaling Pathway
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <GlossaryPopover
                  term={currentPathway.name}
                  onOpenChatWithTopic={onAskAI}
                  onOpenFullGlossary={onOpenGlossary}
                >
                  <span>{currentPathway.fullName}</span>
                </GlossaryPopover>
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {onOpenGlossary && (
                <button
                  onClick={() => onOpenGlossary(currentPathway.name.toLowerCase())}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition"
                  title="เปิดในคลังคำศัพท์"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">คลังศัพท์</span>
                </button>
              )}
              <button
                onClick={() => onAskAI(`ช่วยอธิบายกลไก Cascade ของสัญญาณ ${currentPathway.name} (${currentPathway.fullName}) อย่างละเอียด ตั้งแต่ Ligand จนถึง Target genes`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>เจาะลึกด้วย AI</span>
              </button>
            </div>
          </div>

          {/* Role in Development */}
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-emerald-500" />
              <span>บทบาทสำคัญต่อการพัฒนาการของตัวอ่อน (Developmental Function)</span>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <GlossaryText
                text={currentPathway.roleInDevelopment}
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          {/* Key Components and Target Genes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                โมเลกุลในวิถี (Key Components / Ligands / Receptors):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentPathway.keyMolecules.map((mol, idx) => (
                  <GlossaryPopover
                    key={idx}
                    term={mol}
                    onOpenChatWithTopic={onAskAI}
                    onOpenFullGlossary={onOpenGlossary}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono border border-slate-200 dark:border-slate-600"
                  >
                    {mol}
                  </GlossaryPopover>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                ยีนเป้าหมายหลัก (Target Genes):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentPathway.targetGenes.map((gene, idx) => (
                  <GlossaryPopover
                    key={idx}
                    term={gene}
                    onOpenChatWithTopic={onAskAI}
                    onOpenFullGlossary={onOpenGlossary}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-mono border border-emerald-200 dark:border-emerald-800 font-bold"
                  >
                    {gene}
                  </GlossaryPopover>
                ))}
              </div>
            </div>
          </div>

          {/* Clinical & Pathological Relevance */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-1.5">
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>ความเชื่อมโยงทางการแพทย์และโรค (Clinical & Disease Relevance):</span>
            </div>
            <div className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
              <GlossaryText
                text={currentPathway.clinicalRelevance}
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

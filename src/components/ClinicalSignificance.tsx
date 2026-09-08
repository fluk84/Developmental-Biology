import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/developmentalData';
import { CaseStudy } from '../types';
import { GlossaryText, GlossaryTerm } from './GlossaryText';
import { GlossaryPopover } from './GlossaryPopover';
import { 
  Stethoscope, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  HelpCircle,
  Dna,
  HeartPulse,
  BookOpen
} from 'lucide-react';

interface ClinicalSignificanceProps {
  onAskAI: (question: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const ClinicalSignificance: React.FC<ClinicalSignificanceProps> = ({ onAskAI, onOpenGlossary }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);
  const activeCase: CaseStudy = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Stethoscope className="w-4 h-4" />
          <span>การประยุกต์ใช้ทางการแพทย์และเวชศาสตร์ฟื้นฟู (Clinical & Regenerative Medicine)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          ความสำคัญและการประยุกต์ใช้ชีววิทยาพัฒนาการ
        </h2>
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2 max-w-3xl">
          <GlossaryText
            text="การทำความเข้าใจกลไกตัวอ่อนวิทยาช่วยให้นักวิจัยสามารถสร้างอวัยวะจำลอง (Organoids), เปลี่ยนเซลล์ร่างกายกลับเป็นสเต็มเซลล์ (iPSCs), ค้นหาสาเหตุของความผิดปกติแต่กำเนิด (Congenital anomalies) และทดสอบความปลอดภัยของยาต่อทารกในครรภ์"
            onOpenChatWithTopic={onAskAI}
            onOpenFullGlossary={onOpenGlossary}
          />
        </div>

        {/* 3 Medical Breakthroughs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1">
              <Dna className="w-4 h-4 text-emerald-500" />
              <GlossaryPopover
                term="iPSC (Induced Pluripotent Stem Cells)"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              >
                <span>สเต็มเซลล์ไอพีเอส (iPSCs)</span>
              </GlossaryPopover>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <GlossaryText
                text="การชักนำเซลล์ผิวหนังของผู้ป่วยกลับสู่สภาพ Pluripotent ด้วย Yamanaka factors (Oct4, Sox2, Klf4, c-Myc) เพื่อเพาะเนื้อเยื่อรักษาโรคเฉพาะบุคคล"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1">
              <HeartPulse className="w-4 h-4 text-cyan-500" />
              <GlossaryPopover
                term="Organoid"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              >
                <span>เทคโนโลยีออร์แกนอยด์ (Organoids)</span>
              </GlossaryPopover>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <GlossaryText
                text="การสร้างอวัยวะจิ๋ว 3 มิติในหลอดทดลอง เช่น สมองจิ๋ว ตับจิ๋ว ลำไส้จิ๋ว เพื่อทดสอบยาและศึกษากลไกการติดเชื้อโดยไม่ต้องใช้สัตว์ทดลอง"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-1">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <GlossaryPopover
                term="Teratogen"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              >
                <span>พิษวิทยาต่อตัวอ่อน (Teratology)</span>
              </GlossaryPopover>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <GlossaryText
                text="การระบุสารก่อวิรูป (Teratogens) เช่น แอลกอฮอล์ ยาบางชนิด สารเคมี และไวรัส เพื่อปกป้องทารกในครรภ์ช่วงสร้างอวัยวะ (สัปดาห์ที่ 3-8)"
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Clinical Cases Explorer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <span>กรณีศึกษาความผิดปกติแต่กำเนิด (Developmental Case Studies)</span>
          </h3>
          <span className="text-xs text-slate-400">คลิกเพื่อดูการวิเคราะห์พยาธิกำเนิด</span>
        </div>

        {/* Case Cards Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CASE_STUDIES.map((c: CaseStudy) => {
            const isSelected = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`text-left p-4 rounded-xl border transition ${
                  isSelected
                    ? 'bg-rose-500/10 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300 shadow-sm ring-1 ring-rose-500/30 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <div className="text-xs text-slate-400 font-semibold mb-1">{c.defectStage}</div>
                <div className="text-sm font-bold truncate">{c.conditionNameTh}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.conditionNameEn}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Case View */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                ระยะวิกฤต: {activeCase.defectStage}
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
                <GlossaryPopover
                  term={activeCase.conditionNameEn}
                  onOpenChatWithTopic={onAskAI}
                  onOpenFullGlossary={onOpenGlossary}
                >
                  <span>{activeCase.conditionNameTh} ({activeCase.conditionNameEn})</span>
                </GlossaryPopover>
              </h4>
            </div>

            <div className="flex items-center gap-2">
              {onOpenGlossary && (
                <button
                  onClick={() => onOpenGlossary(activeCase.conditionNameEn.toLowerCase())}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition"
                  title="เปิดในคลังคำศัพท์"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">คลังศัพท์</span>
                </button>
              )}
              <button
                onClick={() => onAskAI(`อธิบายพยาธิสรีรวิทยาและกลไกในระดับยีนของ "${activeCase.conditionNameEn}" อย่างละเอียด`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ปรึกษาแนวทางการรักษาด้วย AI</span>
              </button>
            </div>
          </div>

          {/* Molecular Cause */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Dna className="w-4 h-4 text-emerald-500" />
              <span>สาเหตุทางชีววิทยาและระดับโมเลกุล (Molecular Etiology)</span>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
              <GlossaryText
                text={activeCase.molecularCause}
                onOpenChatWithTopic={onAskAI}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          {/* Symptoms and Signs */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>อาการและลักษณะทางคลินิก (Clinical Features)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeCase.symptoms.map((sym, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <div className="leading-snug">
                    <GlossaryText
                      text={sym}
                      onOpenChatWithTopic={onAskAI}
                      onOpenFullGlossary={onOpenGlossary}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention and Therapy */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>แนวทางการป้องกันและการรักษา (Prevention & Management):</span>
            </div>
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <GlossaryText
                text={activeCase.preventativeOrTherapy}
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

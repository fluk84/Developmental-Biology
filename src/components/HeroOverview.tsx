import React from 'react';
import { TEXTBOOK_CONTENT } from '../data/developmentalData';
import { TabKey } from '../types';
import { GlossaryText, GlossaryTerm } from './GlossaryText';
import { GlossaryPopover } from './GlossaryPopover';
import { 
  BookOpen, 
  GitMerge, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Dna, 
  Compass, 
  Microscope,
  HelpCircle,
  Search,
  Globe,
  Tag
} from 'lucide-react';

interface HeroOverviewProps {
  onNavigate: (tab: TabKey) => void;
  onOpenChatWithTopic: (topic: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const HeroOverview: React.FC<HeroOverviewProps> = ({ 
  onNavigate, 
  onOpenChatWithTopic,
  onOpenGlossary 
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border border-slate-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Microscope className="w-3.5 h-3.5" />
            <span>ตำราและคู่มือการเรียนรู้เชิงลึก (Comprehensive Developmental Biology)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {TEXTBOOK_CONTENT.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
            {TEXTBOOK_CONTENT.titleEn}
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            จากไซโกตเซลล์เดี่ยวสู่สิ่งมีชีวิตที่มีความซับซ้อนนับล้านล้านเซลล์ ศึกษาการแบ่งเซลล์ การกำหนดชะตากรรม 
            การจัดระเบียบเนื้อเยื่อปฐมภูมิ 3 ชั้น และเครือข่ายสัญญาณโมเลกุลที่ควบคุมพิมพ์เขียวของชีวิต
          </p>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('stages')}
              id="hero-btn-stages"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition shadow-lg shadow-emerald-500/20"
            >
              <GitMerge className="w-4 h-4" />
              <span>สำรวจ 6 ระยะการเจริญ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('fate-simulator')}
              id="hero-btn-simulator"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm border border-slate-700 transition"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>ห้องทดลองจำลองชะตากรรมเซลล์</span>
            </button>

            <button
              onClick={() => onNavigate('germ-layers')}
              id="hero-btn-germ-layers"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm border border-slate-700 transition"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>แผนผังเนื้อเยื่อ 3 ชั้น</span>
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              id="hero-btn-quiz"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs sm:text-sm border border-slate-700 transition"
            >
              <HelpCircle className="w-4 h-4 text-violet-400" />
              <span>ทำแบบทดสอบ</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl font-black text-emerald-400">1 เซลล์</div>
            <div className="text-xs text-slate-400">จุดเริ่มต้นจาก Zygote</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl font-black text-cyan-400">3 ชั้น</div>
            <div className="text-xs text-slate-400">เนื้อเยื่อปฐมภูมิ (Germ Layers)</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl font-black text-amber-400">200+ ชนิด</div>
            <div className="text-xs text-slate-400">เซลล์จำเพาะในร่างกาย</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-800">
            <div className="text-2xl font-black text-violet-400">100%</div>
            <div className="text-xs text-slate-400">ใช้ DNA พื้นฐานชุดเดียวกัน</div>
          </div>
        </div>
      </div>

      {/* Interactive Quick Glossary Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>คลังคำศัพท์และมโนทัศน์สำคัญ (Interactive Terminology Popover)</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold hidden sm:inline-block">
                  ชี้หรือคลิกที่คำศัพท์เพื่อดูนิยามทันที
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                รองรับการชี้เมาส์/แตะดูความหมาย กลไกระดับโมเลกุล และเชื่อมโยงข้อมูลล่าสุดผ่าน Google Search Grounding (gemini-3.5-flash)
              </p>
            </div>
          </div>

          {onOpenGlossary && (
            <button
              onClick={() => onOpenGlossary()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-teal-500" />
              <span>เปิดค้นคำศัพท์ทั้งหมด</span>
            </button>
          )}
        </div>

        {/* Quick Popover Chips for explicitly requested and vital developmental terms */}
        <div className="flex flex-wrap gap-2 pt-1">
          {['Gastrulation', 'Apoptosis', 'Cleavage', 'Blastocyst', 'Compaction', 'Neurulation', 'Totipotent', 'Pluripotent', 'Sonic Hedgehog (Shh)', 'Morphogen', 'Neural Crest', 'Notochord', 'Somite', 'iPSC (Induced Pluripotent Stem Cells)'].map((termName) => (
            <GlossaryPopover
              key={termName}
              term={termName}
              onOpenChatWithTopic={onOpenChatWithTopic}
              onOpenFullGlossary={onOpenGlossary}
              className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {termName}
            </GlossaryPopover>
          ))}
        </div>
      </div>

      {/* Abstract & Keywords Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">บทคัดย่อ (Abstract)</h2>
          </div>
          <button
            onClick={() => onOpenChatWithTopic("ช่วยสรุปประเด็นสำคัญของบทคัดย่อชีววิทยาพัฒนาการนี้ในรูปแบบสรุปย่อ 3 ข้อ")}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ขอสรุปด้วย AI</span>
          </button>
        </div>

        <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base text-justify">
          <GlossaryText 
            text={TEXTBOOK_CONTENT.abstract} 
            onOpenChatWithTopic={onOpenChatWithTopic}
            onOpenFullGlossary={onOpenGlossary}
          />
        </div>

        {/* Keywords */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            คำสำคัญ (Keywords) — ชี้เพื่อดูคำนิยาม
          </div>
          <div className="flex flex-wrap gap-2">
            {TEXTBOOK_CONTENT.keywords.map((kw, idx) => (
              <GlossaryPopover
                key={idx}
                term={kw}
                onOpenChatWithTopic={onOpenChatWithTopic}
                onOpenFullGlossary={onOpenGlossary}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition"
              >
                {kw}
              </GlossaryPopover>
            ))}
          </div>
        </div>
      </div>

      {/* Main Textbook Chapters / Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEXTBOOK_CONTENT.sections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-sm border border-emerald-200 dark:border-emerald-800">
                  {sec.number}
                </span>
                <button
                  onClick={() => onOpenChatWithTopic(`ช่วยอธิบายเพิ่มเติมเกี่ยวกับหัวข้อ "${sec.title}" อย่างละเอียด`)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="สนทนาหัวข้อนี้กับ Dr. BioDev"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {sec.title}
              </h3>

              <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <GlossaryText
                  text={sec.content}
                  onOpenChatWithTopic={onOpenChatWithTopic}
                  onOpenFullGlossary={onOpenGlossary}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">ส่วนหนึ่งของเอกสารวิชาการ</span>
              <button
                onClick={() => {
                  if (sec.id === 'sec-2') onNavigate('stages');
                  else if (sec.id === 'sec-3') onNavigate('molecular');
                  else if (sec.id === 'sec-4') onNavigate('germ-layers');
                  else if (sec.id === 'sec-5') onNavigate('clinical');
                  else onOpenChatWithTopic(`ขยายความหัวข้อ ${sec.title}`);
                }}
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>ดูแบบจำลอง/รายละเอียด</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4 Pillars of Development Concept Card */}
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8">
        <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
          <Dna className="w-5 h-5 text-emerald-400" />
          <span>4 เสาหลักกลไกการพัฒนาการของสิ่งมีชีวิต (Core Biological Mechanisms)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/80">
            <div className="text-emerald-400 font-bold text-sm mb-1">1. การแบ่งเซลล์ (Cell Division)</div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <GlossaryText
                text="การเพิ่มจำนวนเซลล์ผ่าน Mitosis ในช่วง Cleavage ข้ามระยะเติบโตเพื่อสร้างรากฐานบลาสโตเมียร์"
                onOpenChatWithTopic={onOpenChatWithTopic}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/80">
            <div className="text-cyan-400 font-bold text-sm mb-1">2. การกำหนดชะตากรรม (Cell Fate)</div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <GlossaryText
                text="เซลล์รับสัญญาณตำแหน่ง (Positional Information) และโมเลกุล Morphogen เพื่อระบุแนวทางอนาคต"
                onOpenChatWithTopic={onOpenChatWithTopic}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/80">
            <div className="text-amber-400 font-bold text-sm mb-1">3. การแยกความต่าง (Differentiation)</div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <GlossaryText
                text="การเปิด-ปิดยีนจำเพาะ นำไปสู่การสร้างโปรตีนและรูปร่างเซลล์เฉพาะ เช่น เซลล์ประสาท หรือกล้ามเนื้อ"
                onOpenChatWithTopic={onOpenChatWithTopic}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>

          <div className="bg-slate-800/70 p-4 rounded-xl border border-slate-700/80">
            <div className="text-rose-400 font-bold text-sm mb-1">4. การสร้างรูปร่าง (Morphogenesis)</div>
            <div className="text-xs text-slate-300 leading-relaxed">
              <GlossaryText
                text="การเคลื่อนตัว จัดเรียงตัว ม้วนพับของเนื้อเยื่อ และการตายตามโปรแกรม (Apoptosis) จนได้อวัยวะ"
                onOpenChatWithTopic={onOpenChatWithTopic}
                onOpenFullGlossary={onOpenGlossary}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { GLOSSARY_ITEMS, GLOSSARY_BY_ID, TERM_ALIAS_MAP } from '../data/glossaryData';
import { GlossaryItem, GlossaryGroundedData } from '../types';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Loader2, 
  X, 
  Info, 
  MessageSquare, 
  Check, 
  Dna,
  Layers,
  Activity,
  Globe
} from 'lucide-react';

interface GlossaryPopoverProps {
  term: string; // ID or term name (e.g., 'Gastrulation', 'Apoptosis', 'gastrulation')
  children?: React.ReactNode;
  onOpenChatWithTopic?: (topic: string) => void;
  onOpenFullGlossary?: (termId?: string) => void;
  className?: string;
}

export const GlossaryPopover: React.FC<GlossaryPopoverProps> = ({
  term,
  children,
  onOpenChatWithTopic,
  onOpenFullGlossary,
  className = '',
}) => {
  // Find matching glossary item
  const termKey = term.toLowerCase().trim();
  const matchedId = TERM_ALIAS_MAP.get(termKey) || termKey;
  const item: GlossaryItem | undefined = GLOSSARY_BY_ID.get(matchedId) || 
    GLOSSARY_ITEMS.find((i) => i.id.toLowerCase() === termKey || i.term.toLowerCase() === termKey);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [groundedData, setGroundedData] = useState<GlossaryGroundedData | null>(null);
  const [showGroundedTab, setShowGroundedTab] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close on click outside if pinned
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setIsPinned(false);
      }
    };

    if (isOpen || isPinned) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isPinned]);

  // Handle hover logic
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (!isPinned) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen && isPinned) {
      setIsOpen(false);
      setIsPinned(false);
    } else {
      setIsOpen(true);
      setIsPinned(true);
    }
  };

  // Trigger Google Search Grounding with Gemini 3.5 Flash
  const handleFetchSearchGrounding = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!item || isSearchLoading) return;
    setShowGroundedTab(true);

    if (groundedData) return; // already cached

    setIsSearchLoading(true);
    try {
      const res = await fetch('/api/gemini/glossary-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term: item.term,
          termTh: item.termTh,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'ไม่สามารถค้นหาข้อมูลได้');

      setGroundedData({
        text: data.text || 'ไม่พบข้อมูลเพิ่มเติม',
        groundingSources: data.groundingSources || [],
        searchQueries: data.searchQueries || [],
        modelUsed: data.modelUsed,
      });
    } catch (err) {
      console.error('Error fetching search grounded data:', err);
      setGroundedData({
        text: 'ขออภัย ไม่สามารถเชื่อมต่อกับบริการ Google Search Grounding ได้ในขณะนี้ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต',
        groundingSources: [],
      });
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleCopyDefinition = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item) return;
    navigator.clipboard.writeText(`${item.term} (${item.termTh}): ${item.shortDefinition}\n${item.detailedDefinition}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!item) {
    // If no glossary match found, just render children
    return <span className={className}>{children || term}</span>;
  }

  // Category badge colors
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'stage':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'cellular_process':
        return 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30';
      case 'signaling':
        return 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30';
      case 'germ_layer':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'genetic':
        return 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30';
      case 'clinical':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30';
    }
  };

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Interactive Trigger Element */}
      <span
        ref={triggerRef}
        onClick={handleToggleClick}
        className={`inline-flex items-center gap-0.5 cursor-pointer decoration-emerald-500/60 dark:decoration-emerald-400/70 underline underline-offset-4 decoration-dashed font-medium text-inherit hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-150 group ${className} ${
          isOpen ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded px-1 -mx-1' : ''
        }`}
        title={`คลิกเพื่อดูคำนิยามด่วนของ ${item.term}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleClick(e as unknown as React.MouseEvent);
          }
        }}
      >
        <span>{children || item.term}</span>
        <span className="opacity-40 group-hover:opacity-100 text-[10px] text-emerald-500 align-super ml-0.5 select-none font-bold">
          ℹ
        </span>
      </span>

      {/* Floating Popover Container */}
      {isOpen && (
        <div
          ref={popoverRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-80 sm:w-96 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-800 dark:text-slate-100 text-xs animate-in fade-in zoom-in-95 duration-150"
          style={{ maxWidth: '90vw' }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  {item.term}
                </h4>
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getCategoryBadge(item.category)}`}>
                  {item.categoryLabel}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium mt-0.5">
                {item.termTh}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleCopyDefinition}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded transition"
                title="คัดลอกนิยาม"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <BookOpen className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPinned(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded transition"
                title="ปิด"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Tab Selection: Offline Definition vs Google Search Grounding */}
          <div className="flex items-center gap-1 mt-2.5 mb-2.5 p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
            <button
              onClick={() => setShowGroundedTab(false)}
              className={`flex-1 py-1 px-2 rounded-md font-medium text-[11px] transition flex items-center justify-center gap-1.5 ${
                !showGroundedTab
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>นิยามและกลไก</span>
            </button>
            <button
              onClick={handleFetchSearchGrounding}
              className={`flex-1 py-1 px-2 rounded-md font-semibold text-[11px] transition flex items-center justify-center gap-1.5 ${
                showGroundedTab
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Globe className="w-3 h-3 text-cyan-500" />
              <span>Google Search Data</span>
            </button>
          </div>

          {/* Body Content */}
          {!showGroundedTab ? (
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              <div className="bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-200">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">
                  {item.shortDefinition}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {item.detailedDefinition}
                </p>
              </div>

              {/* Key Mechanisms / Molecules */}
              {item.keyMechanisms && item.keyMechanisms.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-[10.5px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    กลไกสำคัญ:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.keyMechanisms.map((mech, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                      >
                        {mech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.keyMolecules && item.keyMolecules.length > 0 && (
                <div className="space-y-1">
                  <span className="font-bold text-[10.5px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    โมเลกุลควบคุมหลัก:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.keyMolecules.map((mol, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-[10px] font-mono font-medium"
                      >
                        {mol}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.clinicalRelevance && (
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-[10.5px] text-rose-800 dark:text-rose-300">
                  <span className="font-bold">นัยสำคัญทางการแพทย์: </span>
                  {item.clinicalRelevance}
                </div>
              )}
            </div>
          ) : (
            /* Google Search Grounding Tab */
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {isSearchLoading ? (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
                  <Loader2 className="w-6 h-6 animate-spin text-cyan-500" />
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    กำลังสืบค้นข้อมูลล่าสุดจาก Google Search...
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Gemini 3.5 Flash ทำการประมวลผลงานวิจัยและแหล่งอ้างอิงสด
                  </p>
                </div>
              ) : groundedData ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-cyan-700 dark:text-cyan-300 font-semibold bg-cyan-50 dark:bg-cyan-950/40 px-2 py-1 rounded-md border border-cyan-500/30">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-cyan-500" />
                      ข้อมูลวิจัยที่ผ่านการรับรองด้วย Google Search
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">gemini-3.5-flash</span>
                  </div>

                  <div className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line bg-slate-50 dark:bg-slate-850 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    {groundedData.text}
                  </div>

                  {/* Grounding Source Links */}
                  {groundedData.groundingSources && groundedData.groundingSources.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                        แหล่งอ้างอิงที่ตรวจสอบ (Verified Web Sources):
                      </div>
                      <div className="flex flex-col gap-1">
                        {groundedData.groundingSources.slice(0, 3).map((source, idx) => (
                          <a
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-1 text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline p-1 rounded bg-slate-100 dark:bg-slate-800 truncate"
                          >
                            <span className="truncate">{source.title || source.uri}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <button
                    onClick={handleFetchSearchGrounding}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-sm transition cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>ค้นหาข้อมูลล่าสุดด้วย Google Search</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
            {onOpenChatWithTopic && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPinned(false);
                  onOpenChatWithTopic(`ช่วยอธิบายเชิงลึกเกี่ยวกับ "${item.term}" (${item.termTh}) พร้อมยกตัวอย่างกลไกและงานวิจัยที่น่าสนใจ`);
                }}
                className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>ถาม ดร. ไบโอเดฟ</span>
              </button>
            )}

            {onOpenFullGlossary && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPinned(false);
                  onOpenFullGlossary(item.id);
                }}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium flex items-center gap-1 ml-auto"
              >
                <BookOpen className="w-3 h-3" />
                <span>เปิดคลังคำศัพท์</span>
              </button>
            )}
          </div>
        </div>
      )}
    </span>
  );
};

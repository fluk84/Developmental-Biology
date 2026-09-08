import React, { useState, useEffect, useMemo } from 'react';
import { GLOSSARY_ITEMS, GLOSSARY_CATEGORIES } from '../data/glossaryData';
import { GlossaryItem, GlossaryGroundedData } from '../types';
import { 
  Search, 
  BookOpen, 
  Sparkles, 
  ExternalLink, 
  Loader2, 
  X, 
  Check, 
  Globe, 
  MessageSquare, 
  ChevronRight,
  Filter,
  Copy,
  Layers,
  Dna,
  Zap,
  Tag
} from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTermId?: string | null;
  onOpenChatWithTopic?: (topic: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  selectedTermId,
  onOpenChatWithTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  const [groundedCache, setGroundedCache] = useState<Record<string, GlossaryGroundedData>>({});
  const [loadingTermId, setLoadingTermId] = useState<string | null>(null);
  const [customSearchQuery, setCustomSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync selectedTermId when opened
  useEffect(() => {
    if (selectedTermId) {
      setExpandedTermId(selectedTermId);
      const target = GLOSSARY_ITEMS.find((i) => i.id === selectedTermId);
      if (target) {
        setActiveCategory(target.category);
      }
    }
  }, [selectedTermId, isOpen]);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return GLOSSARY_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTerm = item.term.toLowerCase().includes(q);
      const inTermTh = item.termTh.toLowerCase().includes(q);
      const inDef = item.shortDefinition.toLowerCase().includes(q) || item.detailedDefinition.toLowerCase().includes(q);
      const inAliases = item.aliases?.some((a) => a.toLowerCase().includes(q));
      const inMolecules = item.keyMolecules?.some((m) => m.toLowerCase().includes(q));

      return inTerm || inTermTh || inDef || inAliases || inMolecules;
    });
  }, [searchQuery, activeCategory]);

  // Fetch Google Search Grounding with Gemini 3.5 Flash for a specific term
  const handleFetchGrounding = async (item: GlossaryItem) => {
    if (groundedCache[item.id] || loadingTermId === item.id) return;

    setLoadingTermId(item.id);
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
      if (!res.ok) throw new Error(data.error || 'การค้นหาล้มเหลว');

      setGroundedCache((prev) => ({
        ...prev,
        [item.id]: {
          text: data.text || 'ไม่พบข้อมูลเพิ่มเติม',
          groundingSources: data.groundingSources || [],
          searchQueries: data.searchQueries || [],
          modelUsed: data.modelUsed,
        },
      }));
    } catch (err) {
      console.error('Error in glossary lookup grounding:', err);
      setGroundedCache((prev) => ({
        ...prev,
        [item.id]: {
          text: 'ขออภัย ไม่สามารถเชื่อมต่อกับ Google Search Grounding ได้ในขณะนี้ โปรดตรวจสอบการเชื่อมต่อ',
          groundingSources: [],
        },
      }));
    } finally {
      setLoadingTermId(null);
    }
  };

  const handleCopy = (item: GlossaryItem) => {
    const text = `${item.term} (${item.termTh})\n\n${item.shortDefinition}\n\n${item.detailedDefinition}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <span>คลังคำศัพท์และมโนทัศน์ชีววิทยาพัฒนาการ</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30 hidden sm:inline-flex items-center gap-1">
                  <Globe className="w-3 h-3 text-cyan-500" />
                  Google Search Grounded (gemini-3.5-flash)
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                สืบค้นคำนิยามด่วน กลไกระดับโมเลกุล และข้อมูลงานวิจัยทางวิทยาศาสตร์ล่าสุด
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 pb-2 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาคำศัพท์ (เช่น Gastrulation, Apoptosis, Cleavage, Sonic Hedgehog, Morphogen, Ectoderm...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-slate-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ล้าง
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {GLOSSARY_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.labelTh}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: List of Terms */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                ไม่พบคำศัพท์ที่ตรงกับการค้นหา "{searchQuery}"
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                คุณสามารถสอบถาม Dr. BioDev หรือให้ระบบค้นคว้าคำศัพท์นี้ผ่าน Google Search ได้โดยตรง
              </p>
              {onOpenChatWithTopic && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenChatWithTopic(`ช่วยอธิบายความหมายและกลไกของ "${searchQuery}" ในทางชีววิทยาพัฒนาการ`);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>ค้นคว้า "{searchQuery}" กับ Dr. BioDev</span>
                </button>
              )}
            </div>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedTermId === item.id;
              const grounded = groundedCache[item.id];
              const isLoadingGrounded = loadingTermId === item.id;

              return (
                <div
                  key={item.id}
                  id={`glossary-item-${item.id}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-emerald-500/50 bg-slate-50/50 dark:bg-slate-850/50 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Item Header */}
                  <div
                    onClick={() => setExpandedTermId(isExpanded ? null : item.id)}
                    className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {item.term}
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                          {item.categoryLabel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
                        {item.termTh}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 line-clamp-2 pt-1">
                        {item.shortDefinition}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(item);
                        }}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="คัดลอกนิยาม"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <ChevronRight
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90 text-emerald-500' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 sm:px-6 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-pre-line">
                        {item.detailedDefinition}
                      </div>

                      {/* Mechanisms & Molecules Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {item.keyMechanisms && (
                          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              กลไกทางชีววิทยาหลัก:
                            </span>
                            <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
                              {item.keyMechanisms.map((mech, idx) => (
                                <li key={idx}>{mech}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {item.keyMolecules && (
                          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              ยีนและโมเลกุลควบคุมหลัก:
                            </span>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.keyMolecules.map((mol, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-mono text-[11px]"
                                >
                                  {mol}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Clinical Relevance */}
                      {item.clinicalRelevance && (
                        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200">
                          <strong className="text-rose-700 dark:text-rose-400">ความสำคัญทางการแพทย์: </strong>
                          {item.clinicalRelevance}
                        </div>
                      )}

                      {/* Google Search Grounding Section (Gemini 3.5 Flash) */}
                      <div className="rounded-xl border border-cyan-500/30 bg-cyan-50/30 dark:bg-cyan-950/20 p-4 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span className="font-bold text-xs sm:text-sm text-cyan-900 dark:text-cyan-200">
                              ข้อมูลวิจัยและวิทยาการล่าสุด (Google Search Grounding)
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 font-mono">
                              gemini-3.5-flash
                            </span>
                          </div>

                          {!grounded && (
                            <button
                              onClick={() => handleFetchGrounding(item)}
                              disabled={isLoadingGrounded}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer disabled:opacity-50"
                            >
                              {isLoadingGrounded ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>กำลังค้นคว้า...</span>
                                </>
                              ) : (
                                <>
                                  <Search className="w-3.5 h-3.5" />
                                  <span>สืบค้นข้อมูลล่าสุด</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>

                        {/* Grounded Results */}
                        {isLoadingGrounded ? (
                          <div className="py-6 text-center space-y-2">
                            <Loader2 className="w-6 h-6 animate-spin text-cyan-500 mx-auto" />
                            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                              กำลังประมวลผลงานวิจัยล่าสุดผ่าน Google Search Grounding ด้วย Gemini 3.5 Flash...
                            </p>
                          </div>
                        ) : grounded ? (
                          <div className="space-y-3 pt-1">
                            <div className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-pre-line">
                              {grounded.text}
                            </div>

                            {/* Verified Source Links */}
                            {grounded.groundingSources && grounded.groundingSources.length > 0 && (
                              <div className="space-y-1.5">
                                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                  แหล่งอ้างอิงและงานวิจัยที่ตรวจสอบ (Verified Scientific Sources):
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  {grounded.groundingSources.map((src, sIdx) => (
                                    <a
                                      key={sIdx}
                                      href={src.uri}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-cyan-600 dark:text-cyan-400 text-xs truncate transition"
                                    >
                                      <span className="truncate">{src.title || src.uri}</span>
                                      <ExternalLink className="w-3 h-3 shrink-0" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            คลิก "สืบค้นข้อมูลล่าสุด" เพื่อใช้โมเดล Gemini 3.5 Flash ดึงข้อมูลงานวิจัย วารสารการแพทย์ (Nature, Cell, PubMed) และหลักสูตรสมัยใหม่
                          </p>
                        )}
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
                        <span className="text-slate-400 font-mono text-[11px]">
                          ID: {item.id}
                        </span>

                        {onOpenChatWithTopic && (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenChatWithTopic(`ช่วยอธิบายเชิงลึกเกี่ยวกับ "${item.term}" (${item.termTh})`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-semibold transition"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>อภิปรายหัวข้อนี้กับ Dr. BioDev</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between text-xs text-slate-500">
          <span>แสดง {filteredItems.length} จากทั้งหมด {GLOSSARY_ITEMS.length} คำศัพท์</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold transition"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};

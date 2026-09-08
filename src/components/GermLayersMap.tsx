import React, { useState } from 'react';
import { GERM_LAYERS } from '../data/developmentalData';
import { GermLayer } from '../types';
import { GlossaryText, GlossaryTerm } from './GlossaryText';
import { GlossaryPopover } from './GlossaryPopover';
import { 
  Layers, 
  Search, 
  Sparkles, 
  Brain, 
  Heart, 
  Zap, 
  Shield, 
  Eye, 
  Flame, 
  Activity, 
  Cpu, 
  CircleDot, 
  Utensils, 
  Droplets, 
  Sliders, 
  Wind, 
  Compass,
  BookOpen
} from 'lucide-react';

interface GermLayersMapProps {
  onAskAI: (question: string) => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const GermLayersMap: React.FC<GermLayersMapProps> = ({ onAskAI, onOpenGlossary }) => {
  const [selectedLayerId, setSelectedLayerId] = useState<'all' | 'ectoderm' | 'mesoderm' | 'endoderm'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-sky-500" />;
      case 'Heart': return <Heart className="w-5 h-5 text-amber-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-sky-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-sky-600" />;
      case 'Eye': return <Eye className="w-5 h-5 text-sky-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-sky-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-amber-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'CircleDot': return <CircleDot className="w-5 h-5 text-amber-500" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-rose-500" />;
      case 'Droplets': return <Droplets className="w-5 h-5 text-rose-500" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-rose-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-rose-500" />;
      case 'Compass': return <Compass className="w-5 h-5 text-rose-600" />;
      default: return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredLayers = GERM_LAYERS.filter((layer) => {
    if (selectedLayerId !== 'all' && layer.id !== selectedLayerId) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header and Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>การสร้างอวัยวะและเนื้อเยื่อปฐมภูมิ (Organogenesis & Germ Layers)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              แผนผังการเจริญของเนื้อเยื่อ 3 ชั้น (Germ Layer Fate Map)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              ผลลัพธ์จากการเคลื่อนที่ในระยะ Gastrulation ก่อตัวเป็น 3 ชั้นหลักที่สร้างอวัยวะทุกระบบในร่างกาย
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              id="organ-search-input"
              placeholder="ค้นหาอวัยวะ เช่น หัวใจ, สมอง, ตับ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* Layer Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-6">
          <button
            onClick={() => setSelectedLayerId('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              selectedLayerId === 'all'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            แสดงทั้งหมด (All 3 Layers)
          </button>
          <button
            onClick={() => setSelectedLayerId('ectoderm')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              selectedLayerId === 'ectoderm'
                ? 'bg-sky-600 text-white shadow-md'
                : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 hover:bg-sky-100 border border-sky-200 dark:border-sky-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>เอ็กโทเดิร์ม (Ectoderm)</span>
          </button>
          <button
            onClick={() => setSelectedLayerId('mesoderm')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              selectedLayerId === 'mesoderm'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 border border-amber-200 dark:border-amber-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>มีโซเดิร์ม (Mesoderm)</span>
          </button>
          <button
            onClick={() => setSelectedLayerId('endoderm')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              selectedLayerId === 'endoderm'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-800'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span>เอนโดเดิร์ม (Endoderm)</span>
          </button>
        </div>
      </div>

      {/* Layer Sections & Organ Cards */}
      <div className="space-y-8">
        {filteredLayers.map((layer: GermLayer) => {
          const matchingOrgans = layer.organs.filter((org) =>
            org.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
            org.description.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && matchingOrgans.length === 0) return null;

          return (
            <div
              key={layer.id}
              className={`rounded-2xl border bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-sm transition ${
                layer.id === 'ectoderm'
                  ? 'border-sky-200 dark:border-sky-900/60'
                  : layer.id === 'mesoderm'
                  ? 'border-amber-200 dark:border-amber-900/60'
                  : 'border-rose-200 dark:border-rose-900/60'
              }`}
            >
              {/* Layer Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3.5 h-10 rounded-full ${
                      layer.id === 'ectoderm'
                        ? 'bg-sky-500'
                        : layer.id === 'mesoderm'
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <GlossaryPopover
                        term={layer.id}
                        onOpenChatWithTopic={onAskAI}
                        onOpenFullGlossary={onOpenGlossary}
                      >
                        <span>{layer.nameTh}</span>
                      </GlossaryPopover>
                    </h3>
                    <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <GlossaryText
                        text={layer.description}
                        onOpenChatWithTopic={onAskAI}
                        onOpenFullGlossary={onOpenGlossary}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onOpenGlossary && (
                    <button
                      onClick={() => onOpenGlossary(layer.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 transition"
                      title="เปิดในคลังคำศัพท์"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">คลังศัพท์</span>
                    </button>
                  )}
                  <button
                    onClick={() => onAskAI(`อธิบายกระบวนการพัฒนาและสัญญาณโมเลกุลที่ชักนำ ${layer.nameEn} ให้แยกเป็นอวัยวะต่างๆ`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ถาม AI เกี่ยวกับชั้นนี้</span>
                  </button>
                </div>
              </div>

              {/* Signaling molecules pill */}
              <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
                <span className="font-bold text-slate-500 dark:text-slate-400">โมเลกุลชักนำหลัก:</span>
                {layer.signalingMolecules.map((mol, idx) => (
                  <GlossaryPopover
                    key={idx}
                    term={mol}
                    onOpenChatWithTopic={onAskAI}
                    onOpenFullGlossary={onOpenGlossary}
                    className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 font-mono text-[11px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {mol}
                  </GlossaryPopover>
                ))}
              </div>

              {/* Derived Organs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchingOrgans.map((org, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 transition group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-750 shadow-sm border border-slate-100 dark:border-slate-700">
                          {getIcon(org.icon)}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {layer.nameEn} Derivative
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                        {org.nameTh}
                      </h4>
                      <div className="text-[11px] font-medium text-slate-400 mb-2">
                        {org.nameEn}
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <GlossaryText
                          text={org.description}
                          onOpenChatWithTopic={onAskAI}
                          onOpenFullGlossary={onOpenGlossary}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onAskAI(`อธิบายรายละเอียดการสร้าง ${org.nameEn} (${org.nameTh}) จากชั้น ${layer.nameEn}`)}
                      className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>เจาะลึกกระบวนการสร้าง</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

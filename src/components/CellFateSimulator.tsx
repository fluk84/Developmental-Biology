import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  RotateCcw, 
  Activity, 
  Dna, 
  Sliders, 
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface CellFateSimulatorProps {
  onAskAI: (question: string) => void;
}

interface TargetCellType {
  nameTh: string;
  nameEn: string;
  germLayer: string;
  requiredFactors: string[];
  markerGenes: string[];
  description: string;
  svgColor: string;
}

const TARGET_CELLS: TargetCellType[] = [
  {
    nameTh: 'เซลล์ประสาทสั่งการ',
    nameEn: 'Motor Neuron',
    germLayer: 'Ectoderm',
    requiredFactors: ['Retinoic Acid (RA)', 'Sonic Hedgehog (Shh)'],
    markerGenes: ['Tuj1 (β-III tubulin)', 'Hb9', 'Isl1', 'Chat'],
    description: 'เซลล์ประสาทที่มีแอกซอนยาวและเดนไดรต์แตกแขนง นำกระแสประสาทจากระบบประสาทส่วนกลางไปสั่งการกล้ามเนื้อ',
    svgColor: '#38bdf8'
  },
  {
    nameTh: 'เซลล์กล้ามเนื้อหัวใจ',
    nameEn: 'Cardiomyocyte',
    germLayer: 'Mesoderm',
    requiredFactors: ['Activin A', 'BMP-4', 'Wnt Inhibitor'],
    markerGenes: ['cTnT (Cardiac troponin)', 'Nkx2.5', 'GATA4', 'Myh6'],
    description: 'เซลล์กล้ามเนื้อหัวใจที่มีคุณสมบัติหดตัวเป็นจังหวะ มีลาย และเชื่อมต่อกันด้วย Intercalated disc',
    svgColor: '#f97316'
  },
  {
    nameTh: 'เซลล์ตับอ่อนสร้างอินซูลิน',
    nameEn: 'Pancreatic Beta Cell',
    germLayer: 'Endoderm',
    requiredFactors: ['Activin A', 'FGF-10', 'Retinoic Acid (RA)'],
    markerGenes: ['Pdx1', 'Ngn3', 'Insulin (Ins1/2)', 'MafA'],
    description: 'เซลล์เอนโดครีนในเกาะไอส์เลตของตับอ่อน ทำหน้าที่ตรวจจับระดับน้ำตาลในเลือดและหลั่งฮอร์โมนอินซูลิน',
    svgColor: '#f43f5e'
  },
  {
    nameTh: 'เซลล์สร้างกระดูก',
    nameEn: 'Osteoblast',
    germLayer: 'Mesoderm',
    requiredFactors: ['BMP-2', 'Wnt / β-catenin', 'Ascorbic Acid'],
    markerGenes: ['Runx2', 'Osterix', 'Osteocalcin', 'Alkaline Phosphatase'],
    description: 'เซลล์สร้างเมทริกซ์กระดูกและสะสมแคลเซียมฟอสเฟตเพื่อสร้างโครงร่างกระดูกที่แข็งแรง',
    svgColor: '#eab308'
  }
];

const AVAILABLE_FACTORS = [
  'Retinoic Acid (RA)',
  'Sonic Hedgehog (Shh)',
  'Activin A',
  'BMP-4',
  'BMP-2',
  'Wnt Inhibitor',
  'Wnt / β-catenin',
  'FGF-10',
  'Ascorbic Acid'
];

export const CellFateSimulator: React.FC<CellFateSimulatorProps> = ({ onAskAI }) => {
  // Mode toggle: 'differentiation' vs 'morphogen'
  const [activeMode, setActiveMode] = useState<'differentiation' | 'morphogen'>('differentiation');

  // Simulator 1 State: Factors selected
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['Retinoic Acid (RA)']);
  const [differentiationProgress, setDifferentiationProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Simulator 2 State: Morphogen Gradient
  const [sourceStrength, setSourceStrength] = useState<number>(85);
  const [thresholdHigh, setThresholdHigh] = useState<number>(60);
  const [thresholdLow, setThresholdLow] = useState<number>(30);

  // Evaluate matching target cell
  const matchedTarget = TARGET_CELLS.find((target) => {
    const hasAll = target.requiredFactors.every((f) => selectedFactors.includes(f));
    const sameLength = target.requiredFactors.length === selectedFactors.length;
    return hasAll && sameLength;
  });

  const handleToggleFactor = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((f) => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
    setDifferentiationProgress(0);
  };

  const handleRunDifferentiation = () => {
    setIsSimulating(true);
    setDifferentiationProgress(20);
    setTimeout(() => setDifferentiationProgress(60), 300);
    setTimeout(() => {
      setDifferentiationProgress(100);
      setIsSimulating(false);
    }, 700);
  };

  const handleResetFactors = () => {
    setSelectedFactors([]);
    setDifferentiationProgress(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navigation Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <FlaskConical className="w-4 h-4" />
              <span>ห้องทดลองวิทยาศาสตร์จำลอง (Interactive Development Labs)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              การจำลองการกำหนดชะตากรรมและการแยกความแตกต่างของเซลล์
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              ทดลองใส่โมเลกุลส่งสัญญาณเพื่อชักนำสเต็มเซลล์ หรือปรับความเข้มข้นของสารมอร์โฟเจนตามแบบจำลอง French Flag
            </p>
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => setActiveMode('differentiation')}
              id="sim-mode-diff"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeMode === 'differentiation'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              1. สเต็มเซลล์ & ปัจจัยเหนี่ยวนำ
            </button>
            <button
              onClick={() => setActiveMode('morphogen')}
              id="sim-mode-morphogen"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeMode === 'morphogen'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              2. ความเข้มข้น Morphogen (French Flag)
            </button>
          </div>
        </div>
      </div>

      {/* LAB 1: STEM CELL DIFFERENTIATION LAB */}
      {activeMode === 'differentiation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Controls: Select Factors */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-500" />
                  <span>เลือกปัจจัยส่งสัญญาณชีวเคมี (Signaling Molecules)</span>
                </h3>
                <button
                  onClick={handleResetFactors}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ล้างตัวเลือก</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                คลิกเลือกคู่ปัจจัยเพื่อกระตุ้นทางชีวเคมีต่อเซลล์ต้นกำเนิดพลูริโพเทนต์ (Pluripotent Stem Cell)
              </p>

              {/* Factors pill grid */}
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_FACTORS.map((factor) => {
                  const isChecked = selectedFactors.includes(factor);
                  return (
                    <button
                      key={factor}
                      onClick={() => handleToggleFactor(factor)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        isChecked
                          ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-bold shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {factor}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Presets shortcut */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                สูตรเหนี่ยวนำแนะนำ (Click to load recipe):
              </div>
              <div className="grid grid-cols-2 gap-2">
                {TARGET_CELLS.map((target, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedFactors([...target.requiredFactors]);
                      setDifferentiationProgress(0);
                    }}
                    className="p-2 text-left rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition text-xs"
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200">{target.nameTh}</div>
                    <div className="text-[10px] text-slate-400 truncate">{target.requiredFactors.join(' + ')}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleRunDifferentiation}
              disabled={selectedFactors.length === 0 || isSimulating}
              id="btn-induce-differentiation"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-sm transition shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>{isSimulating ? 'กำลังเกิดกระบวนการแยกความแตกต่าง...' : 'เริ่มกระบวนการชักนำเซลล์ (Induce Differentiation)'}</span>
            </button>
          </div>

          {/* Right Visual Output: Cell Morphology & Gene Markers */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                ผลการเปลี่ยนแปลงของเซลล์ (Cellular Outcome)
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                สถานะ: {differentiationProgress === 100 ? (matchedTarget ? 'แตกต่างจำเพาะสำเร็จ' : 'เซลล์ไม่จำเพาะ / ไม่เข้าคู่') : 'เซลล์ต้นกำเนิด (Undifferentiated)'}
              </span>
            </div>

            {/* Cell Graphics Container */}
            <div className="h-56 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden p-4">
              {differentiationProgress === 100 && matchedTarget ? (
                <div className="flex flex-col items-center text-center animate-fadeIn">
                  {/* Dynamic Cell SVG representation */}
                  {matchedTarget.nameEn === 'Motor Neuron' && (
                    <svg viewBox="0 0 200 120" className="w-40 h-24">
                      {/* Soma with Dendrites */}
                      <path d="M 50,60 Q 30,30 20,40 M 50,60 Q 30,80 15,75 M 50,60 Q 40,15 55,20" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                      <circle cx="60" cy="60" r="16" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                      <circle cx="60" cy="60" r="6" fill="#0369a1" />
                      {/* Axon */}
                      <path d="M 76,60 L 170,60" stroke="#38bdf8" strokeWidth="3" />
                      {/* Myelin sheaths */}
                      <rect x="90" y="54" width="18" height="12" rx="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                      <rect x="120" y="54" width="18" height="12" rx="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                      <rect x="150" y="54" width="18" height="12" rx="3" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                      {/* Axon terminal */}
                      <path d="M 170,60 L 190,45 M 170,60 L 190,60 M 170,60 L 190,75" stroke="#38bdf8" strokeWidth="2" />
                    </svg>
                  )}

                  {matchedTarget.nameEn === 'Cardiomyocyte' && (
                    <svg viewBox="0 0 200 120" className="w-40 h-24">
                      {/* Striated branched cardiac muscle */}
                      <path d="M 40,40 L 110,40 Q 130,30 160,30 L 160,60 Q 130,55 110,65 L 160,95 L 160,110 L 110,85 L 40,85 Z" fill="#fb923c" stroke="#ea580c" strokeWidth="2" />
                      {/* Intercalated discs and nucleus */}
                      <line x1="60" y1="40" x2="60" y2="85" stroke="#9a3412" strokeWidth="2" strokeDasharray="3 3" />
                      <line x1="85" y1="40" x2="85" y2="85" stroke="#9a3412" strokeWidth="2" strokeDasharray="3 3" />
                      <circle cx="75" cy="62" r="8" fill="#9a3412" />
                    </svg>
                  )}

                  {matchedTarget.nameEn === 'Pancreatic Beta Cell' && (
                    <svg viewBox="0 0 200 120" className="w-40 h-24">
                      {/* Rounded endocrine cell with secretory granules */}
                      <circle cx="100" cy="60" r="38" fill="#f43f5e" fillOpacity="0.8" stroke="#be123c" strokeWidth="2.5" />
                      <circle cx="95" cy="55" r="14" fill="#9f1239" />
                      {/* Insulin secretory granules */}
                      <circle cx="120" cy="50" r="4" fill="#ffe4e6" />
                      <circle cx="115" cy="70" r="4" fill="#ffe4e6" />
                      <circle cx="85" cy="80" r="4" fill="#ffe4e6" />
                      <circle cx="75" cy="50" r="4" fill="#ffe4e6" />
                    </svg>
                  )}

                  {matchedTarget.nameEn === 'Osteoblast' && (
                    <svg viewBox="0 0 200 120" className="w-40 h-24">
                      {/* Cuboidal bone forming cell with matrix vesicles */}
                      <rect x="65" y="30" width="70" height="60" rx="12" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                      <circle cx="95" cy="55" r="12" fill="#a16207" />
                      {/* Bone matrix synthesis */}
                      <circle cx="150" cy="45" r="6" fill="#fef08a" stroke="#ca8a04" />
                      <circle cx="155" cy="65" r="8" fill="#fef08a" stroke="#ca8a04" />
                      <circle cx="145" cy="85" r="5" fill="#fef08a" stroke="#ca8a04" />
                    </svg>
                  )}

                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {matchedTarget.nameTh} ({matchedTarget.nameEn})
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    กำเนิดจาก: {matchedTarget.germLayer}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center mb-2 shadow-inner">
                    <div className="w-8 h-8 rounded-full bg-emerald-400/40 animate-pulse" />
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Pluripotent Stem Cell (ICM state)
                  </div>
                  <div className="text-[11px] text-slate-400 max-w-xs mt-1">
                    {selectedFactors.length === 0
                      ? 'ยังไม่ได้ใส่โมเลกุลส่งสัญญาณ กรุณาเลือกปัจจัยทางชีวเคมีด้านซ้าย'
                      : 'กดปุ่ม "เริ่มกระบวนการชักนำเซลล์" เพื่อเริ่มการแสดงออกของยีน'}
                  </div>
                </div>
              )}
            </div>

            {/* Markers display */}
            {differentiationProgress === 100 && matchedTarget && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {matchedTarget.description}
                </p>

                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                    <Dna className="w-3.5 h-3.5 text-emerald-500" />
                    <span>ยีนบ่งชี้จำเพาะที่ถูกเปิดใช้งาน (Activated Marker Genes):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {matchedTarget.markerGenes.map((gene, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-mono font-bold border border-emerald-200 dark:border-emerald-800"
                      >
                        {gene}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onAskAI(`อธิบายกลไกทางโมเลกุลที่ทำให้ ${selectedFactors.join(' ร่วมกับ ')} สามารถเปลี่ยนสเต็มเซลล์ให้กลายเป็น ${matchedTarget.nameEn}`)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 pt-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ปรึกษา Dr. BioDev เพิ่มเติมเกี่ยวกับกระบวนการนี้</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LAB 2: MORPHOGEN GRADIENT SIMULATOR (FRENCH FLAG MODEL) */}
      {activeMode === 'morphogen' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-500" />
                <span>แบบจำลองธงชาติฝรั่งเศส (French Flag Model by Lewis Wolpert)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                การสร้างความแตกต่างของเนื้อเยื่อตามระดับความเข้มข้นของสารมอร์โฟเจน (เช่น Sonic Hedgehog, Bicoid, BMP)
              </p>
            </div>

            <button
              onClick={() => onAskAI("อธิบายหลักการของ French Flag Model และ Morphogen gradient ในการกำหนดชะตากรรมของเซลล์")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 text-xs font-semibold hover:bg-cyan-100 transition shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>ทำความเข้าใจทฤษฎี</span>
            </button>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">อัตราการหลั่งจากต้นกำเนิด (Source)</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-mono">{sourceStrength}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={sourceStrength}
                onChange={(e) => setSourceStrength(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <span className="text-[10px] text-slate-400">ระดับที่แหล่งกำเนิด (e.g. ZPA หรือ Notocord)</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">เกณฑ์ที่ 1 (High Threshold)</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono">{thresholdHigh}%</span>
              </div>
              <input
                type="range"
                min={thresholdLow + 5}
                max="80"
                value={thresholdHigh}
                onChange={(e) => setThresholdHigh(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <span className="text-[10px] text-slate-400">ชะตากรรมแบบที่ 1 (e.g. นิ้วก้อย หรือ Motor Neuron)</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300">เกณฑ์ที่ 2 (Low Threshold)</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono">{thresholdLow}%</span>
              </div>
              <input
                type="range"
                min="10"
                max={thresholdHigh - 5}
                value={thresholdLow}
                onChange={(e) => setThresholdLow(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <span className="text-[10px] text-slate-400">ชะตากรรมแบบที่ 2 (e.g. นิ้วกลาง) / ต่ำกว่านี้เป็นชะตากรรมที่ 3</span>
            </div>
          </div>

          {/* Morphogen Diffusion Curve & Cells Flag */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              กราฟความเข้มข้นเทียบกับระยะทาง (Concentration Gradient vs. Distance)
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-white">
              <svg viewBox="0 0 600 220" className="w-full h-56 sm:h-64">
                {/* Axes */}
                <line x1="50" y1="180" x2="550" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
                <text x="300" y="205" textAnchor="middle" fontSize="11" fill="#94a3b8">
                  ระยะห่างจากแหล่งกำเนิดสารเหนี่ยวนำ (Distance from Signaling Center) →
                </text>
                <text x="25" y="100" textAnchor="middle" fontSize="11" fill="#94a3b8" transform="rotate(-90 25 100)">
                  ความเข้มข้น (Concentration)
                </text>

                {/* Threshold Lines */}
                {/* High Threshold line */}
                <line
                  x1="50"
                  y1={180 - (thresholdHigh * 1.5)}
                  x2="550"
                  y2={180 - (thresholdHigh * 1.5)}
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text x="560" y={185 - (thresholdHigh * 1.5)} fontSize="10" fill="#38bdf8" fontWeight="bold">
                  Threshold 1 ({thresholdHigh}%)
                </text>

                {/* Low Threshold line */}
                <line
                  x1="50"
                  y1={180 - (thresholdLow * 1.5)}
                  x2="550"
                  y2={180 - (thresholdLow * 1.5)}
                  stroke="#f43f5e"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text x="560" y={185 - (thresholdLow * 1.5)} fontSize="10" fill="#f43f5e" fontWeight="bold">
                  Threshold 2 ({thresholdLow}%)
                </text>

                {/* Exponential decay curve: C(x) = C0 * exp(-x/lambda) */}
                <path
                  d={`M 50,${180 - (sourceStrength * 1.5)} Q 200,${180 - (sourceStrength * 0.45 * 1.5)} 550,175`}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                />

                {/* Morphogen Source Node */}
                <circle cx="50" cy={180 - (sourceStrength * 1.5)} r="7" fill="#22d3ee" stroke="#0891b2" strokeWidth="2" />
                <text x="50" y={180 - (sourceStrength * 1.5) - 12} textAnchor="middle" fontSize="11" fill="#22d3ee" fontWeight="bold">
                  Source Center
                </text>
              </svg>
            </div>

            {/* Resulting French Flag Cell Fates */}
            <div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                ชะตากรรมของเซลล์ตามแนวแกน (Resulting Tissue Patterning)
              </div>
              <div className="grid grid-cols-3 rounded-xl overflow-hidden text-center text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="bg-blue-600 text-white p-3">
                  <div>ชะตากรรมสีน้ำเงิน (Fate A)</div>
                  <div className="text-[11px] font-normal opacity-90">ความเข้มข้นสูงกว่า {thresholdHigh}%</div>
                  <div className="text-[10px] mt-1 font-mono">e.g. Anterior Digit (นิ้วก้อย)</div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white p-3 border-x border-slate-200 dark:border-slate-700">
                  <div>ชะตากรรมสีขาว (Fate B)</div>
                  <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">ระหว่าง {thresholdLow}% ถึง {thresholdHigh}%</div>
                  <div className="text-[10px] mt-1 font-mono">e.g. Middle Digits (นิ้วกลาง)</div>
                </div>
                <div className="bg-red-600 text-white p-3">
                  <div>ชะตากรรมสีแดง (Fate C)</div>
                  <div className="text-[11px] font-normal opacity-90">ความเข้มข้นต่ำกว่า {thresholdLow}%</div>
                  <div className="text-[10px] mt-1 font-mono">e.g. Posterior Digit (นิ้วโป้ง)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

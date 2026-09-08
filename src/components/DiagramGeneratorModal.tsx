import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Sparkles, 
  Loader2, 
  Download, 
  AlertCircle,
  Ratio,
  Check
} from 'lucide-react';

interface DiagramGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9 (แนวนอนมาตรฐาน)', description: 'วิดีโอ/สไลด์นำเสนอ' },
  { id: '4:3', label: '4:3 (ตำราเรียนคลาสสิก)', description: 'ไดอะแกรมทางวิชาการ' },
  { id: '1:1', label: '1:1 (จัตุรัส)', description: 'ภาพสไลด์และโพสต์' },
  { id: '3:4', label: '3:4 (แนวตั้งหน้ากระดาษ)', description: 'รูปประกอบบทความ' },
  { id: '9:16', label: '9:16 (แนวตั้งมือถือ)', description: 'สตอรี/สมาร์ทโฟน' },
  { id: '21:9', label: '21:9 (อัลตร้าไวด์)', description: 'ไทม์ไลน์ภาพพาโนรามา' },
];

const PRESET_PROMPTS = [
  {
    title: 'การม้วนปิดของหลอดประสาท (Neurulation)',
    prompt: 'Detailed medical illustration cross-section of embryonic neural tube formation, showing neural plate folding, notochord inducing signals, neural crest cells delamination, and somites on both sides.',
  },
  {
    title: 'การสร้างเนื้อเยื่อ 3 ชั้นในระยะ Gastrulation',
    prompt: 'Scientific anatomical diagram of human gastrulation stage, showing epiblast cells invaginating through primitive streak, forming ectoderm, mesoderm, and endoderm layers with labeled cellular migration arrows.',
  },
  {
    title: 'โครงสร้างระยะบลาสโตซิสต์ (Blastocyst Anatomy)',
    prompt: 'High clarity medical textbook diagram of a 5-day human blastocyst, highlighting inner cell mass (embryoblast), fluid-filled blastocoel cavity, and outer trophoblast cell layer.',
  },
  {
    title: 'การไล่ระดับความเข้มข้นของมอร์โฟเจน (Morphogen Gradient)',
    prompt: 'Scientific diagram illustrating morphogen gradient diffusion (such as Sonic hedgehog or Bicoid) from a signaling center across tissue, showing concentration thresholds and resulting cell fate boundaries (French flag model).',
  },
  {
    title: 'แผนภูมิต้นไม้การแยกความแตกต่างของสเต็มเซลล์',
    prompt: 'Cellular differentiation lineage tree branching from a pluripotent stem cell into specialized motor neurons, beating cardiomyocytes, osteoblasts, and pancreatic islet beta cells.',
  },
];

export const DiagramGeneratorModal: React.FC<DiagramGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState<string>(PRESET_PROMPTS[0].prompt);
  const [selectedRatio, setSelectedRatio] = useState<string>('16:9');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/gemini/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          aspectRatio: selectedRatio,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'ไม่สามารถสร้างภาพได้');
      }

      setGeneratedImageUrl(data.imageUrl);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMessage(error.message || 'เกิดข้อผิดพลาดในการสร้างภาพ');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                สร้างภาพวาดไดอะแกรมทางชีววิทยาพัฒนาการ (AI Scientific Diagram)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ขับเคลื่อนด้วย Gemini Image Model พร้อมตัวเลือกควบคุมสัดส่วนภาพ (Aspect Ratio Control)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Aspect Ratio Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Ratio className="w-4 h-4 text-emerald-500" />
              <span>เลือกสัดส่วนภาพ (Aspect Ratio):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ASPECT_RATIOS.map((ratio) => {
                const isSelected = selectedRatio === ratio.id;
                return (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex items-start justify-between ${
                      isSelected
                        ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{ratio.label}</div>
                      <div className="text-[10px] text-slate-400">{ratio.description}</div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preset Prompts */}
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              หัวข้อไดอะแกรมทางวิทยาศาสตร์ยอดนิยม (Preset Prompts):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PROMPTS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(preset.prompt)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200 dark:border-slate-700 transition"
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              ข้อความคำสั่งสร้างภาพประกอบ (Prompt):
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="ระบุรายละเอียดภาพวาดทางวิทยาศาสตร์ เช่น การม้วนพับของเอ็กโทเดิร์ม หรือสัดส่วนเซลล์บลาสโตซิสต์..."
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!prompt || isLoading}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>กำลังสร้างภาพวาดไดอะแกรม ({selectedRatio})...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>สร้างภาพประกอบทางวิทยาศาสตร์</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Generated Image Result */}
          {generatedImageUrl && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  สัดส่วนภาพ: {selectedRatio}
                </span>
                <a
                  href={generatedImageUrl}
                  download={`developmental-biology-${selectedRatio}.png`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลดรูปภาพ</span>
                </a>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950 flex items-center justify-center p-2">
                <img
                  src={generatedImageUrl}
                  alt="Generated developmental biology diagram"
                  className="max-h-[380px] w-auto object-contain rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { SAMPLE_HISTOLOGY_IMAGES } from '../data/developmentalData';
import { 
  X, 
  Upload, 
  Camera, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ImageIcon
} from 'lucide-react';

interface ImageAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAIWithResult?: (text: string) => void;
}

export const ImageAnalyzerModal: React.FC<ImageAnalyzerModalProps> = ({ isOpen, onClose, onAskAIWithResult }) => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImageBase64(reader.result as string);
      setAnalysisResult(null);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = async (sample: typeof SAMPLE_HISTOLOGY_IMAGES[0]) => {
    setIsLoading(true);
    setErrorMessage(null);
    setAnalysisResult(null);
    try {
      // Fetch sample image and convert to base64
      const response = await fetch(sample.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
        setMimeType(blob.type || 'image/jpeg');
        setCustomPrompt(sample.sampleQuestion);
        setIsLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error(err);
      setErrorMessage("ไม่สามารถโหลดภาพตัวอย่างได้ กรุณาลองใหม่อีกครั้ง");
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImageBase64) return;
    setIsLoading(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/gemini/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImageBase64,
          mimeType,
          prompt: customPrompt || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการวิเคราะห์ภาพ');
      }

      setAnalysisResult(data.analysis);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMessage(error.message || 'ไม่สามารถวิเคราะห์ภาพได้');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                วิเคราะห์ภาพตัวอ่อนและสไลด์เนื้อเยื่อ (Embryo Image Analyzer)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ขับเคลื่อนด้วย Gemini Pro Vision สำหรับการจำแนกระยะและโครงสร้างทางกายวิภาค
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Preset Samples */}
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              ภาพตัวอย่างทางวิทยาศาสตร์ (Sample Embryo/Histology Images)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SAMPLE_HISTOLOGY_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:border-cyan-500 transition text-left flex items-center gap-2.5"
                >
                  <img
                    src={sample.url}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover rounded-lg shrink-0 border border-slate-200 dark:border-slate-700"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {sample.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">คลิกเพื่อโหลดภาพ</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload or Drop Area */}
          <div>
            <label
              htmlFor="embryo-image-input"
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 transition text-center"
            >
              {selectedImageBase64 ? (
                <div className="space-y-3 flex flex-col items-center">
                  <img
                    src={selectedImageBase64}
                    alt="Preview"
                    className="max-h-48 rounded-lg object-contain border border-slate-200 dark:border-slate-700 shadow-sm"
                  />
                  <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>คลิกเพื่อเปลี่ยนรูปภาพใหม่</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    อัปโหลดรูปภาพสไลด์ หรือลากไฟล์มาวางที่นี่
                  </div>
                  <div className="text-[11px] text-slate-400">รองรับไฟล์ PNG, JPG, WEBP</div>
                </div>
              )}
              <input
                id="embryo-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Optional Prompt */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              คำถามหรือประเด็นที่ต้องการให้ AI เน้นเป็นพิเศษ (Optional):
            </label>
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="เช่น ช่วยระบุตำแหน่งของ Somite และ Neural crest ในภาพนี้"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleAnalyze}
            disabled={!selectedImageBase64 || isLoading}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>กำลังวิเคราะห์โครงสร้างเซลล์ตัวอ่อนด้วย AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>เริ่มการวิเคราะห์ด้วย Gemini</span>
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

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ผลการวิเคราะห์ทางชีววิทยาพัฒนาการ</span>
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {analysisResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

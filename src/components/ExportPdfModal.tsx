import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  X, 
  Printer, 
  Download, 
  Eye, 
  Check, 
  FileText, 
  Layers, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  BookOpen, 
  Sliders, 
  Dna,
  Share2
} from 'lucide-react';
import { TabKey } from '../types';
import { 
  TEXTBOOK_CONTENT, 
  STAGES_DATA, 
  GERM_LAYERS, 
  SIGNALING_PATHWAYS, 
  CASE_STUDIES, 
  QUIZ_QUESTIONS 
} from '../data/developmentalData';

interface ExportPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabKey;
  isPrintFriendlyActive: boolean;
  onTogglePrintFriendly: () => void;
}

type ExportScope = 'current' | 'all' | 'stages' | 'germ-layers' | 'molecular' | 'clinical' | 'quiz';

export const ExportPdfModal: React.FC<ExportPdfModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  isPrintFriendlyActive,
  onTogglePrintFriendly,
}) => {
  const [scope, setScope] = useState<ExportScope>('current');
  const [colorMode, setColorMode] = useState<'academic-color' | 'monochrome'>('academic-color');
  const [includeSummary, setIncludeSummary] = useState<boolean>(true);
  const [includeDiagrams, setIncludeDiagrams] = useState<boolean>(true);
  const [includeMolecular, setIncludeMolecular] = useState<boolean>(true);
  const [includeQuiz, setIncludeQuiz] = useState<boolean>(true);
  
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>('');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const printableRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Determine title for the active module
  const getModuleTitle = (tab: TabKey | ExportScope): string => {
    switch (tab) {
      case 'overview':
        return 'บทที่ 1: ภาพรวมและบทคัดย่อทางวิชาการ (Academic Overview & Principles)';
      case 'stages':
        return 'บทที่ 2: 6 ระยะการเจริญของตัวอ่อน (Embryogenesis Stages & Anatomy)';
      case 'germ-layers':
        return 'บทที่ 3: แผนผังเนื้อเยื่อปฐมภูมิ 3 ชั้นและการกำเนิดอวัยวะ (Germ Layers & Fate Map)';
      case 'molecular':
        return 'บทที่ 4: กลไกควบคุมระดับโมเลกุลและวิถีส่งสัญญาณ (Molecular Regulation & Pathways)';
      case 'fate-simulator':
        return 'บทที่ 5: การกำหนดชะตากรรมของเซลล์และแบบจำลองมอร์โฟเจน (Cell Fate & Morphogen Dynamics)';
      case 'clinical':
        return 'บทที่ 6: การประยุกต์ใช้ทางการแพทย์ เวชศาสตร์ฟื้นฟู และโรคแต่กำเนิด (Clinical & Teratology)';
      case 'quiz':
        return 'บทที่ 7: แบบประเมินผลการเรียนรู้และเฉลยคำอธิบาย (Mastery Assessment & Answers)';
      case 'all':
        return 'เอกสารประมวลเนื้อหาชีววิทยาพัฒนาการฉบับสมบูรณ์ (Comprehensive Study Guide)';
      default:
        return 'เอกสารการเรียนรู้ชีววิทยาพัฒนาการ (Developmental Biology Study Notes)';
    }
  };

  const currentDateFormatted = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Direct PDF Download Handler using html2canvas & jsPDF
  const handleExportPDF = async () => {
    if (!printableRef.current) return;

    try {
      setIsExporting(true);
      setExportProgress('กำลังเตรียมโครงสร้างเอกสารและเรนเดอร์กราฟิก...');

      // Small delay to ensure clean DOM rendering
      await new Promise((resolve) => setTimeout(resolve, 300));

      setExportProgress('กำลังแปลงหน้าเอกสารเป็นภาพความละเอียดสูง (Rendering Document)...');

      const element = printableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution for crisp print
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
      });

      setExportProgress('กำลังจัดหน้าเอกสาร A4 และสร้างไฟล์ PDF...');

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First Page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Additional Pages if content spans multiple pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      setExportProgress('กำลังดาวน์โหลดไฟล์ PDF...');

      const scopeName = scope === 'current' ? activeTab : scope;
      const filename = `developmental_biology_${scopeName}_study_guide.pdf`;
      pdf.save(filename);

      setExportProgress('ส่งออกไฟล์ PDF สำเร็จ!');
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
      }, 4000);
    } catch (err) {
      console.error('Failed to export PDF:', err);
      setExportProgress('เกิดข้อผิดพลาดในการสร้างไฟล์ PDF โปรดลองใช้ปุ่มพิมพ์ผ่านเบราว์เซอร์');
    } finally {
      setIsExporting(false);
    }
  };

  // Browser Print trigger (Save as PDF or direct paper print)
  const handleSystemPrint = () => {
    window.print();
  };

  // Determine what sections to show based on scope
  const targetScope = scope === 'current' ? activeTab : scope;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto no-print">
      <div 
        id="export-pdf-modal-container"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden transition-all text-slate-900 dark:text-slate-100"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>ส่งออกเอกสารการเรียนเป็น PDF (Export for Offline Study)</span>
                <span className="text-[11px] font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Print-Friendly Mode
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                จัดรูปแบบเอกสารทางวิชาการ ปรับคอนทราสต์คมชัด และบันทึกเป็นไฟล์ PDF สำหรับอ่านหรือทบทวนแบบออฟไลน์
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-export-modal-btn"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Two Columns: Controls and Live Preview */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* Controls Column (Left, 4.5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 overflow-y-auto space-y-5 bg-slate-50/40 dark:bg-slate-900/40">
            {/* Scope Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>เลือกขอบเขตบทเรียน (Lesson Scope)</span>
              </label>
              <select
                id="export-scope-select"
                value={scope}
                onChange={(e) => setScope(e.target.value as ExportScope)}
                className="w-full text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="current">บทเรียนปัจจุบันที่เปิดอยู่ ({getModuleTitle(activeTab).slice(0, 30)}...)</option>
                <option value="all">เอกสารสรุปฉบับสมบูรณ์ (Complete Study Guide - รวมทุกบท)</option>
                <option value="overview">บทที่ 1: ภาพรวมและหลักการพัฒนาการ</option>
                <option value="stages">บทที่ 2: 6 ระยะการเจริญของตัวอ่อน</option>
                <option value="germ-layers">บทที่ 3: แผนผังเนื้อเยื่อ 3 ชั้น & อวัยวะ</option>
                <option value="molecular">บทที่ 4: กลไกโมเลกุลและวิถีส่งสัญญาณ</option>
                <option value="clinical">บทที่ 6: การประยุกต์ใช้ทางการแพทย์ & พิษวิทยา</option>
                <option value="quiz">บทที่ 7: แบบประเมินความรู้พร้อมเฉลย</option>
              </select>
            </div>

            {/* Styling Mode Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                <span>รูปแบบชุดสีและกระดาษ (Color & Print Mode)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  id="mode-academic-color"
                  onClick={() => setColorMode('academic-color')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                    colorMode === 'academic-color'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>สีทางวิชาการ (Color)</span>
                    {colorMode === 'academic-color' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    ไฮไลต์สีชั้นเนื้อเยื่อ & แผนภาพ
                  </div>
                </button>

                <button
                  type="button"
                  id="mode-monochrome"
                  onClick={() => setColorMode('monochrome')}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition ${
                    colorMode === 'monochrome'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>ขาวดำคมชัด (Mono)</span>
                    {colorMode === 'monochrome' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    ประหยัดหมึกพิมพ์ & ตัวหนังสือเข้ม
                  </div>
                </button>
              </div>
            </div>

            {/* Content Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                <span>ตัวเลือกเนื้อหาในเอกสาร (Content Inclusions)</span>
              </label>
              <div className="space-y-2 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeSummary}
                    onChange={(e) => setIncludeSummary(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>รวมบทคัดย่อและสาระสำคัญ (Abstract & Summary)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeDiagrams}
                    onChange={(e) => setIncludeDiagrams(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>รวมภาพโครงสร้างตัวอ่อนเวกเตอร์ (Vector Diagrams)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeMolecular}
                    onChange={(e) => setIncludeMolecular(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>รวมตารางยีนและวิถีโมเลกุล (Signaling Pathways & Genes)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeQuiz}
                    onChange={(e) => setIncludeQuiz(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>รวมแบบทดสอบทบทวนและเฉลย (Self-Assessment Quiz)</span>
                </label>
              </div>
            </div>

            {/* Interactive Print-Friendly Screen View Toggle */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  โหมดแสดงผลสำหรับพิมพ์บนจอภาพ
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  สลับธีมแอปเป็นเอกสารกระดาษสีขาวเพื่อความสบายตา
                </div>
              </div>
              <button
                type="button"
                id="toggle-screen-print-mode-btn"
                onClick={onTogglePrintFriendly}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  isPrintFriendlyActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {isPrintFriendlyActive ? 'เปิดใช้งานอยู่' : 'เปิดโหมดเอกสาร'}
              </button>
            </div>

            {/* Export Actions Box */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                id="download-pdf-btn"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>กำลังสร้าง PDF สำหรับอ่านออฟไลน์...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>ดาวน์โหลดไฟล์ PDF สำหรับอ่านออฟไลน์ (.pdf)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="browser-print-btn"
                onClick={handleSystemPrint}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition shadow-sm cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>เปิดหน้าต่างพิมพ์ / พิมพ์ผ่านเบราว์เซอร์ (System Print)</span>
              </button>

              {exportProgress && (
                <div className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                  exportSuccess 
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {exportSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />}
                  <span>{exportProgress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Document Preview Column (Right, 7.5 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 bg-slate-200 dark:bg-slate-950/80 overflow-y-auto flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>ตัวอย่างเอกสารก่อนพิมพ์ (A4 Print Preview)</span>
              </span>
              <span>สเกลจำลองขนาดมาตรฐาน A4</span>
            </div>

            {/* Live Document Paper Simulation (This node is captured by html2canvas) */}
            <div
              ref={printableRef}
              id="printable-document-root"
              className={`w-full max-w-2xl bg-white text-slate-900 p-8 sm:p-10 rounded-sm shadow-xl border border-slate-300 ${
                colorMode === 'monochrome' ? 'grayscale contrast-125' : ''
              }`}
              style={{
                fontFamily: "'Prompt', 'Plus Jakarta Sans', system-ui, sans-serif",
                color: '#0f172a',
                backgroundColor: '#ffffff',
              }}
            >
              {/* Academic Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <Dna className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                        เอกสารวิชาการประกอบการเรียนรู้และการวิจัย • ชีววิทยาพัฒนาการ
                      </div>
                      <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                        ชีววิทยาพัฒนาการ: กระบวนการและกลไกการพัฒนาของสิ่งมีชีวิต
                      </h1>
                      <div className="text-[11px] text-slate-600 italic">
                        Developmental Biology: Cellular Mechanisms, Morphogenesis & Gene Regulation
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-600">
                  <div>
                    <span className="font-bold text-slate-800">วันที่สร้างเอกสาร:</span> {currentDateFormatted}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">ขอบเขต:</span> {scope === 'all' ? 'ฉบับสมบูรณ์ (ทุกบท)' : getModuleTitle(targetScope).slice(0, 20)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">รหัสเนื้อหา:</span> DEVBIO-2026-TH
                  </div>
                  <div>
                    <span className="font-bold text-slate-800">การเข้าถึง:</span> อ่านออฟไลน์ (Offline)
                  </div>
                </div>
              </div>

              {/* Module Content Rendering */}
              <div className="space-y-6 text-xs leading-relaxed text-slate-800">
                {/* 1. Academic Abstract & Overview */}
                {(targetScope === 'overview' || targetScope === 'all') && includeSummary && (
                  <div className="space-y-3 print-avoid-break">
                    <div className="flex items-center gap-2 border-b border-slate-300 pb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        1. บทคัดย่อทางวิชาการ (Academic Abstract)
                      </h2>
                    </div>
                    <p className="text-[11.5px] leading-relaxed text-justify text-slate-700 bg-slate-50 p-3 rounded border border-slate-200">
                      {TEXTBOOK_CONTENT.abstract}
                    </p>

                    <div className="text-[11px]">
                      <span className="font-bold text-slate-900">คำสำคัญ (Keywords): </span>
                      <span className="text-slate-600">{TEXTBOOK_CONTENT.keywords.join(' • ')}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {TEXTBOOK_CONTENT.sections.slice(0, 4).map((sec) => (
                        <div key={sec.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[11px]">
                          <div className="font-bold text-slate-900 mb-1">{sec.title}</div>
                          <div className="text-slate-600 text-[10px] line-clamp-3">{sec.content}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Embryogenesis Stages Timeline */}
                {(targetScope === 'stages' || targetScope === 'all') && (
                  <div className="space-y-3 print-page-break">
                    <div className="flex items-center gap-2 border-b border-slate-300 pb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        2. ลำดับระยะการเจริญของตัวอ่อน (Embryogenesis Stages Timeline)
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {STAGES_DATA.map((stage, idx) => (
                        <div key={stage.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/50 print-avoid-break">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-bold text-xs text-slate-900">
                              ระยะที่ {idx + 1}: {stage.nameTh} ({stage.nameEn})
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {stage.timeframe} • {stage.cellCount}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-700 mb-2">{stage.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-slate-200">
                            <div>
                              <span className="font-bold text-slate-800">เหตุการณ์สำคัญ:</span>
                              <ul className="list-disc list-inside text-slate-600">
                                {stage.keyEvents.map((evt, i) => (
                                  <li key={i}>{evt}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="font-bold text-slate-800">ยีนและสัญญาณควบคุม:</span>
                              <div className="text-slate-600 font-mono mt-0.5">
                                {stage.molecularDrivers.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Germ Layers Fate Map */}
                {(targetScope === 'germ-layers' || targetScope === 'all') && (
                  <div className="space-y-3 print-page-break">
                    <div className="flex items-center gap-2 border-b border-slate-300 pb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        3. แผนผังเนื้อเยื่อปฐมภูมิ 3 ชั้น (Germ Layer Fate Map & Derivatives)
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {GERM_LAYERS.map((layer) => (
                        <div key={layer.id} className="border border-slate-200 p-2.5 rounded bg-slate-50 text-[11px] print-avoid-break">
                          <div className="font-bold text-slate-900 pb-1 border-b border-slate-200 mb-1.5">
                            {layer.nameTh}
                            <div className="text-[9.5px] font-normal text-slate-500 italic">{layer.nameEn}</div>
                          </div>
                          <div className="text-[10px] text-slate-700 mb-2">{layer.description}</div>
                          <div className="text-[10px] font-bold text-slate-800 mb-1">อวัยวะที่พัฒนาได้:</div>
                          <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5">
                            {layer.organs.map((org, i) => (
                              <li key={i}>{org.nameTh} ({org.nameEn})</li>
                            ))}
                          </ul>
                          <div className="mt-2 pt-1 border-t border-slate-200 text-[9.5px] text-slate-500">
                            <span className="font-semibold">สัญญาณเหนี่ยวนำ:</span> {layer.signalingMolecules.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Molecular Regulation & Pathways */}
                {(targetScope === 'molecular' || targetScope === 'all') && includeMolecular && (
                  <div className="space-y-3 print-page-break">
                    <div className="flex items-center gap-2 border-b border-slate-300 pb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-600" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        4. วิถีส่งสัญญาณระดับโมเลกุลในตัวอ่อน (Key Embryonic Signaling Pathways)
                      </h2>
                    </div>

                    <table className="w-full border-collapse text-[10px] print-avoid-break">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-300 text-left">
                          <th className="p-1.5 font-bold">วิถีสัญญาณ</th>
                          <th className="p-1.5 font-bold">โมเลกุลส่งสัญญาณหลัก</th>
                          <th className="p-1.5 font-bold">ยีนเป้าหมาย</th>
                          <th className="p-1.5 font-bold">บทบาทในตัวอ่อน</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {SIGNALING_PATHWAYS.map((pw) => (
                          <tr key={pw.id}>
                            <td className="p-1.5 font-bold text-slate-900">{pw.name}</td>
                            <td className="p-1.5 text-slate-600">{pw.keyMolecules.join(', ')}</td>
                            <td className="p-1.5 text-slate-600 font-mono">{pw.targetGenes.join(', ')}</td>
                            <td className="p-1.5 text-slate-700">{pw.roleInDevelopment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 5. Clinical Applications & Teratology */}
                {(targetScope === 'clinical' || targetScope === 'all') && (
                  <div className="space-y-3 print-page-break">
                    <div className="flex items-center gap-2 border-b border-slate-300 pb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        5. การประยุกต์ใช้ทางการแพทย์และโรคแต่กำเนิด (Clinical Case Studies & Teratology)
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CASE_STUDIES.map((cs) => (
                        <div key={cs.id} className="p-2.5 border border-slate-200 rounded bg-slate-50 text-[10.5px] print-avoid-break">
                          <div className="font-bold text-slate-900 mb-1">{cs.conditionNameTh} ({cs.conditionNameEn})</div>
                          <div className="text-slate-600 mb-1"><span className="font-semibold text-slate-700">ระยะเกิดความผิดปกติ:</span> {cs.defectStage}</div>
                          <div className="text-slate-600 mb-1.5"><span className="font-semibold text-slate-700">กลไกระดับโมเลกุล:</span> {cs.molecularCause}</div>
                          <div className="text-slate-500 text-[10px]"><span className="font-semibold text-slate-700">อาการแสดง:</span> {cs.symptoms.slice(0, 2).join(', ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Mastery Quiz with Answer Keys */}
                {(targetScope === 'quiz' || targetScope === 'all') && includeQuiz && (
                  <div className="space-y-3 print-page-break">
                    <div className="flex items-center gap-2 border-b border-slate-300 pb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                        6. แบบทดสอบทบทวนและเฉลยความรู้ (Mastery Self-Assessment & Answer Key)
                      </h2>
                    </div>

                    <div className="space-y-2.5">
                      {QUIZ_QUESTIONS.map((q, idx) => (
                        <div key={q.id} className="p-2.5 border border-slate-200 rounded bg-slate-50/70 text-[11px] print-avoid-break">
                          <div className="font-bold text-slate-900 mb-1">
                            ข้อ {idx + 1}. {q.question}
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-600 mb-1.5">
                            {q.options.map((opt, oIdx) => (
                              <div key={oIdx} className={oIdx === q.correctIndex ? 'font-bold text-emerald-800' : ''}>
                                {String.fromCharCode(65 + oIdx)}. {opt} {oIdx === q.correctIndex ? '✓' : ''}
                              </div>
                            ))}
                          </div>
                          <div className="text-[10px] text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-200">
                            <span className="font-bold">เฉลยเหตุผล: </span>{q.explanation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Academic Footer */}
              <div className="mt-8 pt-4 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500">
                <div>
                  ชีววิทยาพัฒนาการ: เอกสารสรุปความรู้สำหรับการศึกษาออฟไลน์ (Developmental Biology Offline Study Handout)
                </div>
                <div>
                  หน้า 1 / 1 • สำเนาวิชาการ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

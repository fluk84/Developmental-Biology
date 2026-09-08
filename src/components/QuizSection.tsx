import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/developmentalData';
import { QuizQuestion } from '../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Award, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface QuizSectionProps {
  onAskAI: (question: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onAskAI }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;
  const selectedOption = selectedAnswers[currentQ.id];

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return; // prevent changing
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQ.id]: optIdx,
    });
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowResults(false);
  };

  // Calculate score
  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="space-y-8 animate-fadeIn max-w-3xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>ประเมินความรู้ (Knowledge Assessment)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              แบบทดสอบชีววิทยาพัฒนาการ (Developmental Biology Quiz)
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-400">ความคืบหน้า</span>
            <div className="text-sm font-bold text-violet-600 dark:text-violet-400">
              ข้อ {currentIdx + 1} / {totalQuestions}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-violet-600 h-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Quiz Card */}
      {!showResults ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              คำถามข้อที่ {currentIdx + 1}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-3 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 ring-1 ring-rose-500';
                } else {
                  btnStyle = 'opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>คำอธิบายเฉลยทางวิทยาศาสตร์:</span>
                </span>
                <button
                  onClick={() => onAskAI(`อธิบายคำถามข้อนี้เพิ่มเติม: "${currentQ.question}" เหตุผลที่ตอบ "${currentQ.options[currentQ.correctIndex]}"`)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ถาม AI ขยายความ</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                id="quiz-btn-next"
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition flex items-center gap-2 shadow-md"
              >
                <span>{currentIdx < totalQuestions - 1 ? 'ข้อถัดไป' : 'ดูผลคะแนนรวม'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              สรุปผลการทดสอบของคุณ
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              แบบทดสอบชีววิทยาพัฒนาการ (Developmental Biology Mastery)
            </p>
          </div>

          <div className="text-5xl font-black text-emerald-500 tracking-tight">
            {score} / {totalQuestions}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            {score === totalQuestions
              ? 'ยอดเยี่ยมมาก! คุณมีความรู้ความเข้าใจที่ลึกซึ้งในกลไกของชีววิทยาพัฒนาการระดับผู้เชี่ยวชาญ'
              : score >= 3
              ? 'เก่งมาก! คุณเข้าใจหลักการสำคัญของตัวอ่อนวิทยาได้เป็นอย่างดี สามารถทบทวนเพิ่มเติมผ่านโมดูลจำลองชะตากรรมเซลล์ได้'
              : 'เริ่มต้นได้ดี! ลองศึกษาเพิ่มเติมในแท็บ "6 ระยะการพัฒนาการ" และ "เนื้อเยื่อ 3 ชั้น" เพื่อเสริมสร้างความเข้าใจ'}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 font-bold text-xs sm:text-sm transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ทำแบบทดสอบใหม่อีกครั้ง</span>
            </button>

            <button
              onClick={() => onAskAI("ช่วยแนะนำหัวข้อชีววิทยาพัฒนาการที่ควรเน้นศึกษาเพิ่มเติมสำหรับนักศึกษาแพทย์และวิทยาศาสตร์ชีวภาพ")}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>ขอคำแนะนำการศึกษาจาก Dr. BioDev</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

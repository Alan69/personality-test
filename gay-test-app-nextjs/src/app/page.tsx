'use client';

import { useState, useEffect, useCallback } from 'react';
import questionsEn from '@/data/questions_en.json';
import questionsRu from '@/data/questions_ru.json';
import AdSense from '@/components/AdSense';

interface Question {
  id: number;
  question: string;
  options: string[];
}


const translations = {
  en: {
    title: "Gay Test",
    subtitle: "Discover your true self with our fun personality quiz!",
    startButton: "Start Quiz",
    questionOf: "Question",
    of: "of",
    resultTitle: "You are 100% gay!",
    resultDescription: "Congratulations! You've completed our personality test.",
    restartButton: "Take Again"
  },
  ru: {
    title: "Гей Тест",
    subtitle: "Откройте свое истинное я с помощью нашего веселого теста личности!",
    startButton: "Начать Тест",
    questionOf: "Вопрос",
    of: "из",
    resultTitle: "Ты на 100% гей!",
    resultDescription: "Поздравляем! Вы прошли наш тест личности.",
    restartButton: "Пройти Снова"
  }
};

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ru'>('en');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizState, setQuizState] = useState<'start' | 'quiz' | 'result'>('start');

  const loadQuestions = useCallback(() => {
    const data = currentLanguage === 'en' ? questionsEn : questionsRu;
    setQuestions(data.questions);
  }, [currentLanguage]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const switchLanguage = (lang: 'en' | 'ru') => {
    setCurrentLanguage(lang);
    if (quizState === 'quiz') {
      // Refresh current question if quiz is in progress
      setTimeout(() => {
        loadQuestions();
      }, 0);
    }
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizState('quiz');
  };

  const selectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizState('result');
      }
    }, 500);
  };

  const restartQuiz = () => {
    setQuizState('start');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 max-w-2xl w-full shadow-2xl relative overflow-hidden min-h-[600px]">
        {/* Rainbow border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>
        
        {/* Language switcher */}
        <div className="absolute top-5 right-5 flex gap-2">
          <button
            onClick={() => switchLanguage('en')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentLanguage === 'en'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/20 text-gray-700 hover:bg-white/30'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => switchLanguage('ru')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              currentLanguage === 'ru'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-white/20 text-gray-700 hover:bg-white/30'
            }`}
          >
            RU
          </button>
        </div>

        {/* Start Screen */}
        {quizState === 'start' && (
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {translations[currentLanguage].title}
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              {translations[currentLanguage].subtitle}
            </p>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-xl font-semibold uppercase tracking-wide hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              🎯 {translations[currentLanguage].startButton}
            </button>
            
            {/* Ad below start button */}
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md" style={{ minHeight: '200px' }}>
                <AdSense 
                  adSlot="3909950379" 
                  className="w-full"
                  adStyle={{ 
                    display: 'block',
                    width: '100%',
                    minHeight: '200px'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {quizState === 'quiz' && questions.length > 0 && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                {translations[currentLanguage].questionOf} {currentQuestion + 1} {translations[currentLanguage].of} {questions.length}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 leading-relaxed">
              {questions[currentQuestion]?.question}
            </h2>

            <div className="space-y-4">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectOption(index)}
                  className="w-full p-6 text-left bg-white border-2 border-gray-200 rounded-2xl hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-lg font-medium text-gray-700 hover:text-purple-600 relative overflow-hidden group"
                >
                  <span className="relative z-10">{option}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Screen */}
        {quizState === 'result' && (
          <div className="text-center animate-fade-in">
            <div className="text-6xl mb-6 animate-bounce">🏳️‍🌈</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              {translations[currentLanguage].resultTitle}
            </h2>
            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
              {translations[currentLanguage].resultDescription}
            </p>
            
            {/* Ad above restart button */}
            <div className="mb-8 flex justify-center">
              <div className="w-full max-w-md" style={{ minHeight: '200px' }}>
                <AdSense 
                  adSlot="3909950379" 
                  className="w-full"
                  adStyle={{ 
                    display: 'block',
                    width: '100%',
                    minHeight: '200px'
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={restartQuiz}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold uppercase tracking-wide hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              🔄 {translations[currentLanguage].restartButton}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
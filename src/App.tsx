import { useMemo } from 'react';
import { useQuote } from './hooks/useQuote';
import QuoteCard from './components/QuoteCard';

function App() {
    const { quote, loading, error, fetchQuote } = useQuote();

    const dots = useMemo(() => {
        return Array.from({ length: 54 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 14 + 4}px`,
            duration: `${Math.random() * 5 + 5}s`, 
            delay: `${Math.random() * -10}s`,
        }));
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white relative overflow-hidden">

            {/* Faint Grid Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-grid-slate-200 mask-fade-tl opacity-80"></div>
            </div>

            {/* Animated Floating Dots */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {dots.map((dot: { id: number; top: string; left: string; size: string; duration: string; delay: string }) => (
                    <div
                        key={dot.id}
                        className="dot"
                        style={{
                            top: dot.top,
                            left: dot.left,
                            width: dot.size,
                            height: dot.size,
                            animationDuration: dot.duration,
                            animationDelay: dot.delay,
                        }}
                    ></div>
                ))}
            </div>

            {error && (
                <div className="absolute top-4 text-red-500 bg-red-100 px-4 py-2 rounded-lg border border-red-200 z-10">
                    Error: {error}
                </div>
            )}

            <div className="relative z-10">
                <QuoteCard
                    quote={quote}
                    loading={loading}
                    onNext={fetchQuote}
                />
            </div>

         
            <style>{`
      /* Floating Animated Dots */

      .dot {
          position: absolute;
          background: rgba(55, 115, 226, 0.2); /* Indigo glow, slightly more transparent for light mode */
          border-radius: 50%;
          filter: blur(4px);
          animation: float infinite linear;
      }

      /* Grid Background Pattern */
      .bg-grid-slate-200 {
          background-image: linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                            linear-gradient(to bottom, #cbd5e1 1px, transparent 1px);
          background-size: 40px 40px;
      }

      .mask-fade-tl {
          -webkit-mask-image: radial-gradient(circle at 0% 0%, black 0%, transparent 60%);
          mask-image: radial-gradient(circle at 0% 0%, black 0%, transparent 60%);
      }

      @keyframes float {
          0% {
              transform: translate(0px, 0px) scale(1);
              opacity: 0.6;
          }
          25% {
              transform: translate(40px, -60px) scale(1.2);
              opacity: 0.9;
          }
          50% {
              transform: translate(80px, 20px) scale(0.9);
              opacity: 0.7;
          }
          75% {
              transform: translate(-20px, -40px) scale(1.3);
              opacity: 0.85;
          }
          100% {
              transform: translate(0px, 0px) scale(1);
              opacity: 0.6;
          }
      }
  `}</style>
        </div>

    )
}

export default App
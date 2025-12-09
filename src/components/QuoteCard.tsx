import { useRef, useState } from "react";
import { toPng } from "html-to-image";

interface Quote {
    id: number;
    quote: string;
    author: string;
}

interface QuoteCardProps {
    quote: Quote | null;
    loading: boolean;
    onNext: () => void;
}

export default function QuoteCard({ quote, loading, onNext }: QuoteCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const takeScreenshot = async () => {
        if (!cardRef.current) return;

        const dataUrl = await toPng(cardRef.current, {
            cacheBust: true,
            backgroundColor: "#ffffff",
        });

        setImagePreview(dataUrl);
    };

    return (
        <>
            {/* Quote Card */}
            <div className="relative max-w-xl w-full group" ref={cardRef}>

                {/* Glow Border */}
                <div className="bg-blue-200 absolute -inset-0.5 
    bg-gradient-to-r from-transparent via-black/30 to-transparent
    rounded-2xl blur-md opacity-100 transition duration-700">
                </div>

                <div className="relative p-[1px] overflow-hidden rounded-2xl">
                    <div className="absolute inset-[-100%] animate-[spin_7s_linear_infinite]
                        bg-[conic-gradient(from_90deg,transparent_0_340deg,black_360deg)] opacity-90">
                    </div>

                    {/* Inner Card */}
                    <div className="relative p-8 rounded-2xl bg-gray-100 shadow-xl backdrop-blur-sm">
                        <p className="text-2xl md:text-3xl font-light text-center italic text-slate-800 mb-6">
                            {quote?.quote}
                        </p>

                        <p className="text-center text-slate-500 uppercase text-sm mb-6">
                            {quote?.author}
                        </p>

                        <div className="flex justify-center">
    <button
        onClick={onNext}
        disabled={loading}
        className={`px-8 py-3 rounded-full font-semibold text-white
        transition-all duration-300 flex items-center gap-2
        shadow-[0_0_10px_rgba(99,102,241,0.6)]
        ${loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-700"}
        `}
    >
        {loading ? (
            <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
            </div>
        ) : "Next Quote"}
    </button>
</div>

                    </div>
                </div>
            </div>

            {/* SHARE BUTTON BELOW RIGHT */}
          <div className="max-w-xl w-full flex justify-end mt-3 pr-2">
    <button
        onClick={takeScreenshot}
        className="px-5 py-2 rounded-full text-white font-semibold 
        bg-indigo-500 hover:bg-indigo-700 
        shadow-[0_0_10px_rgba(99,102,241,0.6)]
        transition-all duration-300"
    >
        Share
    </button>
</div>


            {/* Popup Modal */}
            {imagePreview && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full">
                        <img src={imagePreview} className="rounded-xl w-full mb-4" />

                        <div className="flex flex-col gap-3">
                            <a href={imagePreview} download="quote.png"
                                className="px-5 py-3 bg-blue-600 text-white rounded-lg text-center">
                                Download Image
                            </a>

                            <a
                                href={`https://wa.me/?text=${quote?.quote}%0A${imagePreview}`}
                                target="_blank"
                                className="px-5 py-3 bg-green-600 text-white rounded-lg text-center"
                            >
                                Share on WhatsApp
                            </a>

                            <button
                                onClick={() => setImagePreview(null)}
                                className="px-5 py-3 bg-gray-300 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


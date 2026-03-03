import { personalInfo, images } from "@/config/siteConfig";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[50vh] bg-cover bg-center flex items-center justify-center overflow-hidden pt-16" style={{
      backgroundImage: `url('${images.heroBackground}')`,
      backgroundAttachment: 'fixed',
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
    }}>
      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight tracking-tight drop-shadow-lg" style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: '700', letterSpacing: '0.05em' }}>
          {personalInfo.heroQuote}
        </h2>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-light drop-shadow-md">
          — {personalInfo.heroAttribution}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 animate-pulse pb-2">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-white/70 font-light drop-shadow-md">Scroll to explore</p>
          <svg
            className="w-5 h-5 text-white/70 drop-shadow-md"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

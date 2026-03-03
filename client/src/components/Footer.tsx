import { siteMetadata } from "@/config/siteConfig";
import { useEffect, useRef } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = siteMetadata.lastUpdated;
  const scriptCreatedRef = useRef(false);

  useEffect(() => {
    // Check if script is already loaded
    if (!document.getElementById('mapmyvisitors')) {
      const script = document.createElement('script');
      script.id = 'mapmyvisitors';
      script.type = 'text/javascript';
      script.src = 'https://mapmyvisitors.com/map.js?cl=ffffff&w=400&t=tt&d=OsdhPxdEczfiTFHwqskcKzqDSwDY6eYWewwj-JzD56E&co=0f1827';
      script.async = true;
      
      const container = document.getElementById('mapmyvisitors-container');
      if (container) {
        container.appendChild(script);
        scriptCreatedRef.current = true;
      }
    }

    // Cleanup function to remove script when component unmounts
    // Only remove if this component instance created the script
    return () => {
      if (scriptCreatedRef.current) {
        const scriptElement = document.getElementById('mapmyvisitors');
        if (scriptElement && scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement);
        }
        scriptCreatedRef.current = false;
      }
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 font-light">
          © {currentYear} Yibin (Leon) Liu. Site last updated {lastUpdated}
        </p>
        <p className="text-center text-sm text-gray-500 font-light mt-2">
          Feel free to fork this GitHub and develop your website!{' '}
          <a 
            href="https://github.com/10-OASIS-01/10-OASIS-01.github.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            @10-OASIS-01/10-OASIS-01.github.io
          </a>
        </p>
        
        {/* Visitor Map Widget */}
        <div className="mt-6 flex justify-center">
          <div style={{ maxWidth: '400px', width: '100%' }}>
            <div 
              id="mapmyvisitors-container" 
              style={{ 
                maxWidth: '100%', 
                overflow: 'hidden'
              }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
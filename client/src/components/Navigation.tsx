import { useState } from "react";
import { Menu, X } from "lucide-react";
import { personalInfo, navigationMenu } from "@/config/siteConfig";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md z-50 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Name (single line) */}
          <div className="flex-shrink-0">
            <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">
              {personalInfo.name} | {personalInfo.chineseName}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navigationMenu.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-white/20">
            {navigationMenu.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white/20 transition-colors"
                onClick={() => setIsOpen(false)}
                {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

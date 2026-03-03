import { Mail, Github, Linkedin, Cloud } from "lucide-react";
import { personalInfo, images, socialLinks } from "@/config/siteConfig";

export default function SidebarProfile() {
  return (
    <div className="flex flex-col text-center items-center md:text-left">
      {/* Profile Photo */}
      <img
        className="mb-3 shadow justify-center items-center flex rounded-2xl object-cover w-48 h-48"
        src={images.profileAvatar}
        alt={personalInfo.name}
      />

      {/* Name */}
      <div className="text-xl text-blue-900 dark:text-blue-300 font-semibold">
        {personalInfo.name}
      </div>

      {/* Pronouns */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {personalInfo.pronouns}
      </div>

      {/* University */}
      <div className="text-center md:text-left text-sm text-gray-700 dark:text-gray-300 mt-2">
        {personalInfo.university}
      </div>

      {/* Location */}
      <div className="text-center md:text-left text-sm text-gray-600 dark:text-gray-400 mt-1">
        {personalInfo.location}
      </div>

      {/* Email */}
      <div className="email-item mt-4">
        <div className="text-sm text-gray-700 dark:text-gray-300 font-mono">
          {personalInfo.email.replace('@', '😊')}
        </div>
      </div>

      {/* Social Icons */}
      <div className="social-icons mt-6 flex justify-center md:justify-start gap-2">
        {socialLinks.googleScholar && (
          <a
            target="_blank"
            rel="noopener"
            href={socialLinks.googleScholar}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full text-blue-900 dark:text-blue-300 hover:bg-white dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all duration-300 transform hover:scale-125"
            title="Google Scholar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="17" r="5" />
              <path d="M12 3L2 9l10 6 10-6-10-6z" />
              <path d="M2 9v6" />
              <path d="M22 9v6" />
            </svg>
          </a>
        )}

        {socialLinks.github && (
          <a
            target="_blank"
            rel="noopener"
            href={socialLinks.github}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full text-blue-900 dark:text-blue-300 hover:bg-white dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all duration-300 transform hover:scale-125"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        )}

        {socialLinks.linkedin && (
          <a
            target="_blank"
            rel="noopener"
            href={socialLinks.linkedin}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full text-blue-900 dark:text-blue-300 hover:bg-white dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all duration-300 transform hover:scale-125"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}

        {socialLinks.bluesky && (
          <a
            target="_blank"
            rel="noopener"
            href={socialLinks.bluesky}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full text-blue-900 dark:text-blue-300 hover:bg-white dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all duration-300 transform hover:scale-125"
            title="Bluesky"
          >
            <Cloud className="w-5 h-5" />
          </a>
        )}

        {socialLinks.email && (
          <a
            target="_blank"
            rel="noopener"
            href={socialLinks.email}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full text-blue-900 dark:text-blue-300 hover:bg-white dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-all duration-300 transform hover:scale-125"
            title="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}

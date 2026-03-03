import { Calendar, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import SidebarProfile from "@/components/SidebarProfile";
import Footer from "@/components/Footer";
import { blogPosts, blogConfig } from "@/config/blogConfig";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Main Content Area with Sidebar */}
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-20">
            {/* Left Sidebar - Personal Info (3 columns) */}
            <aside className="lg:col-span-3">
              <div className="sticky top-24">
                <SidebarProfile />
              </div>
            </aside>

            {/* Right Content - Blog Posts (7 columns) */}
            <section className="lg:col-span-7">
              {/* Page Header */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-300 mb-4 border-b-2 border-blue-900 dark:border-blue-300 pb-2">
                  {blogConfig.title}
                </h1>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  {blogConfig.description}
                </p>
              </div>

              {/* Blog Posts - Single Column */}
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300 p-6"
                  >
                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-900 dark:hover:text-blue-300 transition-colors cursor-pointer">
                      {post.title}
                    </h2>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 text-xs font-semibold rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Excerpt */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Read More Button */}
                    <button className="px-6 py-2 bg-blue-900 dark:bg-blue-800 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors duration-200 font-semibold">
                      Read More →
                    </button>
                  </article>
                ))}
              </div>

              {/* Coming Soon Message */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 italic">
                  {blogConfig.comingSoonMessage}
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

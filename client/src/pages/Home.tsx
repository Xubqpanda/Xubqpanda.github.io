import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SidebarProfile from "@/components/SidebarProfile";
import MainContent from "@/components/MainContent";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - 50vh */}
      <HeroSection />

      {/* Profile and Content Section - Full width with proper spacing */}
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-20 w-full py-8">
            {/* Left Sidebar - 3 columns, sticky */}
            <div className="col-span-1 lg:col-span-3">
              <div className="flex flex-col text-center items-center md:text-left md:sticky md:top-20">
                <SidebarProfile />
              </div>
            </div>

            {/* Right Content - 7 columns, scrollable */}
            <div className="col-span-1 lg:col-span-7">
              <section className="flex justify-center mx-auto prose dark:prose-dark dark:text-white prose-md">
                <div className="w-full">
                  <MainContent />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

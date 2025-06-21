import { Home, FileText, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isScrolling, setIsScrolling] = useState(false);

  const TABS = [
    {
      label: 'Home',
      icon: <Home className='h-5 w-5' />,
      sectionId: 'home',
    },
    {
      label: 'Services',
      icon: <FileText className='h-5 w-5' />,
      sectionId: 'services',
    },
    {
      label: 'Contact',
      icon: <Phone className='h-5 w-5' />,
      sectionId: 'contact',
    },
  ];

  // Handle scroll to update active tab
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active tab while user is clicking and scrolling
      if (isScrolling) return;
      
      const sections = TABS.map(tab => ({
        id: tab.sectionId,
        element: document.getElementById(tab.sectionId),
        label: tab.label
      })).filter(section => section.element);

      const scrollY = window.scrollY + 100; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && scrollY >= section.element.offsetTop) {
          setActiveTab(section.label);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // Handle tab click to scroll to section
  const handleTabClick = (tab: typeof TABS[0]) => {
    // Immediately set active tab and disable scroll listener
    setActiveTab(tab.label);
    setIsScrolling(true);
    
    const element = document.getElementById(tab.sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Re-enable scroll listener after scroll completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust timing based on scroll duration
    } else {
      // If element not found, re-enable scroll listener quickly
      setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    }
  };

  return (
    <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40'>
      <div className='flex w-full space-x-2 rounded-xl bg-[#309f69] p-2 shadow-lg'>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              data-id={tab.label}
              type='button'
              onClick={() => handleTabClick(tab)}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300 transform ${
                isActive 
                  ? 'text-white bg-white/20 scale-110 shadow-md' 
                  : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
              }`}
              title={tab.label}
            >
              {tab.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

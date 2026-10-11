import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TusasongDashboard from './pages/TusasongDashboard.jsx'
import BlogList from './pages/BlogList.jsx'
import BlogPost from './pages/BlogPost.jsx'
import WorkshopSalesPage from './pages/WorkshopSalesPage.jsx'
import DropLandingPage from './pages/DropLandingPage.jsx'
import MasteringSalesPage from './pages/MasteringSalesPage.jsx'
import StudioDiaryPage from './pages/StudioDiaryPage.jsx'

function RootRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. VIP Route
  if (currentPath === '/vip/tusasong') {
    return <TusasongDashboard />;
  }

  // 2. Workshop Sales Page (/workshop o /live)
  if (currentPath === '/workshop' || currentPath === '/workshop/' || currentPath === '/live' || currentPath === '/live/') {
    return <WorkshopSalesPage />;
  }

  // 3. Individual Blog Post Route (/blog/:slug)
  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
    if (slug) {
      return <BlogPost slug={slug} onNavigate={navigate} />;
    }
  }

  // 4. Blog List Route (/blog)
  if (currentPath === '/blog' || currentPath === '/blog/') {
    return <BlogList onNavigate={navigate} />;
  }

  // 5. Studio Diary Page (/diary o /studio-diary)
  if (currentPath === '/diary' || currentPath === '/diary/' || currentPath === '/studio-diary' || currentPath === '/studio-diary/') {
    return <StudioDiaryPage onNavigate={navigate} />;
  }

  // 6. Links HUB (/links o /drop o /next)
  if (currentPath === '/links' || currentPath === '/links/' || currentPath === '/drop' || currentPath === '/drop/' || currentPath === '/next' || currentPath === '/next/') {
    return <DropLandingPage onNavigate={navigate} />;
  }

  // 7. Week Mastering Promo Page (/mastering)
  if (currentPath === '/mastering' || currentPath === '/mastering/') {
    return <MasteringSalesPage onNavigate={navigate} />;
  }

  // 7. Main Soundscape / Studio Home (/)
  return <App onNavigate={navigate} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
)

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/Layout/SmoothScroll';
import Navbar from './components/Layout/Navbar';
import Noise from './components/UI/Noise';
import Hero from './components/Sections/Hero';
import TechnicalBlueprint from './components/Sections/TechnicalBlueprint';
import MonolithGrid from './components/Sections/MonolithGrid';
import SilverSlateFAQ from './components/FAQ/SilverSlateFAQ';
import KineticFeed from './components/Feed/KineticFeed';
import SignatureFooter from './components/Footer/SignatureFooter';
import Preloader from './components/UI/Preloader';
import UserProfile from './components/User/UserProfile';

const HomePage: React.FC = () => {
  return (
    <main className="relative z-10 bg-cyber-black mb-[100vh] md:mb-[90vh] shadow-[0_20px_50px_rgba(0,0,0,1)]">
      <Hero />
      <div id="features"><MonolithGrid /></div>
      <div id="protocol"><TechnicalBlueprint /></div>
      <div id="updates"><KineticFeed /></div>
     
      {/* FAQ Removed as requested, replaced by User profile navigation logic */}
    </main>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // When preloader animation is done, we just remove the component.
  // The app behind it is already rendered and visible (z-index handled).
  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="bg-cyber-black text-cyber-white min-h-screen selection:bg-cyber-silver selection:text-cyber-black overflow-x-hidden">
      
      {/* Preloader - High Z-Index, unmounts after completion */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Grain Overlay */}
      <Noise />
      
      <Navbar />

      {/* Scroll Wrapper */}
      <SmoothScroll locked={isLoading}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={
            <div className="relative z-10 bg-cyber-black mb-[100vh] md:mb-[90vh] shadow-[0_20px_50px_rgba(0,0,0,1)]">
               <UserProfile />
            </div>
          } />
        </Routes>
        
        {/* Fixed Footer at Z-0 */}
        <SignatureFooter />

      </SmoothScroll>
    </div>
  );
}

export default App;
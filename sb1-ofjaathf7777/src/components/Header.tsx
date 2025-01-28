import React, { useState } from 'react';
import Logo from './Logo';
import Button from './ui/Button';
import PartnerApplicationForm from './partner/PartnerApplicationForm';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [showForm, setShowForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (id === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Book Now', href: '#booking' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Partners', href: '#partners' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div onClick={() => scrollToSection('')} className="cursor-pointer">
            <Logo />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href.replace('#', ''))}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
            <Button 
              variant="secondary"
              onClick={() => setShowForm(true)}
              className="text-sm px-4 py-2 border border-blue-600"
              size="small"
            >
              Become our partner
            </Button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href.replace('#', ''))}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 text-left"
                >
                  {link.name}
                </button>
              ))}
              <Button 
                variant="secondary"
                onClick={() => {
                  setShowForm(true);
                  setIsMenuOpen(false);
                }}
                className="text-sm px-4 py-2 border border-blue-600"
                size="small"
              >
                Become our partner
              </Button>
            </div>
          </nav>
        )}
      </div>

      {showForm && <PartnerApplicationForm onClose={() => setShowForm(false)} />}
    </header>
  );
}
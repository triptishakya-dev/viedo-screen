import React from 'react';
import Link from 'next/link';
import { Rocket, Globe, Mail, MessageSquare, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Rocket className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold tracking-tight text-foreground">
                Viedo
              </span>
            </Link>
            <p className="text-muted-foreground text-lg mb-8 max-w-sm leading-relaxed">
              Empowering creators and innovators with cutting-edge tools and resources to build the future.
            </p>
            <div className="flex space-x-5">
              {[Globe, MessageSquare, Share2, Mail].map((Icon, idx) => (
                <Link
                  key={idx}
                  href="#"
                  className="p-3 rounded-xl bg-muted hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Company</h3>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">Resources</h3>
            <ul className="space-y-4">
              {['Documentation', 'API Reference', 'Support', 'Guides'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Viedo. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="hover:text-foreground transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/">
              <img
                src="/new-logo.svg"
                alt="Tendas Logo"
                className="h-12 mb-4"
              />
            </Link>
            <p className="text-gray-400 mb-4">
              A company based in Beira making tarpaulins, tents, carports,
              bakkie covers, truck frames and canopies, awnings, drop blinds and
              doing all general heavy duty canvas and PVC work.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:info@tendasdemozambique.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category/tents"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tents
                </Link>
              </li>
              <li>
                <Link
                  to="/category/covers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Covers
                </Link>
              </li>
              <li>
                <Link
                  to="/rental"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Rental
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-[#1b5e20] mr-2 mt-1" size={18} />
                <p className="text-gray-400">Beira, Mozambique</p>
              </div>
              <div className="flex items-start">
                <Phone className="text-[#1b5e20] mr-2 mt-1" size={18} />
                <p className="text-gray-400">+258 84 398 9573</p>
              </div>
              <div className="flex items-start">
                <Mail className="text-[#1b5e20] mr-2 mt-1" size={18} />
                <p className="text-gray-400">info@tendasdemozambique.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} Tendas de Mozambique. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

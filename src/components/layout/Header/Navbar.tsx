"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSelector from "@/components/ui/LanguageSelector";
import MobileMenu from "./MobileMenu";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const menu = [
  { label: "Accueil", href: "/" },
  {
    label: "Grand-Popo",
    children: [
      { label: "Histoire & Culture", href: "/grand-popo/histoire" },
      { label: "Plages & Nature", href: "/grand-popo/plages" },
      { label: "Gastronomie Locale", href: "/grand-popo/gastronomie" },
      { label: "Hébergements", href: "/grand-popo/hebergements" },
    ],
  },
  {
    label: "Expériences",
    children: [
      { label: "Tours Privés & Groupes", href: "/experiences" },
      { label: "Expériences Sur-Mesure", href: "/experiences/sur-mesure" },
      { label: "Écotourisme & Éthique", href: "/experiences/ecotourisme" },
      { label: "Packages Complets", href: "/experiences/packages" },
    ],
  },
  {
    label: "Planifier",
    children: [
      { label: "Réservation Express", href: "/planifier/reservation" },
      { label: "Conseils Voyage", href: "/planifier/conseils" },
      { label: "Calendrier Disponibilités", href: "/planifier/calendrier" },
    ],
  },
  {
    label: "Manos",
    children: [
      { label: "Qui suis-je ?", href: "/manos" },
      { label: "Témoignages", href: "/manos/temoignages" },
      { label: "Galerie Photos/Vidéos", href: "/manos/galerie" },
    ],
  },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { scrollY } = useScrollAnimation();

  // Détermine si la navbar doit être transparente (sur la section hero)
  const isTransparent = scrollY < 100;
  const navbarClasses = isTransparent
    ? "w-full bg-transparent backdrop-blur-sm border-b border-white/10 fixed top-0 left-0 z-50 navbar-floating transition-all duration-300"
    : "w-full bg-white/95 backdrop-blur-md border-b border-gray-300 shadow-lg fixed top-0 left-0 z-50 navbar-fixed transition-all duration-300";

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-20 navbar-container gap-4">
        <Link href="/" className={`flex items-center gap-3 font-bold text-xl tracking-tight transition-colors duration-300 ${
          isTransparent ? 'text-white' : 'text-gray-800'
        }`}>
          <Image
            src="/images/logo.jpeg"
            alt="Logo Manos Tours"
            width={72}
            height={72}
            className="rounded-full object-cover navbar-logo"
            priority
          />
        </Link>
        <div className="hidden md:flex gap-6 items-center h-full navbar-desktop navbar-menu">
          {menu.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className={`navbar-link py-2 px-3 flex items-center gap-1 transition-colors duration-200 ${
                  isTransparent ? 'text-white hover:text-blue-200' : 'text-gray-700 hover:text-blue-600'
                }`}>
                  {item.label}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`navbar-dropdown absolute left-0 top-full mt-2 rounded-lg min-w-[220px] py-2 transition-all duration-200 z-50 bg-white shadow-xl border border-gray-200 ${openDropdown === item.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="navbar-dropdown-link block px-4 py-3 whitespace-nowrap transition-colors duration-150 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={`navbar-link py-2 px-3 transition-colors duration-200 ${
                  isTransparent ? 'text-white hover:text-blue-200' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Conteneur pour les éléments de droite */}
        <div className="flex items-center gap-4">
          {/* Sélecteur de langue */}
          <div className="hidden md:block navbar-language-selector">
            <LanguageSelector
              className="language-selector-visible language-selector-desktop"
            />
          </div>

          {/* Burger menu */}
          <button
            className={`hamburger-button md:hidden flex items-center p-3 rounded-lg transition-all duration-200 ${
              isTransparent
                ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
            }`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <svg className={`hamburger-icon w-6 h-6 transition-colors duration-200 ${
              isTransparent ? 'text-white' : 'text-gray-700'
            }`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      {/* Menu mobile */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menu={menu}
      />
    </nav>
  );
} 
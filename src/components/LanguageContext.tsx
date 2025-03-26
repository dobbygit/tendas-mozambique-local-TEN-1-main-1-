import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.tents": "Tents",
    "nav.whyUs": "Why Us",
    "nav.location": "Find Us",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "TENDAS DE MOZAMBIQUE",
    "hero.subtitle":
      "HIGH QUALITY TARPAULINS, TENTS AND MUCH MORE, MADE FOR THE AFRICAN SUN",
    "hero.cta": "Explore Tents",

    // Product Showcase
    "products.title": "Premium Outdoor Tents",
    "products.subtitle":
      "Explore our range of high-quality tents for camping, events, and outdoor adventures",
    "products.downloadCatalog": "Download Tent Catalog",
    "products.viewDetails": "View Details",
    "products.requestQuote": "Request Quote",

    // Statistics Section
    "stats.title": "Why Choose Our Tents",
    "stats.description":
      "We've been crafting premium outdoor tents for over 15 years, delivering quality and reliability.",
    "stats.tentsSold": "Tents Sold",
    "stats.yearsExperience": "Years Experience",
    "stats.tentModels": "Tent Models",
    "stats.satisfactionRate": "Satisfaction Rate",

    // Contact Section
    "contact.title": "Request a Tent Quote",
    "contact.subtitle":
      "Need a custom tent or have questions about our products? Send us a message and we'll get back to you within 24 hours.",
    "contact.emailUs": "Email Us",
    "contact.callUs": "Call Us",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.thankYou": "Thank You!",
    "contact.successMessage":
      "Your message has been sent successfully. We'll get back to you soon.",

    // Footer
    "footer.products": "Products",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.contactUs": "Contact Us",
    "footer.allRightsReserved": "All rights reserved.",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.tents": "Tendas",
    "nav.whyUs": "Porquê Nós",
    "nav.location": "Encontre-nos",
    "nav.contact": "Contacto",

    // Hero Section
    "hero.title": "TENDAS DE MOÇAMBIQUE",
    "hero.subtitle":
      "LONAS, TENDAS E MUITO MAIS DE ALTA QUALIDADE, FEITAS PARA O SOL AFRICANO",
    "hero.cta": "Explorar Tendas",

    // Product Showcase
    "products.title": "Tendas Premium para Exterior",
    "products.subtitle":
      "Explore a nossa gama de tendas de alta qualidade para camping, eventos e aventuras ao ar livre",
    "products.downloadCatalog": "Baixar Catálogo de Tendas",
    "products.viewDetails": "Ver Detalhes",
    "products.requestQuote": "Solicitar Orçamento",

    // Statistics Section
    "stats.title": "Por Que Escolher as Nossas Tendas",
    "stats.description":
      "Fabricamos tendas premium para exterior há mais de 15 anos, entregando qualidade e confiabilidade.",
    "stats.tentsSold": "Tendas Vendidas",
    "stats.yearsExperience": "Anos de Experiência",
    "stats.tentModels": "Modelos de Tendas",
    "stats.satisfactionRate": "Taxa de Satisfação",

    // Contact Section
    "contact.title": "Solicitar Orçamento de Tenda",
    "contact.subtitle":
      "Precisa de uma tenda personalizada ou tem perguntas sobre os nossos produtos? Envie-nos uma mensagem e responderemos em 24 horas.",
    "contact.emailUs": "O Nosso Email",
    "contact.callUs": "Ligue para Nós",
    "contact.name": "Nome",
    "contact.email": "Email",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.thankYou": "Obrigado!",
    "contact.successMessage":
      "A sua mensagem foi enviada com sucesso. Entraremos em contacto em breve.",

    // Footer
    "footer.products": "Produtos",
    "footer.company": "Empresa",
    "footer.support": "Suporte",
    "footer.contactUs": "Contacte-nos",
    "footer.allRightsReserved": "Todos os direitos reservados.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

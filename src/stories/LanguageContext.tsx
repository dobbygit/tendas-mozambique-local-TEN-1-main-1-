import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "pt";

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// English translations
const enTranslations: Translations = {
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.tents": "Tents",
  "nav.tarpaulins": "Tarpaulins",
  "nav.vehicleCovers": "Vehicle Covers",
  "nav.shadeStructures": "Shade Structures",
  "nav.customWork": "Custom Work",
  "nav.rental": "Rental",
  "nav.whyUs": "Why Us",
  "nav.contact": "Contact",
  "nav.requestQuote": "Request Quote",

  "products.title": "Premium Outdoor Tents",
  "products.subtitle":
    "Explore our range of high-quality tents for camping, events, and outdoor adventures",
  "products.viewDetails": "View Details",
  "products.requestQuote": "Request Quote",
  "products.ourProducts": "Our Products",
  "products.leadingManufacturer": "Leading manufacturer of PVC products",
  "products.professionalGrade":
    "Professional-grade tarpaulins, tents, and custom PVC products designed to withstand the african climate",
  "product.photos": "photos",

  "filter.allCategories": "All Categories",
  "filter.filterBy": "Filter by Category",

  "footer.products": "Products",
  "footer.tents": "Tents",
  "footer.tarpaulins": "Tarpaulins",
  "footer.vehicleCovers": "Vehicle Covers",
  "footer.shadeStructures": "Shade Structures",
  "footer.customWork": "Custom Work",
  "footer.company": "Company",
  "footer.aboutUs": "About Us",
  "footer.whyChooseUs": "Why Choose Us",
  "footer.testimonials": "Testimonials",
  "footer.services": "Services",
  "footer.rental": "Rental",
  "footer.installation": "Installation",
  "footer.maintenance": "Maintenance",
  "footer.repairs": "Repairs",
  "footer.contact": "Contact",
  "footer.getInTouch": "Get In Touch",
  "footer.requestQuote": "Request Quote",
  "footer.findUs": "Find Us",
  "footer.allRightsReserved": "All rights reserved",

  "whyUs.title": "Why Choose Us",
  "whyUs.subtitle":
    "Tendas de Mozambique - Your trusted partner for high-quality tents and PVC products",
  "whyUs.heading": "Crafting Excellence in Every Stitch",
  "whyUs.paragraph1":
    "A company based in Beira making tarpaulins, tents, carports, bakkie covers, truck frames and canopies, awnings, drop blinds and doing all general heavy duty canvas and PVC work.",
  "whyUs.paragraph2":
    "We make standard tents and custom tents – from the smallest dome tent to the largest party marquee or warehouse tent. Using only the best materials and designs, we are suppliers to many heavy duty users such as safari camps, long term construction camps, the military and the police.",
  "whyUs.paragraph3":
    "Tendas de Mozambique has a wide range of colours in material proven to stand up to the Moçambique sun.",
  "whyUs.contactUs": "Contact Us Today",
  "whyUs.challenge": "Give us a challenge…",
  "whyUs.challengeDescription":
    "Contact us with your requirement and our expert tent staff will guide you through our range.",
  "whyUs.expertiseTitle": "Our Expertise & Services",
  "whyUs.expertiseDescription":
    "With years of experience and dedication to quality, we provide comprehensive solutions for all your tent and PVC needs.",
  "whyUs.ctaTitle": "Give Us a Challenge",
  "whyUs.ctaDescription":
    "Contact us with your requirement and our expert tent staff will guide you through our range. We can come on site to advise on a new camp or to repair an existing tent.",
  "whyUs.exploreOurProducts": "Explore Our Products",
  "whyUs.premiumQualityMaterials": "Premium Quality Materials",
  "whyUs.premiumQualityMaterialsDesc":
    "We use only the highest quality PVC and canvas materials that are UV-resistant and durable.",
  "whyUs.customSolutions": "Custom Solutions",
  "whyUs.customSolutionsDesc":
    "We design and manufacture products tailored to your specific requirements and specifications.",
  "whyUs.expertStaff": "Expert Staff",
  "whyUs.expertStaffDesc":
    "Our team has decades of combined experience in tent and PVC product manufacturing.",
  "whyUs.onSiteServices": "On-Site Services",
  "whyUs.onSiteServicesDesc":
    "We offer on-site consultations, installations, and repairs throughout Mozambique.",
  "whyUs.trustedByProfessionals": "Trusted By Professionals",
  "whyUs.trustedByProfessionalsDesc":
    "We supply to safari camps, construction companies, military, and government organizations.",
  "whyUs.wideColorRange": "Wide Color Range",
  "whyUs.wideColorRangeDesc":
    "Choose from our extensive range of colors to match your branding or aesthetic preferences.",
};

// Portuguese translations
const ptTranslations: Translations = {
  "nav.home": "Início",
  "nav.products": "Produtos",
  "nav.tents": "Tendas",
  "nav.tarpaulins": "Lonas",
  "nav.vehicleCovers": "Capas de Veículos",
  "nav.shadeStructures": "Estruturas de Sombra",
  "nav.customWork": "Trabalho Personalizado",
  "nav.rental": "Aluguer",
  "nav.whyUs": "Porquê Nós",
  "nav.contact": "Contacto",
  "nav.requestQuote": "Solicitar Orçamento",

  "products.title": "Tendas Premium para Exterior",
  "products.subtitle":
    "Explore a nossa gama de tendas de alta qualidade para camping, eventos e aventuras ao ar livre",
  "products.viewDetails": "Ver Detalhes",
  "products.requestQuote": "Solicitar Orçamento",
  "products.ourProducts": "Nossos Produtos",
  "products.leadingManufacturer": "Fabricante líder de produtos em PVC",
  "products.professionalGrade":
    "Lonas, tendas e produtos de PVC personalizados de qualidade profissional, projetados para resistir ao clima africano",
  "product.photos": "fotos",

  "filter.allCategories": "Todas as Categorias",
  "filter.filterBy": "Filtrar por Categoria",

  "footer.products": "Produtos",
  "footer.tents": "Tendas",
  "footer.tarpaulins": "Lonas",
  "footer.vehicleCovers": "Capas de Veículos",
  "footer.shadeStructures": "Estruturas de Sombra",
  "footer.customWork": "Trabalho Personalizado",
  "footer.company": "Empresa",
  "footer.aboutUs": "Sobre Nós",
  "footer.whyChooseUs": "Porquê Escolher-nos",
  "footer.testimonials": "Testemunhos",
  "footer.services": "Serviços",
  "footer.rental": "Aluguer",
  "footer.installation": "Instalação",
  "footer.maintenance": "Manutenção",
  "footer.repairs": "Reparações",
  "footer.contact": "Contacto",
  "footer.getInTouch": "Entre em Contacto",
  "footer.requestQuote": "Solicitar Orçamento",
  "footer.findUs": "Encontre-nos",
  "footer.allRightsReserved": "Todos os direitos reservados",

  "whyUs.title": "Porquê Escolher-nos",
  "whyUs.subtitle":
    "Tendas de Moçambique - O seu parceiro de confiança para tendas e produtos de PVC de alta qualidade",
  "whyUs.heading": "Excelência em Cada Costura",
  "whyUs.paragraph1":
    "Uma empresa sediada na Beira que fabrica lonas, tendas, telheiros para carros, capas para carrinhas, estruturas e capotas para camiões, toldos, cortinas e realiza todos os trabalhos gerais em lona e PVC de alta resistência.",
  "whyUs.paragraph2":
    "Fabricamos tendas padrão e tendas personalizadas – desde a menor tenda de cúpula até à maior tenda de festa ou tenda de armazém. Utilizando apenas os melhores materiais e designs, somos fornecedores de muitos utilizadores de alta resistência, como acampamentos de safari, acampamentos de construção de longo prazo, militares e polícia.",
  "whyUs.paragraph3":
    "A Tendas de Moçambique tem uma ampla gama de cores em material comprovado para resistir ao sol de Moçambique.",
  "whyUs.contactUs": "Contacte-nos Hoje",
  "whyUs.challenge": "Dê-nos um desafio…",
  "whyUs.challengeDescription":
    "Contacte-nos com o seu requisito e a nossa equipa especializada em tendas irá orientá-lo através da nossa gama.",
  "whyUs.expertiseTitle": "Nossa Experiência e Serviços",
  "whyUs.expertiseDescription":
    "Com anos de experiência e dedicação à qualidade, fornecemos soluções abrangentes para todas as suas necessidades de tendas e PVC.",
  "whyUs.ctaTitle": "Dê-nos um Desafio",
  "whyUs.ctaDescription":
    "Contacte-nos com o seu requisito e a nossa equipa especializada em tendas irá orientá-lo através da nossa gama. Podemos ir ao local para aconselhar sobre um novo acampamento ou para reparar uma tenda existente.",
  "whyUs.exploreOurProducts": "Explore Nossos Produtos",
  "whyUs.premiumQualityMaterials": "Materiais de Qualidade Premium",
  "whyUs.premiumQualityMaterialsDesc":
    "Utilizamos apenas materiais de PVC e lona da mais alta qualidade, resistentes aos raios UV e duráveis.",
  "whyUs.customSolutions": "Soluções Personalizadas",
  "whyUs.customSolutionsDesc":
    "Projetamos e fabricamos produtos adaptados às suas necessidades e especificações específicas.",
  "whyUs.expertStaff": "Equipa Especializada",
  "whyUs.expertStaffDesc":
    "A nossa equipa tem décadas de experiência combinada no fabrico de tendas e produtos de PVC.",
  "whyUs.onSiteServices": "Serviços no Local",
  "whyUs.onSiteServicesDesc":
    "Oferecemos consultas, instalações e reparações no local em todo Moçambique.",
  "whyUs.trustedByProfessionals": "Confiado por Profissionais",
  "whyUs.trustedByProfessionalsDesc":
    "Fornecemos para acampamentos de safari, empresas de construção, militares e organizações governamentais.",
  "whyUs.wideColorRange": "Ampla Gama de Cores",
  "whyUs.wideColorRangeDesc":
    "Escolha entre a nossa extensa gama de cores para combinar com a sua marca ou preferências estéticas.",
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // Initialize language from localStorage or browser language
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language | null;
      if (savedLanguage) {
        return savedLanguage;
      }
      // Check browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "pt") {
        return "pt";
      }
    }
    return "en";
  });

  // Update localStorage when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const translations = language === "en" ? enTranslations : ptTranslations;
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;

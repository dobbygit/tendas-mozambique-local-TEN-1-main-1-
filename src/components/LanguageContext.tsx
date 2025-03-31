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
    rental: "Rental",

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
    "products.ourProducts": "Our Products",
    "products.leadingManufacturer": "Leading manufacturer of PVC products",
    "products.professionalGrade":
      "Professional-grade tarpaulins, tents, and custom PVC products designed to withstand the african climate",

    // Statistics Section
    "stats.title": "Why Choose Our Products",
    "stats.description":
      "We've been crafting premium outdoor Products for over 21 years, delivering quality and reliablity.",
    "stats.tentsSold": "Tents Sold",
    "stats.yearsExperience": "Years Experience",
    "stats.tentModels": "Tent Models",
    "stats.satisfactionRate": "Satisfaction Rate",

    // Contact Section
    "contact.title": "Request a Quote",
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
    "contact.yourName": "Your name",
    "contact.yourEmail": "Your email address",
    "contact.yourMessage": "Your message",

    // Footer
    "footer.products": "Products",
    "footer.company": "Company",
    "footer.support": "Support",
    "footer.contactUs": "Contact Us",
    "footer.allRightsReserved": "All rights reserved.",
    "footer.developedBy": "Developed by",

    // Product Page
    "product.backToHome": "Back to Home",
    "product.productNotFound": "Product Not Found",
    "product.productNotFoundDesc":
      "The product you're looking for doesn't exist or has been removed.",
    "product.home": "Home",
    "product.products": "Products",
    "product.weight": "Weight",
    "product.seasonality": "Seasonality",
    "product.capacity": "Capacity",
    "product.productDescription": "Product Description",
    "product.keyFeatures": "Key Features",
    "product.premiumQuality":
      "Premium quality materials built to withstand African climate",
    "product.customSizing":
      "Custom sizing available to fit your exact requirements",
    "product.professionalInstallation":
      "Professional installation and maintenance services",
    "product.wideRange": "Wide range of colors and designs available",
    "product.requestCustomQuote": "Request Custom Quote",
    "product.contactWithin24Hours": "Our team will contact you within 24 hours",
    "product.relatedProducts": "Related Products",
    "product.photos": "photos",

    // Rental Page
    "rental.title": "Equipment Rental",
    "rental.subtitle":
      "High-quality tents, shade structures, and equipment for your events, camping trips, or commercial needs",
    "rental.whyRentWithUs": "Why Rent With Us",
    "rental.catalog": "Rental Catalog",
    "rental.catalogDescription":
      "Browse our selection of high-quality rental equipment for any occasion",
    "rental.allItems": "All Items",
    "rental.tents": "Tents",
    "rental.shadeStructures": "Shade Structures",
    "rental.coversAndTarpaulins": "Covers & Tarpaulins",
    "rental.contactForPricing": "Contact us for pricing and availability",
    "rental.requestQuote": "Request Quote",
    "rental.retry": "Retry",
    "rental.rentals": "Rentals",
    "rental.highQualityTents":
      "High-quality tents for your events or commercial needs",
    "rental.whyRentTentsWithUs": "Why Rent Tents With Us",
    "rental.flexibleRentalPeriods": "Flexible Rental Periods",
    "rental.flexibleRentalPeriodsDesc":
      "Daily, weekly, or monthly rental options to suit your specific needs",
    "rental.premiumQuality": "Premium Quality",
    "rental.premiumQualityDesc":
      "All equipment is regularly maintained and cleaned to ensure top condition",
    "rental.deliveryAndSetup": "Delivery & Setup",
    "rental.deliveryAndSetupDesc":
      "Professional delivery, installation, and takedown services available",
    "rental.customQuotes": "Custom Quotes",
    "rental.customQuotesDesc":
      "Personalized quotes based on your specific needs and rental duration",

    // Rental Request Section
    "rentalRequest.rentPremiumOutdoorEquipment":
      "Rent Premium Outdoor Equipment",
    "rentalRequest.highQualityTents":
      "High-quality tents, shade structures, and equipment for your events, camping trips, or commercial needs",
    "rentalRequest.whyRentWithUs": "Why Rent With Us",
    "rentalRequest.premiumQualityEquipment": "Premium quality equipment",
    "rentalRequest.flexibleRentalPeriods": "Flexible rental periods",
    "rentalRequest.professionalSetup": "Professional setup and takedown",
    "rentalRequest.competitivePricing": "Competitive pricing",
    "rentalRequest.viewFullRentalCatalog": "View Full Rental Catalog",
    "rentalRequest.quickRentalInquiry": "Quick Rental Inquiry",
    "rentalRequest.equipmentType": "EQUIPMENT TYPE",
    "rentalRequest.selectEquipmentType": "Select equipment type",
    "rentalRequest.marquee": "18x9 Marquee Tent",
    "rentalRequest.shadePort": "Shade Port",
    "rentalRequest.rentalDuration": "RENTAL DURATION",
    "rentalRequest.selectDuration": "Select duration",
    "rentalRequest.oneDay": "1 Day",
    "rentalRequest.weekend": "Weekend (2-3 days)",
    "rentalRequest.oneWeek": "1 Week",
    "rentalRequest.oneMonth": "1 Month",
    "rentalRequest.customPeriod": "Custom Period",
    "rentalRequest.phoneNumber": "PHONE NUMBER",
    "rentalRequest.yourPhoneNumber": "Your phone number",
    "rentalRequest.requestRentalInformation": "Request Rental Information",
    "rentalRequest.processing": "Processing...",
    "rentalRequest.requestReceived": "Request Received!",
    "rentalRequest.contactShortly":
      "We'll contact you shortly with rental information and availability.",

    // Why Us Page
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
    "whyUs.premiumQualityMaterials": "Premium Quality Materials",
    "whyUs.premiumQualityMaterialsDesc":
      "We use only the highest quality materials that are proven to withstand the harsh African sun and weather conditions.",
    "whyUs.customSolutions": "Custom Solutions",
    "whyUs.customSolutionsDesc":
      "From the smallest dome tent to the largest warehouse tent, we create custom solutions tailored to your specific needs.",
    "whyUs.expertStaff": "Expert Staff",
    "whyUs.expertStaffDesc":
      "Our team of experts will guide you through our range and help you find the perfect solution for your requirements.",
    "whyUs.onSiteServices": "On-Site Services",
    "whyUs.onSiteServicesDesc":
      "We can come on site to advise on a new camp or to repair an existing tent, providing comprehensive support.",
    "whyUs.trustedByProfessionals": "Trusted by Professionals",
    "whyUs.trustedByProfessionalsDesc":
      "We are suppliers to many heavy-duty users such as safari camps, construction camps, the military, and the police.",
    "whyUs.wideColorRange": "Wide Color Range",
    "whyUs.wideColorRangeDesc":
      "We offer a wide range of colors in materials that are proven to stand up to the Moçambique sun.",
    "whyUs.exploreOurProducts": "Explore Our Products",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.tents": "Tendas",
    "nav.whyUs": "Porquê Nós",
    "nav.location": "Encontre-nos",
    "nav.contact": "Contacto",
    rental: "Aluguer",

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
    "products.ourProducts": "Nossos Produtos",
    "products.leadingManufacturer": "Fabricante líder de produtos em PVC",
    "products.professionalGrade":
      "Lonas, tendas e produtos personalizados de PVC de qualidade profissional, projetados para resistir ao clima africano",

    // Statistics Section
    "stats.title": "Por Que Escolher os Nossos Produtos",
    "stats.description":
      "Fabricamos produtos premium para exterior há mais de 21 anos, entregando qualidade e confiabilidade.",
    "stats.tentsSold": "Tendas Vendidas",
    "stats.yearsExperience": "Anos de Experiência",
    "stats.tentModels": "Modelos de Tendas",
    "stats.satisfactionRate": "Taxa de Satisfação",

    // Contact Section
    "contact.title": "Solicitar Orçamento",
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
    "contact.yourName": "Seu nome",
    "contact.yourEmail": "Seu endereço de email",
    "contact.yourMessage": "Sua mensagem",

    // Footer
    "footer.products": "Produtos",
    "footer.company": "Empresa",
    "footer.support": "Suporte",
    "footer.contactUs": "Contacte-nos",
    "footer.allRightsReserved": "Todos os direitos reservados.",
    "footer.developedBy": "Desenvolvido por",

    // Product Page
    "product.backToHome": "Voltar para Início",
    "product.productNotFound": "Produto Não Encontrado",
    "product.productNotFoundDesc":
      "O produto que procura não existe ou foi removido.",
    "product.home": "Início",
    "product.products": "Produtos",
    "product.weight": "Peso",
    "product.seasonality": "Sazonalidade",
    "product.capacity": "Capacidade",
    "product.productDescription": "Descrição do Produto",
    "product.keyFeatures": "Características Principais",
    "product.premiumQuality":
      "Materiais de qualidade premium construídos para resistir ao clima africano",
    "product.customSizing":
      "Dimensionamento personalizado disponível para atender às suas necessidades específicas",
    "product.professionalInstallation":
      "Serviços profissionais de instalação e manutenção",
    "product.wideRange": "Ampla gama de cores e designs disponíveis",
    "product.requestCustomQuote": "Solicitar Orçamento Personalizado",
    "product.contactWithin24Hours":
      "Nossa equipe entrará em contato em 24 horas",
    "product.relatedProducts": "Produtos Relacionados",
    "product.photos": "fotos",

    // Rental Page
    "rental.title": "Aluguer de Equipamentos",
    "rental.subtitle":
      "Tendas, estruturas de sombra e equipamentos de alta qualidade para seus eventos, acampamentos ou necessidades comerciais",
    "rental.whyRentWithUs": "Por Que Alugar Conosco",
    "rental.catalog": "Catálogo de Aluguer",
    "rental.catalogDescription":
      "Navegue pela nossa seleção de equipamentos de aluguer de alta qualidade para qualquer ocasião",
    "rental.allItems": "Todos os Itens",
    "rental.tents": "Tendas",
    "rental.shadeStructures": "Estruturas de Sombra",
    "rental.coversAndTarpaulins": "Coberturas e Lonas",
    "rental.contactForPricing": "Contacte-nos para preços e disponibilidade",
    "rental.requestQuote": "Solicitar Orçamento",
    "rental.retry": "Tentar Novamente",
    "rental.rentals": "Alugueres",
    "rental.highQualityTents":
      "Tendas de alta qualidade para seus eventos ou necessidades comerciais",
    "rental.whyRentTentsWithUs": "Por Que Alugar Tendas Conosco",
    "rental.flexibleRentalPeriods": "Períodos de Aluguer Flexíveis",
    "rental.flexibleRentalPeriodsDesc":
      "Opções de aluguer diário, semanal ou mensal para atender às suas necessidades específicas",
    "rental.premiumQuality": "Qualidade Premium",
    "rental.premiumQualityDesc":
      "Todos os equipamentos são regularmente mantidos e limpos para garantir a melhor condição",
    "rental.deliveryAndSetup": "Entrega e Montagem",
    "rental.deliveryAndSetupDesc":
      "Serviços profissionais de entrega, instalação e desmontagem disponíveis",
    "rental.customQuotes": "Orçamentos Personalizados",
    "rental.customQuotesDesc":
      "Orçamentos personalizados com base nas suas necessidades específicas e duração do aluguer",

    // Rental Request Section
    "rentalRequest.rentPremiumOutdoorEquipment":
      "Alugue Equipamentos Premium para Exterior",
    "rentalRequest.highQualityTents":
      "Tendas, estruturas de sombra e equipamentos de alta qualidade para seus eventos, acampamentos ou necessidades comerciais",
    "rentalRequest.whyRentWithUs": "Por Que Alugar Conosco",
    "rentalRequest.premiumQualityEquipment": "Equipamento de qualidade premium",
    "rentalRequest.flexibleRentalPeriods": "Períodos de aluguer flexíveis",
    "rentalRequest.professionalSetup": "Montagem e desmontagem profissional",
    "rentalRequest.competitivePricing": "Preços competitivos",
    "rentalRequest.viewFullRentalCatalog": "Ver Catálogo Completo de Aluguer",
    "rentalRequest.quickRentalInquiry": "Consulta Rápida de Aluguer",
    "rentalRequest.equipmentType": "TIPO DE EQUIPAMENTO",
    "rentalRequest.selectEquipmentType": "Selecione o tipo de equipamento",
    "rentalRequest.marquee": "Tenda Marquise 18x9",
    "rentalRequest.shadePort": "Estrutura de Sombra",
    "rentalRequest.rentalDuration": "DURAÇÃO DO ALUGUER",
    "rentalRequest.selectDuration": "Selecione a duração",
    "rentalRequest.oneDay": "1 Dia",
    "rentalRequest.weekend": "Fim de Semana (2-3 dias)",
    "rentalRequest.oneWeek": "1 Semana",
    "rentalRequest.oneMonth": "1 Mês",
    "rentalRequest.customPeriod": "Período Personalizado",
    "rentalRequest.phoneNumber": "NÚMERO DE TELEFONE",
    "rentalRequest.yourPhoneNumber": "Seu número de telefone",
    "rentalRequest.requestRentalInformation":
      "Solicitar Informações de Aluguer",
    "rentalRequest.processing": "Processando...",
    "rentalRequest.requestReceived": "Solicitação Recebida!",
    "rentalRequest.contactShortly":
      "Entraremos em contato em breve com informações de aluguer e disponibilidade.",

    // Why Us Page
    "whyUs.title": "Por Que Escolher-nos",
    "whyUs.subtitle":
      "Tendas de Moçambique - Seu parceiro de confiança para tendas e produtos de PVC de alta qualidade",
    "whyUs.heading": "Excelência em Cada Costura",
    "whyUs.paragraph1":
      "Uma empresa sediada na Beira que fabrica lonas, tendas, coberturas para carros, coberturas para caminhonetes, estruturas e coberturas para caminhões, toldos, cortinas e realiza todos os trabalhos gerais em lona e PVC de alta resistência.",
    "whyUs.paragraph2":
      "Fabricamos tendas padrão e tendas personalizadas – desde a menor tenda de cúpula até a maior tenda para festas ou armazém. Usando apenas os melhores materiais e designs, somos fornecedores para muitos usuários de alta resistência, como acampamentos de safari, acampamentos de construção de longo prazo, militares e polícia.",
    "whyUs.paragraph3":
      "Tendas de Moçambique possui uma ampla gama de cores em material comprovado para resistir ao sol de Moçambique.",
    "whyUs.contactUs": "Contacte-nos Hoje",
    "whyUs.challenge": "Dê-nos um desafio…",
    "whyUs.challengeDescription":
      "Entre em contato conosco com sua necessidade e nossa equipe especializada em tendas o guiará através da nossa gama.",
    "whyUs.expertiseTitle": "Nossa Experiência e Serviços",
    "whyUs.expertiseDescription":
      "Com anos de experiência e dedicação à qualidade, fornecemos soluções abrangentes para todas as suas necessidades de tendas e PVC.",
    "whyUs.ctaTitle": "Dê-nos um Desafio",
    "whyUs.ctaDescription":
      "Entre em contato conosco com sua necessidade e nossa equipe especializada em tendas o guiará através da nossa gama. Podemos ir ao local para aconselhar sobre um novo acampamento ou para reparar uma tenda existente.",
    "whyUs.premiumQualityMaterials": "Materiais de Qualidade Premium",
    "whyUs.premiumQualityMaterialsDesc":
      "Usamos apenas materiais da mais alta qualidade, comprovados para resistir ao sol africano intenso e às condições climáticas.",
    "whyUs.customSolutions": "Soluções Personalizadas",
    "whyUs.customSolutionsDesc":
      "Da menor tenda de cúpula à maior tenda de armazém, criamos soluções personalizadas adaptadas às suas necessidades específicas.",
    "whyUs.expertStaff": "Equipe Especializada",
    "whyUs.expertStaffDesc":
      "Nossa equipe de especialistas o guiará através da nossa gama e ajudará a encontrar a solução perfeita para suas necessidades.",
    "whyUs.onSiteServices": "Serviços no Local",
    "whyUs.onSiteServicesDesc":
      "Podemos ir ao local para aconselhar sobre um novo acampamento ou para reparar uma tenda existente, fornecendo suporte abrangente.",
    "whyUs.trustedByProfessionals": "Confiado por Profissionais",
    "whyUs.trustedByProfessionalsDesc":
      "Somos fornecedores para muitos usuários de alta resistência, como acampamentos de safari, acampamentos de construção, militares e polícia.",
    "whyUs.wideColorRange": "Ampla Gama de Cores",
    "whyUs.wideColorRangeDesc":
      "Oferecemos uma ampla gama de cores em materiais comprovados para resistir ao sol de Moçambique.",
    "whyUs.exploreOurProducts": "Explore Nossos Produtos",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LanguageProvider = ({ children }: { children: ReactNode }) => {
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

export { LanguageProvider };
export default LanguageProvider;

import { useTranslation, Language } from '@/i18n/LanguageContext';
import styled from 'styled-components';

// Bandeira dos EUA (English)
const USFlag = () => (
  <svg viewBox="0 0 30 20" width="24" height="16">
    <rect width="30" height="20" fill="#B22234"/>
    <rect width="30" height="1.54" y="1.54" fill="white"/>
    <rect width="30" height="1.54" y="4.62" fill="white"/>
    <rect width="30" height="1.54" y="7.69" fill="white"/>
    <rect width="30" height="1.54" y="10.77" fill="white"/>
    <rect width="30" height="1.54" y="13.85" fill="white"/>
    <rect width="30" height="1.54" y="16.92" fill="white"/>
    <rect width="12" height="10.77" fill="#3C3B6E"/>
  </svg>
);

// Bandeira do Brasil (Português)
const BRFlag = () => (
  <svg viewBox="0 0 30 20" width="24" height="16">
    <rect width="30" height="20" fill="#009C3B"/>
    <polygon points="15,2 28,10 15,18 2,10" fill="#FFDF00"/>
    <circle cx="15" cy="10" r="5" fill="#002776"/>
    <path d="M11.5 10 Q15 7.5 18.5 10" stroke="#FFDF00" strokeWidth="0.5" fill="none"/>
  </svg>
);

// Bandeira da Itália (Italiano)
const ITFlag = () => (
  <svg viewBox="0 0 30 20" width="24" height="16">
    <rect width="10" height="20" fill="#009246"/>
    <rect x="10" width="10" height="20" fill="white"/>
    <rect x="20" width="10" height="20" fill="#CE2B37"/>
  </svg>
);

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LanguageButton = styled.button<{ $active: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${props => props.$active ? '3px solid white' : '2px solid transparent'};
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${props => props.$active ? 1 : 0.7};
  transform: ${props => props.$active ? 'scale(1.1)' : 'scale(1)'};

  &:hover {
    opacity: 1;
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    border-radius: 3px;
    overflow: hidden;
  }
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-right: 0.5rem;
`;

export default function LanguageSelector() {
  const { language, changeLanguage, t, mounted } = useTranslation();

  if (!mounted) return null;

  const languages: { code: Language; flag: React.ReactNode; name: string }[] = [
    { code: 'en', flag: <USFlag />, name: t('languages.en') },
    { code: 'pt', flag: <BRFlag />, name: t('languages.pt') },
    { code: 'it', flag: <ITFlag />, name: t('languages.it') },
  ];

  return (
    <SelectorContainer>
      <Label>{t('menu.languageSelector')}</Label>
      {languages.map((lang) => (
        <LanguageButton
          key={lang.code}
          $active={language === lang.code}
          onClick={() => changeLanguage(lang.code)}
          title={lang.name}
        >
          {lang.flag}
        </LanguageButton>
      ))}
    </SelectorContainer>
  );
}

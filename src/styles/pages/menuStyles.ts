import styled, { keyframes } from "styled-components";

// Animação de flutuação suave
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

// Animação de pulso no botão
const pulse = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px 10px rgba(255, 255, 255, 0.2); }
`;

// Animação de brilho no título
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Animação de entrada
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LanguageSelectorContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

const MenuContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
  padding: 20px;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Cartas decorativas flutuantes */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 160px;
    border-radius: 12px;
    background: linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
    border: 2px solid rgba(255,255,255,0.3);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    animation: ${float} 6s ease-in-out infinite;
  }

  &::before {
    top: 10%;
    left: 10%;
    animation-delay: 0s;
    transform: rotate(-15deg);
  }

  &::after {
    bottom: 15%;
    right: 10%;
    animation-delay: 3s;
    transform: rotate(15deg);
  }
`;

// Container das cartas decorativas extras
const FloatingCards = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const FloatingCard = styled.div<{ $delay: number; $position: { top?: string; bottom?: string; left?: string; right?: string }; $rotation: number }>`
  position: absolute;
  width: 80px;
  height: 110px;
  border-radius: 10px;
  background: linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
  border: 2px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  animation: ${float} ${props => 5 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  ${props => props.$position.top && `top: ${props.$position.top};`}
  ${props => props.$position.bottom && `bottom: ${props.$position.bottom};`}
  ${props => props.$position.left && `left: ${props.$position.left};`}
  ${props => props.$position.right && `right: ${props.$position.right};`}
  transform: rotate(${props => props.$rotation}deg);

  &::before {
    content: '🎴';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    opacity: 0.6;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
`;

const GameIcon = styled.div`
  font-size: 5rem;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 10px 30px rgba(0,0,0,0.3));
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 800;
  text-align: center;
  background: linear-gradient(
    90deg,
    #fff 0%,
    #ffd700 25%,
    #fff 50%,
    #ffd700 75%,
    #fff 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite;
  text-shadow: none;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  letter-spacing: -2px;
  margin: 0;
  line-height: 1.1;

  span {
    display: block;
    font-size: 0.5em;
    font-weight: 400;
    opacity: 0.9;
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-top: 0.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  max-width: 400px;
  line-height: 1.6;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const FeaturesList = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 1.2rem 3rem;
  font-size: 1.3rem;
  font-weight: 700;
  color: #667eea;
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.2),
    0 0 0 4px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: ${pulse} 2s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
      0 15px 50px rgba(0, 0, 0, 0.3),
      0 0 0 4px rgba(255, 255, 255, 0.5);
    animation: none;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
`;

// Modos de jogo
const GameModesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 320px;
  margin-top: 1rem;
`;

const ModeButton = styled.button<{ $mode: 'challenge' | 'duel' }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background: ${props => props.$mode === 'challenge'
    ? 'linear-gradient(145deg, #10b981, #059669)'
    : 'linear-gradient(145deg, #3b82f6, #2563eb)'};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${props => props.$mode === 'challenge'
    ? '0 12px 40px rgba(16, 185, 129, 0.4)'
    : '0 12px 40px rgba(59, 130, 246, 0.4)'};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const ModeIcon = styled.div`
  font-size: 2rem;
`;

const ModeInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ModeTitle = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const ModeDescription = styled.span`
  font-size: 0.8rem;
  opacity: 0.9;
  font-weight: 400;
`;

// Botão de histórico
const HistoryButton = styled.button`
  margin-top: 1.5rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }
`;

export {
  LanguageSelectorContainer,
  MenuContainer,
  ContentWrapper,
  FloatingCards,
  FloatingCard,
  GameIcon,
  Title,
  Subtitle,
  FeaturesList,
  Feature,
  Button,
  ButtonIcon,
  GameModesContainer,
  ModeButton,
  ModeIcon,
  ModeInfo,
  ModeTitle,
  ModeDescription,
  HistoryButton
};

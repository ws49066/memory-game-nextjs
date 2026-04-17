import styled, { keyframes } from "styled-components";

// Animação de flutuação suave
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

// Animação de gradiente
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Animação de pulso no troféu
const trophyPulse = keyframes`
  0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.5)); }
  50% { transform: scale(1.15) rotate(0deg); filter: drop-shadow(0 0 50px rgba(255, 215, 0, 0.8)); }
`;

// Animação de entrada
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Animação de brilho
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

// Animação de confete caindo
const confettiFall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
`;

// Animação de estrelas brilhando
const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
`;

// Animação de pulso no botão
const buttonPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 30px 10px rgba(16, 185, 129, 0.3); }
`;

const MenuContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  position: relative;
  overflow: hidden;
  padding: 20px;

  /* Cartas decorativas flutuantes */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 160px;
    border-radius: 12px;
    background: linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05));
    border: 2px solid rgba(255,255,255,0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    animation: ${float} 6s ease-in-out infinite;
  }

  &::before {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
    transform: rotate(-15deg);
  }

  &::after {
    bottom: 15%;
    right: 5%;
    animation-delay: 3s;
    transform: rotate(15deg);
  }
`;

// Floating cards extras
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
  background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03));
  border: 2px solid rgba(255,255,255,0.15);
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
    opacity: 0.4;
  }
`;

// Container de confetes
const ConfettiContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const Confetti = styled.div<{ $color: string; $delay: number; $duration: number; $left: number }>`
  position: absolute;
  width: 12px;
  height: 24px;
  background: ${props => props.$color};
  left: ${props => props.$left}%;
  top: -30px;
  border-radius: 2px;
  animation: ${confettiFall} ${props => props.$duration}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;
`;

// Estrelas decorativas
const StarsContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div<{ $size: number; $top: number; $left: number; $delay: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  animation: ${starTwinkle} 2.5s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;

  &::before {
    content: '⭐';
    font-size: ${props => props.$size}px;
    filter: drop-shadow(0 0 10px gold);
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 1;
  animation: ${fadeInUp} 0.8s ease-out;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(30px);
  border-radius: 30px;
  padding: 3rem 4rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  max-width: 600px;
  width: 90%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #ffd700);
    border-radius: 32px;
    z-index: -1;
    opacity: 0.3;
    animation: ${gradientShift} 3s ease infinite;
    background-size: 300% 300%;
  }
`;

const Trophy = styled.div`
  font-size: 6rem;
  animation: ${trophyPulse} 2s ease-in-out infinite;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 10px 20px rgba(255, 215, 0, 0.4));
`;

const Title = styled.h1`
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 800;
  text-align: center;
  background: linear-gradient(
    90deg,
    #ffd700 0%,
    #fff 25%,
    #ffd700 50%,
    #fff 75%,
    #ffd700 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3s linear infinite;
  margin: 0;
  line-height: 1.2;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
`;

const VictoryText = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.95);
  text-align: center;
  margin: 0;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.2rem 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 90px;
  flex: 1;
  max-width: 150px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const StatIcon = styled.span`
  font-size: 1.8rem;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

const StatValue = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(145deg, #10b981, #059669);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow:
    0 10px 40px rgba(5, 150, 105, 0.4),
    0 0 0 4px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${buttonPulse} 2s ease-in-out infinite;
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
    box-shadow:
      0 15px 50px rgba(5, 150, 105, 0.5),
      0 0 0 4px rgba(255, 255, 255, 0.3);
    animation: none;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

const HomeButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;

export {
  MenuContainer,
  FloatingCards,
  FloatingCard,
  ContentWrapper,
  ConfettiContainer,
  Confetti,
  StarsContainer,
  Star,
  Trophy,
  Title,
  VictoryText,
  StatsContainer,
  StatItem,
  StatIcon,
  StatLabel,
  StatValue,
  Button,
  HomeButton,
  ButtonGroup
};

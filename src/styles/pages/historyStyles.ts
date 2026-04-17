import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HistoryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 2rem;
  color: white;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const BackButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeInUp} 0.5s ease-out;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.color || 'white'};
`;

const GamesList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 1rem;
  padding: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

const GameRow = styled.div<{ $mode: 'challenge' | 'duel' }>`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 80px;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  border-left: 4px solid ${props => props.$mode === 'challenge' ? '#10b981' : '#3b82f6'};
  animation: ${fadeInUp} 0.5s ease-out;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const GameDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DateText = styled.span`
  font-weight: 500;
`;

const ModeBadge = styled.div<{ $mode: 'challenge' | 'duel' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: ${props => props.$mode === 'challenge'
    ? 'rgba(16, 185, 129, 0.2)'
    : 'rgba(59, 130, 246, 0.2)'};
  color: ${props => props.$mode === 'challenge' ? '#34d399' : '#60a5fa'};
  width: fit-content;
`;

const DurationText = styled.div`
  font-weight: 600;
  color: #fbbf24;
`;

const WinnerText = styled.div<{ $winner?: string }>`
  font-weight: 600;
  color: ${props => {
    if (props.$winner === 'player1') return '#60a5fa';
    if (props.$winner === 'player2') return '#f87171';
    if (props.$winner === 'draw') return '#fbbf24';
    return 'rgba(255, 255, 255, 0.8)';
  }};
`;

const DeleteButton = styled.button`
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.2);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(239, 68, 68, 0.4);
    transform: scale(1.1);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  max-width: 600px;
  margin: 2rem auto;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const EmptyText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

const ClearAllButton = styled.button`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: rgba(239, 68, 68, 0.4);
    color: white;
  }
`;

// Mobile card view
const MobileCard = styled.div`
  display: none;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const MobileLabel = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
`;

const MobileValue = styled.span`
  font-weight: 500;
`;

export {
  HistoryContainer,
  Header,
  Title,
  BackButton,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  GamesList,
  ListHeader,
  GameRow,
  GameDate,
  DateText,
  ModeBadge,
  DurationText,
  WinnerText,
  DeleteButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  ClearAllButton,
  MobileCard,
  MobileRow,
  MobileLabel,
  MobileValue
};

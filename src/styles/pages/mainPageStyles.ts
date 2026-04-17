import styled, { keyframes } from 'styled-components'

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

// Animação de pulso
const pulse = keyframes`
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  50% { transform: scale(1.05); box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.2); }
`;

const MainContainer = styled.main`
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
    padding: 100px 20px 80px;

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
`

const GameHeader = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 1.5rem;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem 2rem;
    border-radius: 30px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    z-index: 10;
`

const Timer = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
`

const TimerIcon = styled.span`
    font-size: 1.3rem;
`

const ModeIndicator = styled.div`
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 0.95);
`

const PlayerPanel = styled.div`
    position: absolute;
    top: 100px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 10;

    @media (max-width: 1200px) {
        position: fixed;
        top: auto;
        bottom: 20px;
        right: 20px;
        flex-direction: row;
    }
`

const PlayerCard = styled.div<{ $isActive?: boolean; $player: 'player1' | 'player2' }>`
    display: flex;
    align-items: center;
    gap: 1rem;
    background: ${props => props.$isActive
        ? props.$player === 'player1'
            ? 'rgba(59, 130, 246, 0.4)'
            : 'rgba(239, 68, 68, 0.4)'
        : 'rgba(255, 255, 255, 0.1)'};
    padding: 1rem 1.5rem;
    border-radius: 20px;
    border: 2px solid ${props => props.$player === 'player1'
        ? props.$isActive ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)'
        : props.$isActive ? '#ef4444' : 'rgba(239, 68, 68, 0.3)'};
    box-shadow: ${props => props.$isActive
        ? props.$player === 'player1'
            ? '0 0 30px rgba(59, 130, 246, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 0 30px rgba(239, 68, 68, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)'
        : '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'};
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    min-width: 180px;
    animation: ${props => props.$isActive ? pulse : 'none'} 2s ease-in-out infinite;
`

const PlayerAvatar = styled.div<{ $player: 'player1' | 'player2' }>`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: ${props => props.$player === 'player1'
        ? 'linear-gradient(145deg, #3b82f6, #2563eb)'
        : 'linear-gradient(145deg, #ef4444, #dc2626)'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
`

const PlayerInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const PlayerName = styled.span`
    font-weight: 600;
    font-size: 0.9rem;
    color: white;
`

const PlayerScore = styled.span`
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
`

const TurnIndicator = styled.div<{ $player: 'player1' | 'player2' }>`
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${props => props.$player === 'player1' ? '#93c5fd' : '#fca5a5'};
    font-weight: 700;
`

const BackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 30px;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    z-index: 10;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`

const CardsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, minmax(100px, 140px));
    gap: 15px;
    max-width: 1300px;
    width: 100%;
    padding: 0 20px;
    z-index: 1;
    justify-content: center;

    @media (max-width: 1300px) {
        grid-template-columns: repeat(8, minmax(90px, 110px));
        gap: 12px;
    }

    @media (max-width: 1000px) {
        grid-template-columns: repeat(4, minmax(100px, 140px));
        gap: 15px;
    }

    @media (max-width: 600px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        padding: 0 10px;
    }
`

const RemainingCards = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    z-index: 10;
`

export {
    MainContainer,
    GameHeader,
    Timer,
    TimerIcon,
    ModeIndicator,
    PlayerPanel,
    PlayerCard,
    PlayerAvatar,
    PlayerInfo,
    PlayerName,
    PlayerScore,
    TurnIndicator,
    BackButton,
    CardsGrid,
    RemainingCards
}

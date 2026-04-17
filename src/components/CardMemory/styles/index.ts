import styled from "styled-components";

interface CardProps {
    selected: boolean;
    matchedBy?: 'player1' | 'player2' | null;
}

const Card = styled.div<CardProps>`
    width: 100%;
    aspect-ratio: 1;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), box-shadow 0.3s ease;
    transform: ${(props) => props.selected ? "rotateY(180deg)" : "rotateY(0deg)"};
    cursor: ${(props) => props.matchedBy ? 'default' : 'pointer'};
    user-select: none;

    &:hover {
        transform: ${(props) => props.selected || props.matchedBy ? "rotateY(180deg) scale(1.05)" : "scale(1.05)"};
    }

    /* Borda colorida baseada no jogador que acertou */
    ${props => props.matchedBy === 'player1' && `
        &::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 16px;
            border: 4px solid #3b82f6;
            box-shadow: 0 0 25px rgba(59, 130, 246, 0.7);
            pointer-events: none;
            z-index: 10;
            animation: pulseBlue 2s ease-in-out infinite;
        }

        @keyframes pulseBlue {
            0%, 100% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.7); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 1); }
        }
    `}

    ${props => props.matchedBy === 'player2' && `
        &::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 16px;
            border: 4px solid #ef4444;
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.7);
            pointer-events: none;
            z-index: 10;
            animation: pulseRed 2s ease-in-out infinite;
        }

        @keyframes pulseRed {
            0%, 100% { box-shadow: 0 0 25px rgba(239, 68, 68, 0.7); }
            50% { box-shadow: 0 0 40px rgba(239, 68, 68, 1); }
        }
    `}

    @media (max-width: 1100px) {
        max-width: 120px;
        margin: 0 auto;
    }
`

const CardFace = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`

const CardFront = styled(CardFace)`
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &::before {
        content: '🎴';
        font-size: 3rem;
        opacity: 0.8;
    }

    &:hover {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.15));
        border-color: rgba(255, 255, 255, 0.5);
    }
`

const CardBack = styled(CardFace)`
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8));
    border: 2px solid rgba(255, 255, 255, 0.5);
    transform: rotateY(180deg);

    img {
        width: 70%;
        height: 70%;
        object-fit: contain;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    }
`

export {
    Card,
    CardFront,
    CardBack
}

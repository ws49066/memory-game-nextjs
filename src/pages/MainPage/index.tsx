"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import CardMemory from "@/components/CardMemory";
import { saveGameRecord } from "@/utils/storage";
import { useTranslation } from "@/i18n/LanguageContext";
import {
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
} from "@/styles/pages/mainPageStyles";

const listFigures = ["Cherry", "Dog", "Dolphin", "Fire", "Globe", "Lion", "Lock", "Party", "Piano", "Pizza", "Present", "Silly", "Sunflower", "Target", "Top hat", "Umbrella"]

const shuffleArray = (listFigure: string[]) => listFigure.sort(() => Math.random() - 0.5);

interface CardMatch {
    figure: string;
    matchedBy: 'player1' | 'player2' | null;
}

export default function MainPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { mode } = router.query;

    const isDuelMode = mode === 'duel';

    // Estados do jogo
    const [figures, setFigures] = useState<string[]>([])
    const [figurasMatch, setFigurasMatch] = useState<string[]>(listFigures)
    const [selected, setSelected] = useState<((value: boolean) => void)[]>([])
    const [match, setMatch] = useState<string[]>([])
    const [index, setIndex] = useState<string[]>([])

    // Estados para multiplayer e timer
    const [startTime, setStartTime] = useState<number>(Date.now())
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1')
    const [player1Score, setPlayer1Score] = useState<number>(0)
    const [player2Score, setPlayer2Score] = useState<number>(0)
    const [matchedCards, setMatchedCards] = useState<CardMatch[]>([])
    const [gameEnded, setGameEnded] = useState<boolean>(false)

    // Inicialização
    useEffect(() => {
        setFigures(shuffleArray([...listFigures, ...listFigures]))
        setStartTime(Date.now())
    }, [])

    // Timer
    useEffect(() => {
        if (gameEnded) return;

        const timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
        }, 1000)

        return () => clearInterval(timer)
    }, [startTime, gameEnded])

    // Lógica principal do jogo
    useEffect(() => {
        if (selected.length === 2 && match[0] === match[1]) {
            // Par encontrado!
            const figure = match[0];

            // Atualiza score do jogador atual
            if (isDuelMode) {
                if (currentPlayer === 'player1') {
                    setPlayer1Score(prev => prev + 1)
                } else {
                    setPlayer2Score(prev => prev + 1)
                }
                // Marca as cartas com o jogador que acertou
                setMatchedCards(prev => [...prev, { figure, matchedBy: currentPlayer }])
            } else {
                setMatchedCards(prev => [...prev, { figure, matchedBy: null }])
            }

            setFigurasMatch([...figurasMatch.filter((f: string) => f !== figure)])
            setSelected([])
            setMatch([])
            setIndex([])

            // No modo duelo, o jogador continua jogando quando acerta
        }

        else if (selected.length === 2) {
            // Par errado
            setTimeout(() => {
                selected.forEach((seletedCard) => seletedCard(false))
                setSelected([])
                setMatch([])
                setIndex([])

                // No modo duelo, troca o jogador
                if (isDuelMode) {
                    setCurrentPlayer(prev => prev === 'player1' ? 'player2' : 'player1')
                }
            }, 700)
        }

        // Fim de jogo
        if (figurasMatch.length === 0 && !gameEnded) {
            setGameEnded(true)
            const duration = Math.floor((Date.now() - startTime) / 1000)

            setTimeout(() => {
                // Salva o resultado
                if (isDuelMode) {
                    let winner: 'player1' | 'player2' | 'draw' | undefined;
                    if (player1Score > player2Score) winner = 'player1'
                    else if (player2Score > player1Score) winner = 'player2'
                    else winner = 'draw'

                    saveGameRecord({
                        mode: 'duel',
                        duration,
                        winner,
                        player1Score,
                        player2Score,
                        completed: true
                    })

                    router.push({
                        pathname: "/GameOver",
                        query: {
                            mode: 'duel',
                            winner,
                            player1Score,
                            player2Score,
                            duration
                        }
                    })
                } else {
                    saveGameRecord({
                        mode: 'challenge',
                        duration,
                        completed: true
                    })

                    router.push({
                        pathname: "/GameOver",
                        query: {
                            mode: 'challenge',
                            duration
                        }
                    })
                }
            }, 950)
        }
    }, [match, selected, index, figurasMatch, currentPlayer, player1Score, player2Score, isDuelMode, gameEnded, startTime, router])

    const handleClickCard = useCallback((selectedCard: (value: boolean) => void, imageName: string, indexCard: string) => {
        if (selected.length < 2 && index[0] !== indexCard && figurasMatch.includes(imageName)) {
            selectedCard(true)
            setSelected([...selected, selectedCard])
            setMatch([...match, imageName])
            setIndex([...index, indexCard])
        }
    }, [selected, index, figurasMatch, match])

    const getMatchedBy = (figure: string): 'player1' | 'player2' | null => {
        const found = matchedCards.find(m => m.figure === figure)
        return found ? found.matchedBy : null
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleBack = () => {
        router.push('/')
    }

    return (
        <MainContainer>
            <BackButton onClick={handleBack}>
                {t('game.backButton')}
            </BackButton>

            <GameHeader>
                <ModeIndicator>
                    {isDuelMode ? t('game.mode.duel') : t('game.mode.challenge')}
                </ModeIndicator>
                <Timer>
                    <TimerIcon>{t('game.timer')}</TimerIcon>
                    {formatTime(elapsedTime)}
                </Timer>
            </GameHeader>

            {isDuelMode && (
                <PlayerPanel>
                    <PlayerCard $player="player1" $isActive={currentPlayer === 'player1'}>
                        <PlayerAvatar $player="player1">🔵</PlayerAvatar>
                        <PlayerInfo>
                            <PlayerName>{t('game.player1')}</PlayerName>
                            <PlayerScore>{player1Score} {t('game.pairs')}</PlayerScore>
                            {currentPlayer === 'player1' && (
                                <TurnIndicator $player="player1">{t('game.yourTurn')}</TurnIndicator>
                            )}
                        </PlayerInfo>
                    </PlayerCard>

                    <PlayerCard $player="player2" $isActive={currentPlayer === 'player2'}>
                        <PlayerAvatar $player="player2">🔴</PlayerAvatar>
                        <PlayerInfo>
                            <PlayerName>{t('game.player2')}</PlayerName>
                            <PlayerScore>{player2Score} {t('game.pairs')}</PlayerScore>
                            {currentPlayer === 'player2' && (
                                <TurnIndicator $player="player2">{t('game.yourTurn')}</TurnIndicator>
                            )}
                        </PlayerInfo>
                    </PlayerCard>
                </PlayerPanel>
            )}

            <CardsGrid>
                {figures?.map((figure, index) => (
                    <CardMemory
                        key={index}
                        index={index + figure}
                        imageName={figure}
                        handleClickCard={handleClickCard}
                        matchedBy={getMatchedBy(figure)}
                    />
                ))}
            </CardsGrid>

            <RemainingCards>
                {figurasMatch.length} {t('game.remainingPairs')}
            </RemainingCards>
        </MainContainer>
    )
}

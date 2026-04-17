import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n/LanguageContext'
import {
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
} from '@/styles/pages/gameOverStyles'

export default function GameOver() {
  const router = useRouter()
  const { t } = useTranslation()
  const { mode, winner, player1Score, player2Score, duration } = router.query

  const isDuelMode = mode === 'duel'

  // Gerar confetes aleatórios
  const confettiColors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7']
  const confettiItems = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    left: Math.random() * 100
  }))

  // Gerar estrelas
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: 10 + Math.random() * 20,
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: Math.random() * 3
  }))

  // Floating cards decorativos
  const floatingCards = [
    { id: 1, delay: 0, position: { top: '15%', left: '8%' }, rotation: -20 },
    { id: 2, delay: 1, position: { top: '25%', right: '10%' }, rotation: 25 },
    { id: 3, delay: 2, position: { bottom: '20%', left: '15%' }, rotation: 10 },
    { id: 4, delay: 1.5, position: { bottom: '30%', right: '8%' }, rotation: -15 },
  ]

  const formatTime = (seconds) => {
    if (!seconds) return '00:00'
    const mins = Math.floor(Number(seconds) / 60)
    const secs = Number(seconds) % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getWinnerMessage = () => {
    if (!isDuelMode) return t('gameOver.challenge.message')

    switch (winner) {
      case 'player1':
        return t('gameOver.duel.player1Wins')
      case 'player2':
        return t('gameOver.duel.player2Wins')
      case 'draw':
        return t('gameOver.duel.draw')
      default:
        return ''
    }
  }

  const playAgain = () => {
    router.replace({
      pathname: "/MainPage",
      query: { mode: mode || 'challenge' }
    })
  }

  return (
    <MenuContainer>
      {/* Confetes animados */}
      <ConfettiContainer>
        {confettiItems.map((item) => (
          <Confetti
            key={item.id}
            $color={item.color}
            $delay={item.delay}
            $duration={item.duration}
            $left={item.left}
          />
        ))}
      </ConfettiContainer>

      {/* Estrelas brilhantes */}
      <StarsContainer>
        {stars.map((star) => (
          <Star
            key={star.id}
            $size={star.size}
            $top={star.top}
            $left={star.left}
            $delay={star.delay}
          />
        ))}
      </StarsContainer>

      {/* Cartas decorativas */}
      <FloatingCards>
        {floatingCards.map((card) => (
          <FloatingCard
            key={card.id}
            $delay={card.delay}
            $position={card.position}
            $rotation={card.rotation}
          />
        ))}
      </FloatingCards>

      <ContentWrapper>
        <Trophy>🏆</Trophy>

        <Title>{isDuelMode ? t('gameOver.duel.title') : t('gameOver.challenge.title')}</Title>

        <VictoryText>
          {getWinnerMessage()}
        </VictoryText>

        <StatsContainer>
          {isDuelMode ? (
            <>
              <StatItem>
                <StatIcon>🔵</StatIcon>
                <StatLabel>{t('gameOver.duel.stats.player1')}</StatLabel>
                <StatValue>{player1Score || 0} {t('game.pairs')}</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>{t('game.timer')}</StatIcon>
                <StatLabel>{t('gameOver.duel.stats.time')}</StatLabel>
                <StatValue>{formatTime(duration)}</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>🔴</StatIcon>
                <StatLabel>{t('gameOver.duel.stats.player2')}</StatLabel>
                <StatValue>{player2Score || 0} {t('game.pairs')}</StatValue>
              </StatItem>
            </>
          ) : (
            <>
              <StatItem>
                <StatIcon>🎯</StatIcon>
                <StatLabel>{t('gameOver.challenge.stats.pairs')}</StatLabel>
                <StatValue>16</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>{t('game.timer')}</StatIcon>
                <StatLabel>{t('gameOver.challenge.stats.time')}</StatLabel>
                <StatValue>{formatTime(duration)}</StatValue>
              </StatItem>
              <StatItem>
                <StatIcon>🎉</StatIcon>
                <StatLabel>{t('gameOver.challenge.stats.completed')}</StatLabel>
                <StatValue>✓</StatValue>
              </StatItem>
            </>
          )}
        </StatsContainer>

        <ButtonGroup>
          <Button onClick={playAgain}>
            {t('gameOver.buttons.playAgain')}
          </Button>
          <HomeButton onClick={() => router.push("/")}>
            {t('gameOver.buttons.backToMenu')}
          </HomeButton>
        </ButtonGroup>
      </ContentWrapper>
    </MenuContainer>
  )
}

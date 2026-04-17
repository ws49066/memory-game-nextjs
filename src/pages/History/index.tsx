import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from '@/i18n/LanguageContext'
import {
  GameRecord,
  getGameHistory,
  deleteGameRecord,
  clearGameHistory,
  formatDuration,
  formatDate
} from '@/utils/storage'
import {
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
} from '@/styles/pages/historyStyles'

export default function HistoryPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [history, setHistory] = useState<GameRecord[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setHistory(getGameHistory())
  }, [])

  const handleDelete = (id: string) => {
    deleteGameRecord(id)
    setHistory(getGameHistory())
  }

  const handleClearAll = () => {
    if (confirm(t('history.clearAllConfirm') || 'Are you sure?')) {
      clearGameHistory()
      setHistory([])
    }
  }

  // Calcular estatísticas
  const stats = {
    totalGames: history.length,
    challengeGames: history.filter(h => h.mode === 'challenge').length,
    duelGames: history.filter(h => h.mode === 'duel').length,
    totalTime: history.reduce((acc, h) => acc + h.duration, 0),
    player1Wins: history.filter(h => h.winner === 'player1').length,
    player2Wins: history.filter(h => h.winner === 'player2').length,
    draws: history.filter(h => h.winner === 'draw').length,
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getResultText = (game: GameRecord) => {
    if (game.mode === 'challenge') {
      return t('history.results.completed')
    }
    switch (game.winner) {
      case 'player1':
        return t('history.results.player1Wins')
      case 'player2':
        return t('history.results.player2Wins')
      case 'draw':
        return t('history.results.draw')
      default:
        return '-'
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <HistoryContainer>
      <Header>
        <Title>{t('history.title')}</Title>
        <BackButton onClick={() => router.push('/')}>
          {t('history.backButton')}
        </BackButton>
      </Header>

      {history.length > 0 && (
        <StatsGrid>
          <StatCard>
            <StatLabel>{t('history.stats.totalGames')}</StatLabel>
            <StatValue>{stats.totalGames}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>{t('history.stats.challengeMode')}</StatLabel>
            <StatValue color="#34d399">{stats.challengeGames}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>{t('history.stats.duelMode')}</StatLabel>
            <StatValue color="#60a5fa">{stats.duelGames}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>{t('history.stats.totalTime')}</StatLabel>
            <StatValue color="#fbbf24">{formatTime(stats.totalTime)}</StatValue>
          </StatCard>
          {stats.duelGames > 0 && (
            <>
              <StatCard>
                <StatLabel>{t('history.stats.player1Wins')}</StatLabel>
                <StatValue color="#60a5fa">{stats.player1Wins}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>{t('history.stats.player2Wins')}</StatLabel>
                <StatValue color="#f87171">{stats.player2Wins}</StatValue>
              </StatCard>
              <StatCard>
                <StatLabel>{t('history.stats.draws')}</StatLabel>
                <StatValue color="#fbbf24">{stats.draws}</StatValue>
              </StatCard>
            </>
          )}
        </StatsGrid>
      )}

      <GamesList>
        {history.length === 0 ? (
          <EmptyState>
            <EmptyIcon>{t('history.empty.icon')}</EmptyIcon>
            <EmptyTitle>{t('history.empty.title')}</EmptyTitle>
            <EmptyText>{t('history.empty.message')}</EmptyText>
          </EmptyState>
        ) : (
          <>
            <ListHeader>
              <div>{t('history.table.date')}</div>
              <div>{t('history.table.mode')}</div>
              <div>{t('history.table.time')}</div>
              <div>{t('history.table.result')}</div>
              <div></div>
            </ListHeader>

            {history.map((game) => (
              <div key={game.id}>
                {/* Desktop view */}
                <GameRow $mode={game.mode}>
                  <GameDate>
                    <DateText>{formatDate(game.date)}</DateText>
                  </GameDate>
                  <ModeBadge $mode={game.mode}>
                    {game.mode === 'challenge' ? '🎯' : '⚔️'}
                    {t(`history.modes.${game.mode}`)}
                  </ModeBadge>
                  <DurationText>⏱️ {formatDuration(game.duration)}</DurationText>
                  <WinnerText $winner={game.winner}>
                    {getResultText(game)}
                  </WinnerText>
                  <DeleteButton onClick={() => handleDelete(game.id)} title={t('history.table.remove')}>
                    🗑️
                  </DeleteButton>
                </GameRow>

                {/* Mobile view */}
                <MobileCard>
                  <MobileRow>
                    <MobileLabel>{t('history.table.date')}</MobileLabel>
                    <MobileValue>{formatDate(game.date)}</MobileValue>
                  </MobileRow>
                  <MobileRow>
                    <MobileLabel>{t('history.table.mode')}</MobileLabel>
                    <ModeBadge $mode={game.mode}>
                      {game.mode === 'challenge' ? '🎯' : '⚔️'}
                      {t(`history.modes.${game.mode}`)}
                    </ModeBadge>
                  </MobileRow>
                  <MobileRow>
                    <MobileLabel>{t('history.table.time')}</MobileLabel>
                    <DurationText>⏱️ {formatDuration(game.duration)}</DurationText>
                  </MobileRow>
                  <MobileRow>
                    <MobileLabel>{t('history.table.result')}</MobileLabel>
                    <WinnerText $winner={game.winner}>
                      {getResultText(game)}
                    </WinnerText>
                  </MobileRow>
                  <MobileRow>
                    <div></div>
                    <DeleteButton onClick={() => handleDelete(game.id)} title={t('history.table.remove')}>
                      🗑️ {t('history.table.remove')}
                    </DeleteButton>
                  </MobileRow>
                </MobileCard>
              </div>
            ))}

            <ClearAllButton onClick={handleClearAll}>
              {t('history.clearAll')}
            </ClearAllButton>
          </>
        )}
      </GamesList>
    </HistoryContainer>
  )
}

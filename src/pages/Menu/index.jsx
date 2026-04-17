import {
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
  GameModesContainer,
  ModeButton,
  ModeIcon,
  ModeInfo,
  ModeTitle,
  ModeDescription,
  HistoryButton
} from '@/styles/pages/menuStyles'
import LanguageSelector from '@/components/LanguageSelector'
import { useTranslation } from '@/i18n/LanguageContext'
import { useRouter } from 'next/router'

export default function MenuPage() {
  const router = useRouter()
  const { t, mounted } = useTranslation()

  if (!mounted) {
    return (
      <MenuContainer>
        <ContentWrapper>
          <GameIcon>🧠</GameIcon>
          <Title>Memory Game</Title>
        </ContentWrapper>
      </MenuContainer>
    )
  }

  const startGame = (mode) => {
    router.push({
      pathname: "/MainPage",
      query: { mode }
    })
  }

  const goToHistory = () => {
    router.push("/History")
  }

  return (
    <MenuContainer>
      <LanguageSelectorContainer>
        <LanguageSelector />
      </LanguageSelectorContainer>

      {/* Cartas decorativas flutuantes */}
      <FloatingCards>
        <FloatingCard $delay={0} $position={{ top: '15%', left: '5%' }} $rotation={-20} />
        <FloatingCard $delay={1} $position={{ top: '25%', right: '8%' }} $rotation={25} />
        <FloatingCard $delay={2} $position={{ bottom: '20%', left: '12%' }} $rotation={10} />
        <FloatingCard $delay={1.5} $position={{ bottom: '30%', right: '5%' }} $rotation={-15} />
        <FloatingCard $delay={0.5} $position={{ top: '60%', left: '3%' }} $rotation={30} />
        <FloatingCard $delay={2.5} $position={{ top: '10%', right: '20%' }} $rotation={-10} />
      </FloatingCards>

      <ContentWrapper>
        <GameIcon>🧠</GameIcon>

        <Title>
          {t('menu.title')}
          <span>{t('menu.subtitle')}</span>
        </Title>

        <Subtitle>
          {t('menu.chooseMode')}
        </Subtitle>

        <FeaturesList>
          <Feature>
            <span>🎯</span> {t('menu.features.pairs')}
          </Feature>
          <Feature>
            <span>⚡</span> {t('menu.features.timeChallenge')}
          </Feature>
          <Feature>
            <span>🏆</span> {t('menu.features.history')}
          </Feature>
        </FeaturesList>

        <GameModesContainer>
          <ModeButton $mode="challenge" onClick={() => startGame('challenge')}>
            <ModeIcon>🎯</ModeIcon>
            <ModeInfo>
              <ModeTitle>{t('menu.modes.challenge.title')}</ModeTitle>
              <ModeDescription>{t('menu.modes.challenge.description')}</ModeDescription>
            </ModeInfo>
          </ModeButton>

          <ModeButton $mode="duel" onClick={() => startGame('duel')}>
            <ModeIcon>⚔️</ModeIcon>
            <ModeInfo>
              <ModeTitle>{t('menu.modes.duel.title')}</ModeTitle>
              <ModeDescription>{t('menu.modes.duel.description')}</ModeDescription>
            </ModeInfo>
          </ModeButton>
        </GameModesContainer>

        <HistoryButton onClick={goToHistory}>
          📊 {t('menu.historyButton')}
        </HistoryButton>
      </ContentWrapper>
    </MenuContainer>
  )
}

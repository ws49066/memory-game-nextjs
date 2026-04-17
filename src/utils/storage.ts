export interface GameRecord {
  id: string;
  mode: 'challenge' | 'duel';
  date: string;
  duration: number; // em segundos
  winner?: string; // 'player1', 'player2', 'draw' ou undefined para modo desafio
  player1Score?: number;
  player2Score?: number;
  completed: boolean;
}

const STORAGE_KEY = 'memory-game-history';

export function saveGameRecord(record: Omit<GameRecord, 'id' | 'date'>): void {
  if (typeof window === 'undefined') return;

  const history = getGameHistory();
  const newRecord: GameRecord = {
    ...record,
    id: generateId(),
    date: new Date().toISOString(),
  };

  history.unshift(newRecord);

  // Manter apenas os últimos 50 jogos
  if (history.length > 50) {
    history.pop();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getGameHistory(): GameRecord[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as GameRecord[];
  } catch {
    return [];
  }
}

export function clearGameHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function deleteGameRecord(id: string): void {
  if (typeof window === 'undefined') return;

  const history = getGameHistory();
  const filtered = history.filter(record => record.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Funções auxiliares para formatação
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

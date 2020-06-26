import useBranch from 'baobab-react/useBranch';

export default function useGame() {
  const { game } = useBranch({ game: ['game'] });
  return game;
};
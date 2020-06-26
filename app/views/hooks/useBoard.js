import useBranch from 'baobab-react/useBranch';

export default function useScreen() {
  const { board } = useBranch({ board: ['board'] });
  return board;
};
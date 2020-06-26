import useBranch from 'baobab-react/useBranch';

export default function useScreen() {
  const { screen } = useBranch({ screen: ['screen'] });
  return screen;
};
import useBranch from 'baobab-react/useBranch';

export default function useDrag() {
  const { drag } = useBranch({ drag: ['drag'] });
  return drag;
};
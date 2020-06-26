import useBranch from 'baobab-react/useBranch';

export default function usePointer() {
  const { pointer } = useBranch({ pointer: ['pointer'] });
  return pointer;
};
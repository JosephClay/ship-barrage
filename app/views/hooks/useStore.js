import useBranch from 'baobab-react/useBranch';

export default function useStore(selector) {
  const { value } = useBranch({ value: selector });
  return value;
};
import {useState} from 'react';

export function useModal<T>() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const open = (item: T) => {
    setSelected(item);
    setIsOpen(true);
  };

  const close = () => {
    setSelected(null);
    setIsOpen(false);
  };

  return {isOpen, selected, open, close};
}

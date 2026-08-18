'use client';

import './ToggleSwitch.css';

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleSwitchProps<T extends string> {
  value: T;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
}

// 캐릭터/커플, 더빙/자막처럼 두 화면 중 하나만 보여줄 때 쓰는 boolean 토글 버튼.
export default function ToggleSwitch<T extends string>({
  value,
  options,
  onChange,
}: ToggleSwitchProps<T>) {
  return (
    <div className="view-toggle">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`view-toggle__btn ${
            value === opt.value ? 'is-active' : ''
          }`}
          onClick={() => onChange(opt.value)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

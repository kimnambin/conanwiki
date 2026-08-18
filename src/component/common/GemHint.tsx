'use client';

import {useEffect, useRef, useState} from 'react';
import './GemHint.css';

interface GemHintProps {
  className: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

// 카드의 원형 뱃지(나이/타입/상태 등)에 마우스를 올리거나 클릭하면
// 설명이 담긴 말풍선을 띄워주는 래퍼.
export default function GemHint({
  className,
  title,
  description,
  children,
}: GemHintProps) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [show]);

  return (
    <div
      ref={ref}
      className={`gem-hint ${className}`}
      role="button"
      tabIndex={0}
      aria-label={title}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={e => {
        // 클릭은 항상 앞서 mouseenter를 동반하므로, 토글이 아니라
        // "열기"로 고정한다. 닫기는 mouseleave/바깥 클릭이 담당한다.
        e.stopPropagation();
        setShow(true);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setShow(v => !v);
        }
      }}>
      {children}
      {show && (
        <div className="gem-hint__bubble">
          <div className="gem-hint__bubble-title">{title}</div>
          <div className="gem-hint__bubble-desc">{description}</div>
        </div>
      )}
    </div>
  );
}

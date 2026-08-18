import {ReactNode} from 'react';

// person.json 텍스트 필드에 섞여 있는 "<br />" 문자열을 실제 줄바꿈으로 렌더링한다.
export function renderBreaks(text: string): ReactNode {
  return text
    .split(/<br\s*\/?>/i)
    .flatMap((part, i, arr) =>
      i < arr.length - 1 ? [part, <br key={i} />] : [part],
    );
}

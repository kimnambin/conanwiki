// Minimal stand-in for `next/image` so components can be rendered inside
// Storybook (@storybook/react-vite has no Next.js runtime). Supports just
// the subset of props this project actually uses.
import type {ImgHTMLAttributes} from 'react';

interface MockImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  fill?: boolean;
}

export default function Image({fill, style, ...props}: MockImageProps) {
  return (
    <img
      {...props}
      style={
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              ...style,
            }
          : style
      }
    />
  );
}

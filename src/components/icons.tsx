import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 8.25a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V8.25Z" />
      <path d="m15.5 3-3-3-3 3" />
      <path d="M12.5 3v10" />
      <path d="m18 15-3.5-3.5-3.5 3.5" />
    </svg>
  );
}

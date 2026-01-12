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
      <path d="M2.2 12.42 2.5 18a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2l.3-5.58" />
      <path d="M7.61 20.92a6 6 0 0 1-5.4-4.5" />
      <path d="M16.39 20.92a6 6 0 0 0 5.4-4.5" />
      <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M12 2v2" />
      <path d="M19.07 4.93l-1.41 1.41" />
      <path d="M4.93 4.93l1.41 1.41" />
    </svg>
  );
}

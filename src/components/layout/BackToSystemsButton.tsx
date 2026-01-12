'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export function BackToSystemsButton() {

  const handleClick = () => {
    if (window.parent) {
      window.parent.postMessage({ type: 'GO_BACK_SYSTEMS' }, '*');
    }
  };

  return (
    <Button
      id="backBtn"
      variant="outline"
      className="fixed bottom-4 left-4 z-[100] shadow-lg"
      onClick={handleClick}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Systems
    </Button>
  );
}

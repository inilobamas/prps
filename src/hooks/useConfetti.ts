import { useCallback } from 'react';

export function useConfetti() {
  const trigger = useCallback(() => {
    // Simple confetti effect using CSS animations
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.top = '50%';
    confetti.style.left = '50%';
    confetti.style.transform = 'translate(-50%, -50%)';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.innerHTML = '🎉';
    confetti.style.fontSize = '3rem';
    confetti.style.animation = 'confetti-celebration 2s ease-out forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
      document.body.removeChild(confetti);
    }, 2000);
    
    // Add CSS animation if not already present
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confetti-celebration {
          0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 1; 
          }
          50% { 
            transform: translate(-50%, -60%) scale(1.2); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -100%) scale(0.8); 
            opacity: 0; 
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return { trigger };
}
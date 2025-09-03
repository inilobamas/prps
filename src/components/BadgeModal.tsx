'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { getBadge } from '@/lib/gamification';

interface BadgeModalProps {
  badgeId: string | null;
  onClose: () => void;
}

export function BadgeModal({ badgeId, onClose }: BadgeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const badge = badgeId ? getBadge(badgeId) : null;

  useEffect(() => {
    if (badgeId) {
      setIsOpen(true);
    }
  }, [badgeId]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="text-center">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-3xl">{badge?.icon || '🏆'}</span>
            </div>
            
            <DialogTitle className="text-2xl">Badge Earned!</DialogTitle>
            
            {badge && (
              <div className="space-y-2">
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {badge.name}
                </Badge>
                <p className="text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            )}
          </motion.div>
        </DialogHeader>
        
        <div className="pt-4">
          <Button onClick={handleClose} className="w-full">
            <Trophy className="h-4 w-4 mr-2" />
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
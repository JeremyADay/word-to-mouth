import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera } from 'lucide-react';

interface PhotoSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: () => void;
  onSkip: () => void;
}

const PhotoSuggestionModal: React.FC<PhotoSuggestionModalProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
  onSkip
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-orange-500" />
            Make it mouth-watering!
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-600 mb-6">
            Photos make your recommendation shine! Want to add one so others can see what to expect?
          </p>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={onAddPhoto}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Add Photo
            </Button>
            <Button 
              onClick={onSkip}
              variant="outline"
              className="w-full"
            >
              Share Without Photo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoSuggestionModal;
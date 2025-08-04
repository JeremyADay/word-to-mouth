import React from 'react';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { FoodItem, ReactionType } from '@/types/food';

interface ReactionButtonsProps {
  item: FoodItem;
  onReact: (reaction: ReactionType) => void;
  onToggleSave: () => void;
  size?: 'sm' | 'lg';
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ 
  item, onReact, onToggleSave, size = 'sm' 
}) => {
  const reactions = [
    { type: 'wantToTry' as ReactionType, emoji: '🔥', label: 'Crave-worthy', count: item.reactions.wantToTry },
    { type: 'liked' as ReactionType, emoji: '✅', label: 'Loved it', count: item.reactions.liked },
    { type: 'overrated' as ReactionType, emoji: '🤢', label: 'Gross', count: item.reactions.overrated },
    { type: 'weird' as ReactionType, emoji: '🤔', label: 'Not Sure', count: item.reactions.weird },
  ];

  const buttonSize = size === 'lg' ? 'h-12 px-4' : 'h-8 px-2';
  const textSize = size === 'lg' ? 'text-base' : 'text-xs';
  const emojiSize = size === 'lg' ? 'text-lg' : 'text-sm';

  const totalReactions = item.reactions.wantToTry + item.reactions.liked + item.reactions.overrated + item.reactions.weird;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {reactions.map(({ type, emoji, label, count }) => (
          <div key={type} className="flex flex-col items-center">
            <Button
              variant={item.userReaction === type ? "default" : "outline"}
              size="sm"
              className={`${buttonSize} ${textSize} transition-all duration-200 ${
                item.userReaction === type 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white transform scale-105 shadow-md' 
                  : 'hover:bg-gray-50 hover:scale-105'
              }`}
              onClick={() => onReact(type)}
            >
              <span className={`${emojiSize} mr-1`}>{emoji}</span>
              <span className="font-medium">{count}</span>
            </Button>
            <span className="text-xs text-gray-500 mt-1 text-center">{label}</span>
          </div>
        ))}
      </div>
      
      {totalReactions > 0 && (
        <div className="text-xs text-gray-500">
          {totalReactions} reaction{totalReactions !== 1 ? 's' : ''}
        </div>
      )}
      
      <Button
        variant={item.isSaved ? "default" : "outline"}
        size="sm"
        className={`${buttonSize} ${textSize} transition-all duration-200 ${
          item.isSaved 
            ? 'bg-blue-500 hover:bg-blue-600 text-white transform scale-105' 
            : 'hover:bg-gray-50 hover:scale-105'
        }`}
        onClick={onToggleSave}
      >
        {item.isSaved ? <BookmarkCheck className="w-4 h-4 mr-1" /> : <Bookmark className="w-4 h-4 mr-1" />}
        {item.isSaved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
};

export default ReactionButtons;
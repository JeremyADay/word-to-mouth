import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { FoodItem, ReactionType } from '@/types/food';
import ReactionButtons from './ReactionButtons';

interface FoodItemCardProps {
  item: FoodItem;
  onReact: (reaction: ReactionType) => void;
  onToggleSave: () => void;
  onClick: () => void;
  isHighlighted?: boolean;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ 
  item, onReact, onToggleSave, onClick, isHighlighted = false
}) => {
  return (
    <Card className={`mb-6 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${
      isHighlighted ? 'ring-2 ring-orange-500 shadow-lg' : ''
    }`}>
      <div onClick={onClick}>
        {item.imageUrl && (
          <div className="aspect-[4/3] w-full overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.dishName}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.dishName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-600 font-medium">{item.restaurantName}</p>
              </div>
              {item.category && (
                <div className="mt-1">
                  <Badge variant="secondary" className="text-xs px-2 py-1 bg-orange-100 text-orange-700">
                    Category: {item.category}
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{item.location.address}</span>
            </div>
            {item.description && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Hack / What to Know</p>
                <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">{item.description}</p>
              </div>
            )}
            
            {item.parkingTips && (
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">Parking Tips</p>
                <p className="text-sm text-gray-600 italic leading-relaxed">{item.parkingTips}</p>
              </div>
            )}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>

      </div>
      
      <div className="px-4 pb-4 border-t border-gray-100 pt-3">
        <ReactionButtons 
          item={item}
          onReact={onReact}
          onToggleSave={onToggleSave}
        />
      </div>
    </Card>
  );
};

export default FoodItemCard;
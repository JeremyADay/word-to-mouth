import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import { useFoodContext } from '@/contexts/FoodContext';
import ReactionButtons from './ReactionButtons';

const DetailScreen: React.FC = () => {
  const {
    selectedItem,
    setCurrentScreen,
    reactToItem,
    toggleSaveItem
  } = useFoodContext();

  if (!selectedItem) {
    return null;
  }

  const totalReactions = Object.values(selectedItem.reactions).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen('main')}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-6">
        {selectedItem.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={selectedItem.imageUrl} 
              alt={selectedItem.dishName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {selectedItem.dishName}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {selectedItem.restaurantName}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{selectedItem.location.address}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{selectedItem.createdAt.toLocaleDateString()}</span>
            </div>
          </div>

          {selectedItem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedItem.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-800 leading-relaxed">
              {selectedItem.description}
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                {totalReactions} reactions from the community
              </p>
            </div>
            
            <ReactionButtons
              item={selectedItem}
              onReact={(reaction) => reactToItem(selectedItem.id, reaction)}
              onToggleSave={() => toggleSaveItem(selectedItem.id)}
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;
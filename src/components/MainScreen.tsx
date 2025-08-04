import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Map, List, Utensils } from 'lucide-react';
import { useFoodContext } from '@/contexts/FoodContext';
import FoodItemCard from './FoodItemCard';
import MapView from './MapView';

const MainScreen: React.FC = () => {
  const {
    foodItems,
    viewMode,
    sortOption,
    categoryFilter,
    setViewMode,
    setSortOption,
    setCategoryFilter,
    setCurrentScreen,
    setSelectedItem,
    reactToItem,
    toggleSaveItem
  } = useFoodContext();

  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  const categories = ['All', 'Burritos', 'Sandwiches', 'Burgers', 'Bowls', 'Sushi', 'Pasta', 'Pizza', 'Salad', 'Noodles', 'Dessert', 'Breakfast', 'Drinks'];

  useEffect(() => {
    if (highlightedItemId) {
      const timer = setTimeout(() => {
        setHighlightedItemId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedItemId]);

  useEffect(() => {
    (window as any).highlightNewPost = (itemId: string) => {
      setHighlightedItemId(itemId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }, []);

  const filteredItems = categoryFilter && categoryFilter !== 'All' 
    ? foodItems.filter(item => item.category === categoryFilter)
    : foodItems;

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case 'mostHot':
        return (b.reactions.wantToTry + b.reactions.liked) - (a.reactions.wantToTry + a.reactions.liked);
      case 'mostTried':
        return (b.reactions.liked + b.reactions.overrated) - (a.reactions.liked + a.reactions.overrated);
      case 'mostSaved':
        return (b.isSaved ? 1 : 0) - (a.isSaved ? 1 : 0);
      case 'nearby':
        return Math.random() - 0.5;
      case 'mostRecent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-gray-900">Word to Mouth</h1>
            <Button
              onClick={() => setCurrentScreen('post')}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-1" />
              Post
            </Button>
          </div>
          
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3 transition-all"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="px-3 transition-all"
              >
                <Map className="w-4 h-4" />
              </Button>
            </div>
            
            <Select value={sortOption} onValueChange={(value: any) => setSortOption(value)}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mostHot">Most Hot</SelectItem>
                <SelectItem value="mostRecent">Most Recent</SelectItem>
                <SelectItem value="mostTried">Most Tried</SelectItem>
                <SelectItem value="mostSaved">Most Saved</SelectItem>
                <SelectItem value="nearby">Nearby</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={categoryFilter === category || (category === 'All' && !categoryFilter) ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter(category === 'All' ? '' : category)}
                className="whitespace-nowrap text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        {viewMode === 'map' ? (
          <MapView />
        ) : (
          <div className="space-y-4">
            {sortedItems.length > 0 ? (
              sortedItems.map((item) => (
                <FoodItemCard
                  key={item.id}
                  item={item}
                  onReact={(reaction) => reactToItem(item.id, reaction)}
                  onToggleSave={() => toggleSaveItem(item.id)}
                  onClick={() => {
                    setSelectedItem(item);
                    setCurrentScreen('detail');
                  }}
                  isHighlighted={item.id === highlightedItemId}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <Utensils className="w-16 h-16 mx-auto text-orange-200 mb-4" />
                  <div className="w-20 h-1 bg-orange-200 mx-auto mb-2"></div>
                  <div className="w-12 h-1 bg-orange-100 mx-auto"></div>
                </div>
                {categoryFilter && categoryFilter !== 'All' ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No posts yet in this category
                    </h3>
                    <p className="text-gray-500 mb-6">Be the first to share one!</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Hungry for something great?
                    </h3>
                    <p className="text-gray-500 mb-6">Start by sharing a dish!</p>
                  </>
                )}
                <Button
                  onClick={() => setCurrentScreen('post')}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Share Your First Dish
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
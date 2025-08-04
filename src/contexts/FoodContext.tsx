import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FoodItem, SortOption, ViewMode, ReactionType, CreateFoodItemData } from '@/types/food';
import { additionalMockItems } from './FoodContextExtended';
import { getCategoryImage } from '@/lib/categoryImages';

interface FoodContextType {
  foodItems: FoodItem[];
  viewMode: ViewMode;
  sortOption: SortOption;
  categoryFilter: string;
  currentScreen: 'main' | 'post' | 'detail';
  selectedItem: FoodItem | null;
  setViewMode: (mode: ViewMode) => void;
  setSortOption: (option: SortOption) => void;
  setCategoryFilter: (category: string) => void;
  setCurrentScreen: (screen: 'main' | 'post' | 'detail') => void;
  setSelectedItem: (item: FoodItem | null) => void;
  addFoodItem: (data: CreateFoodItemData) => string;
  reactToItem: (itemId: string, reaction: ReactionType) => void;
  toggleSaveItem: (itemId: string) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error('useFoodContext must be used within FoodProvider');
  }
  return context;
};

export const FoodProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock data for testing
  const mockFoodItems: FoodItem[] = [
    {
      id: '1',
      dishName: 'Animal Style Burger',
      restaurantName: 'In-N-Out Burger',
      description: 'mustard grilled patty, extra pickles, grilled onions',
      location: { lat: 32.7157, lng: -117.1611, address: 'San Diego, CA' },
      imageUrl: getCategoryImage('Burgers'),
      tags: ['Off-menu hack', 'Must try'],
      category: 'Burgers',
      parkingTips: 'back lot has more spaces',
      reactions: { wantToTry: 15, liked: 23, overrated: 2, weird: 1 },
      isSaved: false,
      createdAt: new Date('2024-01-15'),
      userId: 'user1'
    },
    {
      id: '2',
      dishName: 'Spicy Tuna Crispy Rice',
      restaurantName: 'Nobu',
      description: 'ask for extra spicy mayo on top',
      location: { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' },
      imageUrl: getCategoryImage('Sushi'),
      tags: ['Hidden gem', 'Tastes spicy'],
      category: 'Sushi',
      parkingTips: 'valet only, $15',
      reactions: { wantToTry: 8, liked: 12, overrated: 3, weird: 0 },
      isSaved: true,
      createdAt: new Date('2024-01-14'),
      userId: 'user2'
    },
    {
      id: '3',
      dishName: 'Breakfast Burrito',
      restaurantName: 'Lolita\'s Mexican Food',
      description: 'carne asada, extra guac, crispy hash browns inside',
      location: { lat: 32.7157, lng: -117.1611, address: 'San Diego, CA' },
      imageUrl: getCategoryImage('Burritos'),
      tags: ['Must try', 'Hidden gem'],
      category: 'Burritos',
      parkingTips: '',
      reactions: { wantToTry: 12, liked: 18, overrated: 1, weird: 0 },
      isSaved: false,
      createdAt: new Date('2024-01-13'),
      userId: 'user3'
    },
    {
      id: '4',
      dishName: 'Truffle Mac & Cheese',
      restaurantName: 'The Purple Pig',
      description: 'ask them to add crispy pancetta on top',
      location: { lat: 41.8781, lng: -87.6298, address: 'Chicago, IL' },
      imageUrl: getCategoryImage('Bowls'),
      tags: ['Off-menu hack'],
      category: 'Bowls',
      parkingTips: 'street parking only, bring quarters',
      reactions: { wantToTry: 6, liked: 9, overrated: 4, weird: 1 },
      isSaved: true,
      createdAt: new Date('2024-01-12'),
      userId: 'user4'
    },
    {
      id: '5',
      dishName: 'Chocolate Lava Cake',
      restaurantName: 'Uchi',
      description: 'order with vanilla ice cream and ask for sea salt on top',
      location: { lat: 30.2672, lng: -97.7431, address: 'Austin, TX' },
      imageUrl: getCategoryImage('Dessert'),
      tags: ['Must try'],
      category: 'Dessert',
      parkingTips: 'valet available after 6pm',
      reactions: { wantToTry: 20, liked: 25, overrated: 0, weird: 2 },
      isSaved: false,
      createdAt: new Date('2024-01-11'),
      userId: 'user5'
    },
    {
      id: '6',
      dishName: 'Cubano Sandwich',
      restaurantName: 'Porto\'s Bakery',
      description: 'extra pickles, light mustard, toasted golden',
      location: { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA' },
      imageUrl: getCategoryImage('Sandwiches'),
      tags: ['Hidden gem', 'Must try'],
      category: 'Sandwiches',
      parkingTips: 'free lot behind building',
      reactions: { wantToTry: 10, liked: 16, overrated: 2, weird: 0 },
      isSaved: true,
      createdAt: new Date('2024-01-10'),
      userId: 'user6'
    }
  ];

  const [foodItems, setFoodItems] = useState<FoodItem[]>([...mockFoodItems, ...additionalMockItems]);
  
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortOption, setSortOption] = useState<SortOption>('mostHot');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<'main' | 'post' | 'detail'>('main');
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const addFoodItem = (data: CreateFoodItemData): string => {
    const newId = Date.now().toString();
    const newItem: FoodItem = {
      ...data,
      id: newId,
      reactions: { wantToTry: 0, liked: 0, overrated: 0, weird: 0 },
      isSaved: false,
      createdAt: new Date(),
      userId: 'currentUser'
    };
    setFoodItems(prev => [newItem, ...prev]);
    return newId;
  };

  const reactToItem = (itemId: string, reaction: ReactionType) => {
    setFoodItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newReactions = { ...item.reactions };
        if (item.userReaction) {
          newReactions[item.userReaction]--;
        }
        newReactions[reaction]++;
        return { ...item, reactions: newReactions, userReaction: reaction };
      }
      return item;
    }));
  };

  const toggleSaveItem = (itemId: string) => {
    setFoodItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isSaved: !item.isSaved } : item
    ));
  };

  return (
    <FoodContext.Provider value={{
      foodItems, viewMode, sortOption, categoryFilter, currentScreen, selectedItem,
      setViewMode, setSortOption, setCategoryFilter, setCurrentScreen, setSelectedItem,
      addFoodItem, reactToItem, toggleSaveItem
    }}>
      {children}
    </FoodContext.Provider>
  );
};
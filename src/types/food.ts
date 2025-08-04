export interface FoodItem {
  id: string;
  dishName: string;
  restaurantName: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl?: string;
  tags: string[];
  category?: string;
  parkingTips?: string;
  reactions: {
    wantToTry: number;
    liked: number;
    overrated: number;
    weird: number;
  };
  userReaction?: 'wantToTry' | 'liked' | 'overrated' | 'weird';
  isSaved: boolean;
  createdAt: Date;
  userId: string;
}

export type SortOption = 'mostTried' | 'mostSaved' | 'mostRecent' | 'nearby' | 'mostHot';
export type ViewMode = 'map' | 'list';
export type ReactionType = 'wantToTry' | 'liked' | 'overrated' | 'weird';

export interface CreateFoodItemData {
  dishName: string;
  restaurantName: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  imageUrl?: string;
  tags: string[];
  category?: string;
  parkingTips?: string;
}
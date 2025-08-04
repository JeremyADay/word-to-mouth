import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Camera, X } from 'lucide-react';
import { useFoodContext } from '@/contexts/FoodContext';
import { CreateFoodItemData } from '@/types/food';
import PhotoSuggestionModal from './PhotoSuggestionModal';
const PostScreen: React.FC = () => {
  const { setCurrentScreen, addFoodItem } = useFoodContext();
  const [formData, setFormData] = useState<CreateFoodItemData>({
    dishName: '',
    restaurantName: '',
    description: '',
    location: {
      lat: 0,
      lng: 0,
      address: 'Getting location...'
    },
    imageUrl: '',
    tags: []
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [locationOverride, setLocationOverride] = useState('');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const availableTags = ['Off-menu hack', 'Customization tip', 'Viral on TikTok', 'Hidden gem', 'Must try', 'Tastes spicy', 'Vegetarian', 'Gluten-free'];
  const categories = ['Burritos', 'Sandwiches', 'Burgers', 'Bowls', 'Sushi', 'Pasta', 'Pizza', 'Salad', 'Noodles', 'Dessert', 'Breakfast', 'Drinks'];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Mock reverse geocoding to readable city name
          const mockCityNames = [
            'San Diego, CA', 'Los Angeles, CA', 'San Francisco, CA', 
            'New York, NY', 'Chicago, IL', 'Austin, TX', 'Seattle, WA'
          ];
          const randomCity = mockCityNames[Math.floor(Math.random() * mockCityNames.length)];
          
          setFormData(prev => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
              address: randomCity
            }
          }));
        },
        () => {
          // Fallback to default city
          setFormData(prev => ({
            ...prev,
            location: {
              lat: 40.7128,
              lng: -74.0060,
              address: 'New York, NY'
            }
          }));
        }
      );
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.dishName || !formData.restaurantName || !selectedCategory) {
      return;
    }
    
    // Show photo modal if no image
    if (!formData.imageUrl) {
      setShowPhotoModal(true);
      return;
    }
    
    submitForm();
  };

  const submitForm = () => {
    const finalLocation = locationOverride 
      ? { ...formData.location, address: locationOverride }
      : formData.location;

    const newItemId = addFoodItem({
      ...formData,
      location: finalLocation,
      tags: selectedTags,
      category: selectedCategory
    });
    
    setCurrentScreen('main');
    
    // Show success toast
    if ((window as any).showToast) {
      (window as any).showToast('🎉 Dish posted! Thanks for spreading the word.');
    }
    
    // Highlight the new post
    setTimeout(() => {
      if ((window as any).highlightNewPost) {
        (window as any).highlightNewPost(newItemId);
      }
    }, 100);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else if (prev.length < 3) {
        return [...prev, tag];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('main')}>
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Share a Dish</h1>
          <div className="w-16" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="dishName">Dish Name *</Label>
          <Input
            id="dishName"
            placeholder="Chicken Tikka Wrap with Extra Garlic Sauce"
            value={formData.dishName}
            onChange={(e) => setFormData(prev => ({ ...prev, dishName: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="restaurantName">Restaurant Name *</Label>
          <Input
            id="restaurantName"
            placeholder="e.g. Pho House, Tacos El Gordo, or Panda Express"
            value={formData.restaurantName}
            onChange={(e) => setFormData(prev => ({ ...prev, restaurantName: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Dish Category *</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description & Tips</Label>
          <Textarea
            id="description"
            placeholder="Any tips? Sub a different cheese, ask for sauce on the side, or stack with another item?"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 border rounded-md bg-gray-50">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{formData.location.address}</span>
            </div>
            <Input
              placeholder="Override city (e.g. La Jolla, Hillcrest, Downtown)"
              value={locationOverride}
              onChange={(e) => setLocationOverride(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="parkingTips">Parking Tips (optional)</Label>
          <Textarea
            id="parkingTips"
            placeholder="e.g. Street parking only. Use alley entrance. Lot around the back."
            value={formData.parkingTips || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, parkingTips: e.target.value }))}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Photo *</Label>
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-md" />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setImagePreview('');
                  setImageFile(null);
                  setFormData(prev => ({ ...prev, imageUrl: '' }));
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-full h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-gray-400">
                <div className="text-center">
                  <Camera className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                  <span className="text-sm text-gray-500">Add Photo</span>
                </div>
              </div>
            </label>
          )}
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <p className="text-sm text-gray-500">Choose up to 3 tags that best describe this dish.</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedTags.length >= 3 && !selectedTags.includes(tag)
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {selectedTags.includes(tag) && <X className="w-3 h-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600"
          disabled={!formData.dishName || !formData.restaurantName || !selectedCategory}
        >
          Share Dish
        </Button>
      </form>

      <PhotoSuggestionModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onAddPhoto={() => {
          setShowPhotoModal(false);
          document.querySelector('input[type="file"]')?.click();
        }}
        onSkip={() => {
          setShowPhotoModal(false);
          submitForm();
        }}
      />
    </div>
  );
};
export default PostScreen;
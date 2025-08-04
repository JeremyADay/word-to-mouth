import React from 'react';
import { MapPin } from 'lucide-react';

const MapView: React.FC = () => {
  const mockPosts = [
    { id: 1, name: 'Pizza Margherita', restaurant: 'Tony\'s', x: '25%', y: '30%' },
    { id: 2, name: 'Beef Tacos', restaurant: 'El Loco', x: '60%', y: '45%' },
    { id: 3, name: 'Ramen Bowl', restaurant: 'Noodle House', x: '40%', y: '65%' },
  ];

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
      {/* Static map background */}
      <div className="absolute inset-0 bg-gray-200 opacity-50">
        <div className="w-full h-full bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200"></div>
      </div>
      
      {/* Mock food post pins */}
      {mockPosts.map((post) => (
        <div
          key={post.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: post.x, top: post.y }}
        >
          <div className="relative">
            <MapPin className="w-8 h-8 text-orange-500 drop-shadow-lg group-hover:scale-110 transition-transform" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs">
              <div className="font-semibold">{post.name}</div>
              <div className="text-gray-600">{post.restaurant}</div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Coming soon message */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-center">
        <p className="text-sm text-gray-700 font-medium">Full map support coming soon</p>
      </div>
    </div>
  );
};
export default MapView;
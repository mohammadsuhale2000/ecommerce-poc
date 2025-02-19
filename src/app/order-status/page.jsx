'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderStatus() {
  const [trackingId, setTrackingId] = useState('');
  const router = useRouter();
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    // Generate tracking ID after the component is mounted
    function generateTrackingId() {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numbers = '0123456789';
      let trackingId = '';

      for (let i = 0; i < 3; i++) {
        trackingId += letters.charAt(Math.floor(Math.random() * letters.length));
      }

      for (let i = 0; i < 9; i++) {
        trackingId += numbers.charAt(Math.floor(Math.random() * numbers.length));
      }

      return trackingId;
    }

    // Set tracking ID state
    setTrackingId(generateTrackingId());
  }, []);

  const navigateToItems = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600">
            Your Order is On the Way!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-1 bg-gray-200 rounded"></div>
            </div>
            <Truck className="w-16 h-16 text-blue-500 relative z-10 animate-truck" />
          </div>
          <p className="text-center text-gray-600">
            Great news! Your package has left our warehouse and is making its way to you.
          </p>
          <div className="text-sm text-gray-500">
            <p>
              Estimated delivery: <span className="font-semibold">{currentDate}</span>
            </p>
            <p>
              Tracking number: <span className="font-semibold">{trackingId || 'Loading...'}</span>
            </p>
          </div>

          {/* Button to navigate to another route */}
          <button
            onClick={navigateToItems}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
          >
            See More Items
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

import React from 'react';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'Bitcoin Price Surge',
      message: 'Bitcoin has surged by 10% in the last 24 hours!',
      type: 'price',
    },
    {
      id: 2,
      title: 'Ethereum News',
      message: 'Ethereum network upgrade completed successfully.',
      type: 'news',
    },
    {
      id: 3,
      title: 'Bitcoin Dip',
      message: 'Bitcoin dropped by 5% today. Consider your positions.',
      type: 'price',
    },
    {
      id: 4,
      title: 'Crypto Exchange Announcements',
      message: 'New trading pairs available on Techno.',
      type: 'exchange',
    },
    {
      id: 4,
      title: 'Crypto Exchange Announcements',
      message: 'New trading pairs available on Techno.',
      type: 'exchange',
    },
    {
      id: 4,
      title: 'Crypto Exchange Announcements',
      message: 'New trading pairs available on Techno.',
      type: 'exchange',
    },
    {
      id: 4,
      title: 'Crypto Exchange Announcements',
      message: 'New trading pairs available on Techno.',
      type: 'exchange',
    },
    {
      id: 4,
      title: 'Crypto Exchange Announcements',
      message: 'New trading pairs available on Techno.',
      type: 'exchange',
    },
  ];

  return (
    <div className="lg:h-screen fluid-container mx-auto p-4 pt-24 dark:bg-offBlack ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 rounded-lg shadow-lg ${
              notification.type === 'price'
                ? 'bg-yellow-400 text-black'
                : notification.type === 'news'
                ? 'bg-blue-500 text-white'
                : notification.type === 'exchange'
                ? 'bg-green-400 text-black'
                : 'bg-red-500 text-white'
            } transition-all hover:scale-105`}
          >
            <h3 className="font-bold text-lg">{notification.title}</h3>
            <p className="mt-2">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;

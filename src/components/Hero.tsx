import React from 'react';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-purple-500 via-blue-600 to-indigo-600 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to BountyHub</h1>
        <p className="text-lg mb-8">
          Reward developers for their contributions to your GitHub projects. Effortlessly create, manage, and approve bounties with ease.
        </p>
        <div className="flex justify-center">
          <a href="" className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300">
            Learn How It Works
          </a>
          <a href="/dashboard" className="ml-4 bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300">
            Start Now
          </a>
        </div>
      </div>
    </section>
  );
};


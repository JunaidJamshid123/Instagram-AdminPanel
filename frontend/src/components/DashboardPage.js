import React from 'react';
import Header from './header'; // Adjusted path to header
import Layout from './Layout'; // Adjusted path to layout

export default function DashboardPage() {
  return (
    <Layout>
      <Header />
      <div className="flex-1 p-8">
        {/* Empty content area for dynamic content */}
        <p>Welcome to your dashboard!</p>
      </div>
    </Layout>
  );
}

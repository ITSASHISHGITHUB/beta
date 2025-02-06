import React from 'react';
import { signOut } from 'next-auth/react';

const Test = () => {
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' }); // Redirect to homepage after sign-out
    } catch (error) {
      console.error('❌ Sign-out error:', error.message);
    }
  };

  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Test;

import React from 'react';
import { ConnectKitButton } from 'connectkit';

export default function ConnectModal() {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <ConnectKitButton />
    </div>
  );
};


import React from 'react';

const Database: React.FC = () => {
  return (
    <div className="w-full h-full -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8">
      {/* Full-width container that extends beyond the normal content padding */}
      <div className="w-full h-screen relative">
        <iframe
          className="airtable-embed w-full h-full border-0"
          src="https://airtable.com/embed/appueKSPgpA1q4iJg/shrUQWJM7QZ6uk32n?viewControls=on"
          frameBorder="0"
          style={{
            background: 'transparent',
            minHeight: 'calc(100vh - 200px)', // Account for header and footer
          }}
          title="VTE Database"
        />
      </div>
    </div>
  );
};

export default Database; 
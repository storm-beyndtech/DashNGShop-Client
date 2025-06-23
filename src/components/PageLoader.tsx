const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <img 
            src="https://res-console.cloudinary.com/ddb1vjioq/thumbnails/v1/image/upload/v1750676755/ZGFzaG5nLWxvZ29fYnVmNWwy/drilldown" 
            alt="Logo" 
            className="w-20 animate-pulse relative z-10"
            style={{
              filter: 'brightness(0.8)',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
          
          {/* Cool spinner ring */}
          <div className="absolute inset-0 w-24 h-24 -ml-2 -mt-2">
            <div className="w-full h-full border-2 border-orange-200 rounded-full animate-spin"
                 style={{
                   borderTopColor: '#9ca3af',
                   animation: 'spin 3s linear infinite'
                 }}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
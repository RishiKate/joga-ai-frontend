import { useState } from 'react';
import { VideoUpload } from './components/VideoUpload';
import { VideoPlayer } from './components/VideoPlayer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useVideoAnalysis } from './hooks/useVideoAnalysis';

function App() {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  
  const { 
    stats, 
    feedback, 
    isLoading, 
    error, 
    analyzeVideo, 
    clearAnalysis 
  } = useVideoAnalysis();

  const handleVideoUpload = async (file: File) => {
    setUploadedVideo(file);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    
    // Send video to API for analysis
    await analyzeVideo(file);
  };

  const handleTimestampClick = (timestamp: number) => {
    // Find the video element and jump to the timestamp
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.currentTime = timestamp;
      videoElement.play();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">AI Video Coach</h1>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player Area */}
          <div className="flex-1 p-6">
            <div className="h-full bg-white rounded-lg border border-gray-200">
              {!uploadedVideo ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-lg font-medium text-gray-900 mb-6">
                      Upload Your Training Video
                    </h2>
                    <VideoUpload onVideoUpload={handleVideoUpload} />
                  </div>
                </div>
              ) : (
                <div className="h-full p-6">
                  <VideoPlayer
                    videoUrl={videoUrl}
                    onTimeUpdate={() => {
                      // Handle time updates if needed
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Panel - AI Messages */}
          {uploadedVideo && (
            <div className="h-64 p-6 pt-0">
              <div className="h-full bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">AI Coach Feedback</h3>
                </div>
                <div className="p-4 h-[calc(100%-57px)] overflow-y-auto">
                  {isLoading ? (
                    <LoadingSpinner message="Analyzing video..." />
                  ) : error ? (
                    <ErrorMessage 
                      message={error} 
                      onRetry={() => uploadedVideo && analyzeVideo(uploadedVideo)} 
                    />
                  ) : (
                    <div className="space-y-3">
                      {feedback.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleTimestampClick(item.timestamp)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <button
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTimestampClick(item.timestamp);
                              }}
                            >
                              {item.time}
                            </button>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'positive' ? 'bg-green-100 text-green-800' :
                              item.type === 'improvement' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{item.message}</p>
                        </div>
                      ))}
                      {feedback.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <p>No feedback available yet.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Stats */}
        <div className="w-80 p-6 pl-0">
          <div className="h-full bg-white rounded-lg border border-gray-200">
            {uploadedVideo && stats ? (
              <div className="p-6">
                <h3 className="font-medium text-gray-900 mb-4">Video Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-900">{stats.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">File Size</span>
                    <span className="text-gray-900">{stats.fileSize}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resolution</span>
                    <span className="text-gray-900">{stats.resolution}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frame Rate</span>
                    <span className="text-gray-900">{stats.fps} fps</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                    onClick={() => {
                      setUploadedVideo(null);
                      setVideoUrl('');
                      clearAnalysis();
                    }}
                  >
                    Upload New Video
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p className="text-sm">Upload a video to see stats</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

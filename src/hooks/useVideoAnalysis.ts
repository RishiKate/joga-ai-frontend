import { useState, useCallback } from 'react';
import { apiService, AnalysisResponse } from '../services/api';
import { VideoStats, FeedbackItem } from '../types';

export interface UseVideoAnalysisReturn {
  stats: VideoStats | null;
  feedback: FeedbackItem[];
  isLoading: boolean;
  error: string | null;
  analyzeVideo: (file: File) => Promise<void>;
  clearAnalysis: () => void;
}

export const useVideoAnalysis = (): UseVideoAnalysisReturn => {
  const [stats, setStats] = useState<VideoStats | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeVideo = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setStats(null);
    setFeedback([]);

    try {
      const response: AnalysisResponse = await apiService.analyzeVideo(file);
      setStats(response.stats);
      setFeedback(response.feedback);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze video';
      setError(errorMessage);
      console.error('Video analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearAnalysis = useCallback(() => {
    setStats(null);
    setFeedback([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    stats,
    feedback,
    isLoading,
    error,
    analyzeVideo,
    clearAnalysis,
  };
};

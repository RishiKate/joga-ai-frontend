export interface VideoStats {
  duration: string;
  fileSize: string;
  resolution: string;
  fps: number;
  uploadDate: string;
}

export interface FeedbackItem {
  id: string;
  timestamp: number;
  time: string;
  message: string;
  type: 'positive' | 'improvement' | 'technique';
  category: string;
}

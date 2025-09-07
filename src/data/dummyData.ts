import { VideoStats, FeedbackItem } from '../types';

export const dummyStats: VideoStats = {
  duration: "2:34",
  fileSize: "45.2 MB",
  resolution: "1920x1080",
  fps: 30,
  uploadDate: "2024-01-15"
};

export const dummyFeedback: FeedbackItem[] = [
  {
    id: "1",
    timestamp: 15,
    time: "0:15",
    message: "Great form on your backhand! Keep your elbow close to your body.",
    type: "positive",
    category: "Technique"
  },
  {
    id: "2",
    timestamp: 32,
    time: "0:32",
    message: "Try to follow through more on your forehand swing.",
    type: "improvement",
    category: "Technique"
  },
  {
    id: "3",
    timestamp: 48,
    time: "0:48",
    message: "Excellent footwork positioning here!",
    type: "positive",
    category: "Movement"
  },
  {
    id: "4",
    timestamp: 67,
    time: "1:07",
    message: "Focus on keeping your head up during the approach.",
    type: "improvement",
    category: "Posture"
  },
  {
    id: "5",
    timestamp: 89,
    time: "1:29",
    message: "Perfect timing on that serve!",
    type: "positive",
    category: "Technique"
  },
  {
    id: "6",
    timestamp: 112,
    time: "1:52",
    message: "Consider adjusting your grip for better control.",
    type: "technique",
    category: "Equipment"
  },
  {
    id: "7",
    timestamp: 134,
    time: "2:14",
    message: "Great recovery after that difficult shot!",
    type: "positive",
    category: "Mental Game"
  }
];

// This file previously contained @emotion/styled components
// The styled components have been removed to eliminate MUI/Emotion dependencies
// The CelebImage component should use Tailwind CSS classes directly

// Helper function for getting rank background styles
export const getRankBorderStyle = (rank) => {
  const rankStyles = {
    S: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500',
    A: 'bg-gradient-to-br from-pink-300 via-pink-400 to-red-400', 
    B: 'bg-gradient-to-br from-green-300 via-green-400 to-teal-500',
    C: 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500',
    D: 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400',
  };
  return rankStyles[rank] || '';
};
'use client';


import { Star, User } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title?: string;
  content: string;
  verified?: boolean;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className = '' }: ReviewCardProps) {
  return (
    <div className={`card-turtle p-6 space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-turtle-green-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-turtle-green-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-slate-900">{review.author}</h4>
              {review.verified && (
                <span className="px-2 py-0.5 bg-turtle-green-100 text-turtle-green-700 text-xs font-medium rounded-full">
                  Verified
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500">{review.date}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      {review.title && <h5 className="font-semibold text-slate-900">{review.title}</h5>}

      {/* Content */}
      <p className="text-slate-600 leading-relaxed">{review.content}</p>
    </div>
  );
}

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  className?: string;
}

export function ReviewSummary({
  averageRating,
  totalReviews,
  ratingBreakdown,
  className = '',
}: ReviewSummaryProps) {
  const maxCount = Math.max(...Object.values(ratingBreakdown));

  return (
    <div className={`card-turtle p-8 space-y-6 ${className}`}>
      {/* Overall Rating */}
      <div className="text-center space-y-3">
        <div className="text-6xl font-bold text-slate-900 font-mono">{averageRating.toFixed(1)}</div>
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < Math.floor(averageRating) ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
              }`}
            />
          ))}
        </div>
        <p className="text-slate-600">
          Based on <span className="font-semibold text-slate-900">{totalReviews.toLocaleString()}</span> reviews
        </p>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-3">
        {([5, 4, 3, 2, 1] as const).map((rating) => {
          const count = ratingBreakdown[rating];
          const percentage = (count / totalReviews) * 100;
          const barWidth = (count / maxCount) * 100;

          return (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-slate-700">{rating}</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${barWidth}%` }}
                />
              </div>

              <span className="text-sm text-slate-600 w-12 text-right">{percentage.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
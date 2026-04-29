import React, { useEffect, useState, useRef } from 'react';

const BACKEND_URL = (import.meta.env.VITE_API_URL as string || 'http://localhost:5001')
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '');

type Review = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  userId?: {
    fullName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
  };
};

function displayName(user?: Review['userId']): string {
  if (!user) return 'Anonymous';
  if (user.fullName) return user.fullName;
  if (user.firstName || user.lastName) return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  if (user.email) return user.email.split('@')[0];
  return 'Anonymous';
}

function initials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const name = displayName(review.userId);
  const date = new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const pic = review.userId?.profilePicture;

  return (
    <div className="flex-shrink-0 w-72 sm:w-80 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 snap-start">
      <div className="flex items-center gap-3">
        {pic ? (
          <img src={pic} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/20 flex items-center justify-center text-xs font-bold text-cyan-300 flex-shrink-0">
            {initials(name)}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{name}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <StarRow rating={review.rating} />
      <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">{review.comment}</p>
    </div>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/reviews`)
      .then(r => r.json())
      .then(d => setReviews(d.data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    if (!reviews.length) return;
    const el = scrollRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const speed = 0.4;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(frame);
    const resume = () => { frame = requestAnimationFrame(step); };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [reviews]);

  if (!loading && reviews.length === 0) return null;

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const doubled = [...reviews, ...reviews];

  return (
    <section className="w-full py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">What Students Say</h2>
            <p className="text-gray-400 text-sm mt-1">Real experiences from our community</p>
          </div>
          {avgRating && (
            <div className="text-right hidden sm:block">
              <p className="text-4xl font-black text-white">{avgRating}</p>
              <div className="flex justify-end gap-0.5 mt-1">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-4 h-4 ${s <= Math.round(parseFloat(avgRating)) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">{reviews.length} reviews</p>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={`${review._id}-${i}`} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

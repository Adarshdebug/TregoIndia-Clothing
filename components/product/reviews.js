export function ReviewList({ reviews }) {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={`${review.name}-${index}`} className="touch-card p-5">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.name}</p>
            <p className="text-sm text-white/60">{Array.from({ length: review.rating }).map(() => "★")}</p>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/65">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

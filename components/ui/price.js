export function Price({ price, compareAtPrice }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold">Rs. {price.toLocaleString("en-IN")}</span>
      {compareAtPrice ? (
        <span className="text-sm text-white/35 line-through">
          Rs. {compareAtPrice.toLocaleString("en-IN")}
        </span>
      ) : null}
    </div>
  );
}

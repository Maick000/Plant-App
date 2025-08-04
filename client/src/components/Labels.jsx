export function Label({children, ...props}) {
  return (
    <label className="block text-lime-950 text-sm mb-1"
    {...props}
    >
        {children}
    </label>
  );
}

const FloatingOrbs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div
      className="absolute top-1/4 -left-32 w-96 h-96 rounded-full animate-float-slow"
      style={{
        background:
          "radial-gradient(circle, hsl(174 72% 56% / 0.08) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute top-2/3 -right-20 w-80 h-80 rounded-full animate-float"
      style={{
        background:
          "radial-gradient(circle, hsl(262 60% 58% / 0.06) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute -top-20 right-1/3 w-64 h-64 rounded-full animate-pulse-glow"
      style={{
        background:
          "radial-gradient(circle, hsl(174 72% 56% / 0.05) 0%, transparent 70%)",
      }}
    />
  </div>
);

export default FloatingOrbs;

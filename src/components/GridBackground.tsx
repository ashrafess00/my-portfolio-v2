const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
    <div
      className="w-full h-full"
      style={{
        backgroundImage: `linear-gradient(hsl(174 72% 56% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(174 72% 56% / 0.3) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
      }}
    />
  </div>
);

export default GridBackground;

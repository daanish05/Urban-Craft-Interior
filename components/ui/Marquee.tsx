type Props = {
  items: string[];
  separator?: string;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  light?: boolean;
};

export default function Marquee({
  items,
  separator = "•",
  direction = "left",
  speed = 40,
  className = "",
  light = false,
}: Props) {
  const track =
    direction === "left" ? "marquee-track" : "marquee-track-reverse";
  const textCls = light ? "text-ivory" : "text-fg-primary";

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-6">{item}</span>
          <span className="text-gold">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee-pause overflow-hidden ${className}`}
      style={{ ["--duration" as string]: `${speed}s` }}
    >
      <div className={`flex w-max ${track} ${textCls}`}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

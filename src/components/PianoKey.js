import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

export default function PianoKey({ note, onPress, triggerCount }) {

  const [style, api] = useSpring(() => ({
    transform: "scale(1)"
  }));

  useEffect(() => {
    if (!triggerCount) return;

    api.start({ transform: "scale(0.95)" });

    const timer = setTimeout(() => {
      api.start({ transform: "scale(1)" });
    }, 100);

    return () => clearTimeout(timer);
  }, [triggerCount, api]);

  return (
    <animated.div
      style={style}
      onMouseDown={() => onPress(note)}
      className="w-16 h-64 bg-white border border-black flex items-end justify-center cursor-pointer"
    >
      {note}
    </animated.div>
  );
}
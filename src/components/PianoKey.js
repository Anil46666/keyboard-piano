import { useSpring, animated } from "@react-spring/web";

export default function PianoKey({ note, playNote }) {

  const [style, api] = useSpring(() => ({
    transform: "scale(1)"
  }));

  const pressKey = () => {
    api.start({ transform: "scale(0.95)" });
    playNote(note);

    setTimeout(() => {
      api.start({ transform: "scale(1)" });
    }, 100);
  };

  return (
    <animated.div
      style={style}
      onMouseDown={pressKey}
      className="w-16 h-64 bg-white border border-black flex items-end justify-center cursor-pointer"
    >
      {note}
    </animated.div>
  );
}
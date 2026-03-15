import { useCallback, useEffect, useState } from "react";
import PianoKey from "./PianoKey";
import { playNote } from "../audio/piano";

const KEYBOARD_MAP = {
  a: "C4",
  s: "D4",
  d: "E4",
  f: "F4",
  g: "G4",
  h: "A4",
  j: "B4",
};

const WHITE_KEYS = ["C4","D4","E4","F4","G4","A4","B4"];

export default function Piano() {
  const [triggerCounts, setTriggerCounts] = useState(
    () => Object.fromEntries(WHITE_KEYS.map((note) => [note, 0]))
  );

  const triggerNote = useCallback((note) => {
    playNote(note);
    setTriggerCounts((prev) => ({
      ...prev,
      [note]: (prev[note] || 0) + 1,
    }));
  }, []);

  useEffect(() => {

    const handleKey = (e) => {
      const note = KEYBOARD_MAP[e.key.toLowerCase()];
      if(note) triggerNote(note);
    };

    window.addEventListener("keydown",handleKey);

    return () => window.removeEventListener("keydown",handleKey);

  }, [triggerNote]);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex">
        {WHITE_KEYS.map(note => (
          <PianoKey
            key={note}
            note={note}
            onPress={triggerNote}
            triggerCount={triggerCounts[note]}
          />
        ))}
      </div>

      <div className="w-full max-w-3xl rounded-lg border border-gray-700 bg-gray-800/80 p-4 text-left text-sm text-gray-100">
        <p className="text-base font-semibold">How to play</p>
        <p className="mt-1 text-gray-300">Click any piano key with your mouse, or press these keyboard letters:</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(KEYBOARD_MAP).map(([letter, note]) => (
            <span
              key={letter}
              className="rounded-md border border-gray-600 bg-gray-900 px-2 py-1 font-mono text-xs uppercase"
            >
              {letter} - {note}
            </span>
          ))}
        </div>

        <p className="mt-3 text-gray-300">Tip: hold Shift or Caps Lock if you want, uppercase letters also work.</p>
      </div>
    </div>
  );
}
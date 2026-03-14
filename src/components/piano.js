import { useEffect } from "react";
import PianoKey from "./PianoKey";
import { playNote } from "../audio/piano";

export default function Piano() {

  const whiteKeys = ["C4","D4","E4","F4","G4","A4","B4"];

  useEffect(() => {

    const map = {
      a:"C4",
      s:"D4",
      d:"E4",
      f:"F4",
      g:"G4",
      h:"A4",
      j:"B4"
    };

    const handleKey = (e) => {
      const note = map[e.key];
      if(note) playNote(note);
    };

    window.addEventListener("keydown",handleKey);

    return () => window.removeEventListener("keydown",handleKey);

  },[]);

  return (
    <div className="flex">

      {whiteKeys.map(note => (
        <PianoKey
          key={note}
          note={note}
          playNote={playNote}
        />
      ))}

    </div>
  );
}
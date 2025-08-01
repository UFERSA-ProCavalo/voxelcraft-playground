import { useEffect, useRef, useState } from "react";
import type { Widget } from "../widget";

const SOUNDCLOUD_URL =
  "https%3A" + 
  "//soundcloud.com/coffeeshopjazzrelax/sets/chill-coffee-jazz?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing& +"
  "show_artwork=false&show_playcount=false&buying=false&autoplay=true";

export default function SoundCloudPlayer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const widgetRef = useRef<Widget | null>(null);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  // Load SoundCloud Widget SDK script
  useEffect(() => {
    if (window.SC && typeof (window.SC.Widget as any) === "function") {
      setIsSdkReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => {
      setIsSdkReady(true);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Setup SC.Widget when SDK and iframe are ready

  useEffect(() => {
    if (!isSdkReady || !iframeRef.current) return;

    const widget = window.SC.Widget(iframeRef.current);
    widgetRef.current = widget;

    widget.bind("ready", () => {
    widget.getCurrentSound((sound: any) => {
      setTitle(sound?.title || "Desconhecido");
    });

    widget.getDuration((dur: number) => {
      setDuration(dur);
    });

  widget.bind("playProgress", (e: any) => {
      setPosition(e.currentPosition);
  });
});

    widget.bind("play", () => {
        console.log("Track started playing!");
        setIsPaused(false);

        // Atualiza os dados da nova faixa
        widget.getCurrentSound((sound: any) => {
            setTitle(sound?.title || "Desconhecida");
        });

        widget.getDuration((dur: number) => {
            setDuration(dur);
        });
    });

    widget.bind("pause", () => {
      console.log("Track paused.");
      setIsPaused(true);
    });

    widget.bind("finish", () => {
      console.log("Track finished.");
    });

    return () => {
      widget.unbind("play");
      widget.unbind("pause");
      widget.unbind("finish");
      widget.unbind("ready");
      widget.unbind("playProgress");
    };
  }, [isSdkReady]);

    const togglePlayPause = () => {
    if (!widgetRef.current) return;
    widgetRef.current.toggle();
  };
  
function formatTime(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

  return (
    <div>
      <iframe
        ref={iframeRef}
        id="sc-widget"
        width="1%"
        height="1"
        allow="autoplay"
        style={{display : "none"}} // frame escondido, apenas toca a música
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          SOUNDCLOUD_URL
        )}`}
      ></iframe>
    {/* UI customizada */}
      <h3>{title || "Desconhecida"}</h3>
      <button onClick={togglePlayPause} style={{ margin: "10px 0" }}>
        {isPaused ? "▶️ Play" : "⏸ Pause"}
      </button>
      <p>
        {formatTime(position)} | {formatTime(duration)}
      </p>
    </div>
  );
}

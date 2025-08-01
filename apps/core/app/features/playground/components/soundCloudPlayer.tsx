import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume,
  VolumeX,
  Info,
} from "lucide-react";
import type { Widget } from "../widget";
import { useSettingsStore } from "~/store/settingsStore";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "~/components/ui/hover-card";
import { Button } from "~/components/ui/button";
import { Progress as ProgressBar } from "~/components/ui/progress";

const SOUNDCLOUD_URL =
  "https://soundcloud.com/coffeeshopjazzrelax/sets/chill-coffee-jazz?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing&show_artwork=false&show_playcount=false&buying=false&autoplay=true";

export default function SoundCloudPlayer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const widgetRef = useRef<Widget | null>(null);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [open, setOpen] = useState(true);

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

  // Sincroniza volume/mute do store com o widget
  const volumeMusic = useSettingsStore((s) => s.volumeMusic);
  const muteMusic = useSettingsStore((s) => s.muteMusic);

  useEffect(() => {
    if (!widgetRef.current) return;
    const vol = muteMusic ? 0 : Math.round(volumeMusic * 100);
    widgetRef.current.setVolume(vol);
  }, [volumeMusic, muteMusic]);

  // Setup SC.Widget when SDK and iframe are ready

  useEffect(() => {
    if (!isSdkReady || !iframeRef.current) return;

    const widget = window.SC.Widget(iframeRef.current);
    widgetRef.current = widget;

    widget.bind("ready", () => {
      widget.play(); // Garante autoplay sempre
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
    <>
      <iframe
        ref={iframeRef}
        id="sc-widget"
        width="1%"
        height="1"
        allow="autoplay"
        style={{ display: "none" }}
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(SOUNDCLOUD_URL)}`}
      ></iframe>
      {open && (
        <div>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div
                style={{
                  position: "fixed",
                  right: 32,
                  bottom: 32,
                  zIndex: 41,
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: 999,
                  boxShadow: "0 2px 12px #0002",
                  padding: "6px 14px 6px 8px",
                  minWidth: 0,
                  maxWidth: 220,
                  gap: 8,
                  cursor: "pointer",
                  transition: "box-shadow 0.2s",
                }}
                tabIndex={0}
                aria-label="Abrir player de música"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  style={{ minWidth: 32, minHeight: 32, borderRadius: 999 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause();
                  }}
                  aria-label={isPaused ? "Tocar" : "Pausar"}
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </Button>
                <div style={{ flex: 1, minWidth: 40, maxWidth: 90 }}>
                  <ProgressBar
                    value={duration ? (position / duration) * 100 : 0}
                    className="h-1 bg-gray-200"
                    style={{ borderRadius: 4 }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: "#666",
                    minWidth: 32,
                    textAlign: "right",
                  }}
                >
                  {formatTime(position)}
                </span>
                <span
                  style={{
                    fontSize: 16,
                    color: "#aaa",
                    marginLeft: 4,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  aria-label="Informações"
                >
                  <Info size={18} />
                </span>{" "}
              </div>
            </HoverCardTrigger>
            <HoverCardContent align="end" sideOffset={12} className="p-4 w-72">
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "none",
                    border: "none",
                    fontSize: 20,
                    color: "#888",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  aria-label="Fechar player"
                >
                  ×
                </button>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 8,
                    textAlign: "center",
                    color: "#222",
                  }}
                >
                  {title || "Desconhecida"}
                </div>
                <Button
                  onClick={togglePlayPause}
                  style={{
                    margin: "10px 0 6px 0",
                    background: isPaused ? "#16a34a" : "#fbbf24",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 18px",
                    fontSize: 16,
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow: isPaused
                      ? "0 1px 4px #16a34a22"
                      : "0 1px 4px #fbbf2422",
                    transition: "background 0.2s",
                    width: "100%",
                  }}
                >
                  {isPaused ? (
                    <>
                      <Play size={20} style={{ marginRight: 6 }} />
                      Play
                    </>
                  ) : (
                    <>
                      <Pause size={20} style={{ marginRight: 6 }} />
                      Pause
                    </>
                  )}
                </Button>
                <div
                  style={{
                    fontSize: 13,
                    color: "#555",
                    marginTop: 2,
                    textAlign: "center",
                  }}
                >
                  {formatTime(position)} / {formatTime(duration)}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </>
  );
}

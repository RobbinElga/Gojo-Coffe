"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const playAudio = async () => {
            try {
                await audioRef.current?.play();
                setPlaying(true);
            } catch {
                console.log("Autoplay diblokir browser");
            }
        };

        playAudio();

        const handleFirstInteraction = () => {
            playAudio();
            window.removeEventListener("click", handleFirstInteraction);
        };

        window.addEventListener("click", handleFirstInteraction);

        return () => {
            window.removeEventListener("click", handleFirstInteraction);
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play();
            setPlaying(true);
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                preload="auto"
                src="/music/suara.mp3"
            />

            <button
                onClick={toggleAudio}
                className="fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-[#1c1e54] text-white shadow-xl"
            >
                {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </>
    );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Dropzone from "./dropzone";
import Style from "./style";
import { removeBackground } from "@imgly/background-removal";

const ThumbnailCreator = () => {
  const [selectedStyle, setSelectedStyle] = useState("style1");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null,
  );
  const [canvasReady, setCanvasReady] = useState(false);

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);
        const blob = await removeBackground(src);
        const processedUrl = URL.createObjectURL(blob);
        setProcessedImageSrc(processedUrl);
        setCanvasReady(true);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (canvasReady) {
      drawCompositeImage();
    }
  }, [canvasReady]);

  const drawCompositeImage = () => {
    if (!canvasRef.current || !canvasReady || !imageSrc) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
  };

  return (
    <>
      {imageSrc ? (
        <>
          {loading ? (
            <>
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-dashed border-gray-800"></div>
              </div>
            </>
          ) : (
            <canvas
              ref={canvasRef}
              className="max-h-lg h-auto w-full max-w-lg rounded-lg"
            ></canvas>
          )}
        </>
      ) : (
        <div className="mt-10 flex flex-col">
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
            Hi there
          </h1>
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance lg:text-5xl">
            Want to create a thumbnail?
          </h1>
          <p className="text-muted-foreground mt-2 text-center text-sm">
            Use one of the templates below
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start">
            <Style
              image="styletest.png"
              selectStyle={() => setSelectedStyle("style1")}
              isSelected={selectedStyle === "style1"}
            />
            <Style
              image="styletest.png"
              selectStyle={() => setSelectedStyle("style2")}
              isSelected={selectedStyle === "style2"}
            />
            <Style
              image="styletest.png"
              selectStyle={() => setSelectedStyle("style3")}
              isSelected={selectedStyle === "style3"}
            />
          </div>
          <Dropzone setSelectedImage={setSelectedImage} />
        </div>
      )}
    </>
  );
};

export default ThumbnailCreator;

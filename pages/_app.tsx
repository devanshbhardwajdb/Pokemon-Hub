import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showImage, setShowImage] = useState<Boolean>(true);

  useEffect(() => {
    // Hide the image after 3 seconds (3000 milliseconds)
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 2000); // Adjust timing as needed

    // Clear timeout when component unmounts or showImage changes
    return () => clearTimeout(timeout);
  }, []); // Run only once on component mount

  return showImage ? (
    <div className='flex items-center justify-center h-[100vh] w-full bg_main'>
      <img
        src="/pokeball.png"
        alt="Pokemon Hub"
        className="w-80 h-80 opacity-100 animate-pulse duration-300"
      // Set showImage to false when the image is loaded
      />
    </div>
  ) : (
    <Component {...pageProps} />
  );
}

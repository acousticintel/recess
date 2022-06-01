import Image from "next/image";
import { useState } from "react";

export default function ImageLoader({src, alt, width, height}) {
  const [loaded, setLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setLoaded(true)
  };
  
  return (
    <div className={`image__loader ${loaded && "loaded"}`}>
      <div className="overlay relative" />
      {!width && !height && (
        <Image
          src={src}
          layout="fill"
          alt={alt}
          className="z-0"
          onLoadingComplete={(e) => handleImageLoad(e)}
        />
      )}
      {width && height && (
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className="z-0"
          onLoadingComplete={(e) => handleImageLoad(e)}
        />
      )}
    </div>
  );
}

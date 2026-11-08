import React from "react";
import ThemeContext from "../../../contexts/ThemeContext";

// import FourDots from './FourDots';
import TripleDots from "./TripleDots";
import patternLight from "../../../assets/images/pattern-light.svg";
import patternDark from "../../../assets/images/pattern-dark.svg";
import Card3D from "../../Common/Card3D";

const CodecSupport = () => {
  const { isDarkMode } = React.useContext(ThemeContext);

  return (
    <Card3D className="mx-auto w-[95%] max-w-[120rem]" depth={10}>
      <div
        className="grid h-[22.5rem] w-full grid-rows-3 gap-12 overflow-hidden rounded-3xl py-4 shadow-2xl shadow-inset-light dark:shadow-inset-dark md:grid-cols-3 md:grid-rows-none md:px-8 border border-white/20 dark:border-white/5 backdrop-blur-sm transition-all"
        style={{
          backgroundImage: `url("${isDarkMode ? patternDark : patternLight}")`,
        }}
      >
        <div className="flac-group flex items-center justify-center md:flex-col transition-transform hover:scale-105 duration-300">
          <span className="text-4xl font-medium drop-shadow-xl hover:text-font-color-2 transition-colors">MP3</span>
          <TripleDots />
          <span className="text-6xl font-semibold drop-shadow-2xl md:text-8xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">
            FLAC
          </span>
          <TripleDots />
          <span className="text-4xl font-medium drop-shadow-xl hover:text-font-color-2 transition-colors">M4R</span>
        </div>
        <div className="saying-group flex flex-col items-center justify-center text-center">
          {/* <FourDots /> */}
          <p className="mt-4 rounded-full bg-foreground-color px-8 py-4 text-3xl font-medium shadow-lg dark:bg-foreground-color dark:text-font-color md:px-12 md:py-6 md:text-4xl hover:-translate-y-1 transition-transform">
            Supports
          </p>
          <p className="mt-2 px-2 dark:text-font-white">
            Support for lossless audio through FLAC and WAV.
          </p>
        </div>
        <div className="wav-group flex items-center justify-center md:flex-col transition-transform hover:scale-105 duration-300">
          <span className="text-4xl font-medium drop-shadow-xl hover:text-font-color-2 transition-colors">AAC</span>
          <TripleDots />
          <span className="text-6xl font-semibold drop-shadow-2xl md:text-8xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
            WAV
          </span>
          <TripleDots />
          <span className="text-4xl font-medium drop-shadow-xl hover:text-font-color-2 transition-colors">OGG</span>
        </div>
      </div>
    </Card3D>
  );
};

export default CodecSupport;

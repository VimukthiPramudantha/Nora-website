import React from "react";

import AppInterfaceLeftImg from "../../../assets/images/app-interface-left.webp";
import AppInterfaceCenterImg from "../../../assets/images/app-interface-center.webp";
import AppInterfaceRightImg from "../../../assets/images/app-interface-right.webp";
import useOnScreen from "../../../hooks/useOnScreen";
import Card3D from "../../Common/Card3D";

const AppInterface = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(containerRef, { threshold: [0.5] });

  return (
    <Card3D className="mx-auto w-[95%] max-w-[120rem]" depth={12}>
      <div
        className="grid h-[15rem] w-full grid-rows-[1fr_clamp(4rem,60%,12rem)] rounded-3xl bg-foreground-color shadow-[0px_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0px_20px_50px_rgba(0,0,0,0.4)] dark:bg-dark-foreground-color sm:h-[18rem] md:grid-rows-[1fr_clamp(10rem,70%,16rem)] lg:h-[25rem] border border-white/30 dark:border-white/5"
        ref={containerRef}
      >
        <div className="flex items-center justify-center">
          <p className="saying text-center text-4xl font-medium [text-wrap:balance] lg:text-5xl drop-shadow-md">
            With an inspiring user interface
          </p>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden [perspective:1200px]">
          <img
            src={AppInterfaceLeftImg}
            className={`absolute top-0 -translate-x-4 translate-y-6 scale-[0.75] rounded-xl shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)] transition-all duration-500 sm:-translate-y-4 lg:-translate-x-20 ${
              isVisible &&
              "!-translate-x-8 md:!-translate-x-20 lg:!-translate-x-28 -rotate-6"
            }`}
            alt="App interface left image"
          />
          <img
            src={AppInterfaceCenterImg}
            className={`absolute top-0 z-10 translate-y-2 scale-[0.75] rounded-xl shadow-[0px_25px_45px_0px_rgba(0,0,0,0.35)] transition-all duration-500 sm:-translate-y-4 ${
              isVisible &&
              "!-translate-y-2 sm:!-translate-y-8 md:!-translate-y-12 lg:!-translate-y-16 scale-[0.85] lg:scale-[0.9]"
            }`}
            alt="App interface center image"
          />
          <img
            src={AppInterfaceRightImg}
            className={`absolute top-0 translate-x-4 translate-y-8 scale-[0.75] rounded-xl shadow-[0px_10px_30px_0px_rgba(0,0,0,0.25)] transition-all duration-500 sm:!translate-y-0 lg:translate-x-20 ${
              isVisible && "!translate-x-8 md:!translate-x-20 lg:!translate-x-28 rotate-6"
            }`}
            alt="App interface right image"
          />
        </div>
      </div>
    </Card3D>
  );
};

export default AppInterface;

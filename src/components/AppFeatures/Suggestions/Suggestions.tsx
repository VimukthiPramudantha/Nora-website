import React from "react";

import SuggestionsDarkImg from "../../../assets/images/suggestions-dark.webp";
import SuggestionsLightImg from "../../../assets/images/suggestions-light.webp";
import useOnScreen from "../../../hooks/useOnScreen";
import Card3D from "../../Common/Card3D";

const Suggestions = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(containerRef, { threshold: [0.8] });

  return (
    <Card3D depth={10}>
      <div
        className="relative grid h-[28rem] grid-rows-[50%_1fr] items-center overflow-x-hidden rounded-3xl lg:grid-cols-2 lg:grid-rows-none lg:gap-20 lg:overflow-x-visible 2xl:h-[35rem]"
        ref={containerRef}
      >
        <div
          className={`absolute bottom-0 left-1/2 z-10 h-[16rem] w-[95%] -translate-x-1/2 rounded-3xl bg-foreground-color shadow-lg transition-transform dark:bg-dark-foreground-color lg:bottom-auto lg:left-auto lg:top-1/2 lg:h-[22rem] lg:-translate-x-12 lg:-translate-y-1/2 lg:rounded-none lg:!rounded-br-3xl lg:!rounded-tr-3xl ${
            isVisible && "lg:!translate-x-0"
          }`}
        >
        </div>

        <div className="relative order-1 h-full w-full lg:z-20">
          <img
            className={`absolute hidden rounded-xl shadow-[0px_20px_40px_0px_rgba(0,0,0,0.3)] transition-transform duration-500 lg:block lg:-translate-x-8 lg:translate-y-4 ${
              isVisible && `lg:!translate-x-0 -rotate-2`
            }`}
            src={SuggestionsLightImg}
            alt="Switch themes light image"
          />
          <img
            className={`absolute translate-y-4 scale-[0.85] rounded-xl shadow-[0px_25px_50px_0px_rgba(0,0,0,0.35)] transition-transform duration-500 lg:-translate-x-4 lg:scale-[1.075] ${
              isVisible && `lg:!translate-x-4 lg:!translate-y-20 rotate-2`
            }`}
            src={SuggestionsDarkImg}
            alt="Switch themes dark image"
          />
        </div>

        <div
          className={`saying z-10 order-2 mb-8 text-center font-medium transition-transform lg:mb-0 lg:text-left ${
            isVisible && "lg:translate-x-8"
          }`}
        >
          <p className="mb-4 text-4xl leading-tight lg:text-5xl">
            Suggestions <br /> to edit your <br /> library
          </p>
          <p className="dark:text-font-white">
            Suggestions help you automate tedious <br /> tasks when editing tags.
          </p>
        </div>
      </div>
    </Card3D>
  );
};

export default Suggestions;

import React from "react";
import { Changelog } from "./@types/app";
import "./index.css";
import { appInfo } from "../package.json";

import ReleaseNotesContext from "./contexts/ReleaseNotesContext";
import ThemeContext from "./contexts/ThemeContext";

import Header from "./components/Header/Header";
import IntroductionBanner from "./components/IntroductionBanner/IntroductionBanner";
import DownloadPrompt from "./components/DownloadPrompt/DownloadPrompt";
import SwitchThemes from "./components/AppFeatures/SwitchThemes/SwitchThemes";
import CodecSupport from "./components/AppFeatures/CodecSupport/CodecSupport";
import EditMetadata from "./components/AppFeatures/EditMetadata/EditMetadata";
import LyricsSupport from "./components/AppFeatures/LyricsSupport/LyricsSupport";
import Suggestions from "./components/AppFeatures/Suggestions/Suggestions";
import AppInterface from "./components/AppFeatures/AppInterface/AppInterface";
import Feedback from "./components/Feedback/Feedback";
import Footer from "./components/Footer/Footer";
import Section3D from "./components/Common/Section3D";

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [releaseNotes, setReleaseNotes] = React.useState<Changelog>();

  const updateTheme = React.useCallback((theme?: "dark" | "light") => {
    setIsDarkMode((prevState) => {
      let darkMode = !prevState;

      if (theme) {
        darkMode = theme === "dark";
      }
      localStorage.theme = darkMode ? "dark" : "light";
      return darkMode;
    });
  }, []);

  React.useEffect(() => {
    const doesUserPreferDarkMode = localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (doesUserPreferDarkMode) updateTheme("dark");
    else updateTheme("light");
  }, [updateTheme]);

  React.useEffect(() => {
    fetch(appInfo.release_notes_url)
      .then((res) => {
        if (res.ok) return res.json();
        throw Error(res.statusText);
      })
      .then((res) => setReleaseNotes(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className={`app overflow-x-hidden ${
        isDarkMode
          ? "dark bg-dark-background-color text-dark-font-color"
          : "bg-background-color text-font-color"
      }`}
    >
      <ThemeContext.Provider value={{ isDarkMode, updateTheme }}>
        <Header />
        <IntroductionBanner />

        {/* Ambient background decoration shapes across the website sections */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30 dark:opacity-20">
          <div className="absolute top-[25%] -left-32 w-96 h-96 rounded-full bg-blue-500/30 blur-[130px]" />
          <div className="absolute top-[45%] -right-32 w-[30rem] h-[30rem] rounded-full bg-cyan-400/25 blur-[150px]" />
          <div className="absolute top-[70%] left-10 w-96 h-96 rounded-full bg-indigo-500/25 blur-[140px]" />
        </div>

        <div className="features relative z-10 mx-auto grid max-w-[100rem] grid-flow-row gap-6 md:gap-8 lg:overflow-visible px-4 sm:px-6">
          <Section3D direction="up">
            <ReleaseNotesContext.Provider value={releaseNotes}>
              <DownloadPrompt />
            </ReleaseNotesContext.Provider>
          </Section3D>

          <Section3D direction="right">
            <SwitchThemes />
          </Section3D>

          <Section3D direction="up">
            <CodecSupport />
          </Section3D>

          <Section3D direction="left">
            <EditMetadata />
          </Section3D>

          <Section3D direction="up">
            <LyricsSupport />
          </Section3D>

          <Section3D direction="right">
            <Suggestions />
          </Section3D>

          <Section3D direction="up">
            <AppInterface />
          </Section3D>
        </div>

        <Section3D direction="up">
          <Feedback />
        </Section3D>
        <Footer />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;

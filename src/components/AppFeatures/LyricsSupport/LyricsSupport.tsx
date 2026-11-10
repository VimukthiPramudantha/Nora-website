import React from 'react';
import useOnScreen from '../../../hooks/useOnScreen';
import LyricsLine from './LyricsLine';
import Card3D from '../../Common/Card3D';

const lyricsLines = [
	'Can’t blame her, can’t tame her',
	'And can’t tie her down',
	'When the night comes around',
	'said she gonna party all night \n (all night)',
	'And you can’t change her',
	// 'Can’t blame her, can’t tame her',
	// 'When the night comes around',
];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const LyricsSupport = () => {
	const [isAnimationWorking, setIsAnimationWorking] = React.useState(!prefersReducedMotion);
	const [index, setIndex] = React.useState(2);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const isVisible = useOnScreen(containerRef);

	React.useEffect(() => {
		let intervalId: NodeJS.Timeout | undefined;

		if (isAnimationWorking) {
			if (isVisible) {
				intervalId = setInterval(() => {
					setIndex((prevIndex) => {
						if (prevIndex + 1 >= lyricsLines.length) return 0;
						return prevIndex + 1;
					});
				}, 1000);
			}
		} else {
			if (typeof intervalId === 'number') clearInterval(intervalId);
			setIndex(2);
		}

		return () => {
			if (typeof intervalId === 'number') clearInterval(intervalId);
		};
	}, [isAnimationWorking, isVisible]);

	const lyricsLineComponents = React.useMemo(() => {
		return lyricsLines.map((line, i) => <LyricsLine key={i} index={i} line={line} isActive={index !== i} />);
	}, [index]);

	return (
		<Card3D depth={8} className="mx-auto w-[90%] max-w-[120rem]">
			<div
				className="grid h-[35rem] w-full grid-rows-2 items-center md:grid-cols-[1fr_40%] md:grid-rows-none"
				ref={containerRef}>
				<div className="lyrics-container flex h-[85%] flex-col items-center justify-center overflow-hidden rounded-3xl border-[6px] border-dashed border-foreground-color p-2 text-center text-2xl font-medium leading-tight text-black dark:border-dark-foreground-color dark:text-white md:translate-x-4 md:!border-r-0 md:py-[4rem] md:pl-8 md:pr-12 md:text-4xl shadow-inner">
					{lyricsLineComponents}
				</div>
				<div className="saying-container flex h-full -translate-y-8 flex-col items-center justify-center rounded-3xl bg-foreground-color px-4 py-2 shadow-2xl dark:bg-dark-foreground-color md:-translate-x-2 md:translate-y-0 md:items-start md:p-8 md:pl-12 border border-white/20 dark:border-white/5">
					<p className="mb-2 text-center text-4xl font-medium leading-tight md:mb-4 md:text-left lg:text-5xl">
						Supports Online and Enhanced Synced Lyrics<sup>3</sup>
					</p>
					<p className="text-center dark:text-font-white md:text-left">
						Sing along with your favorite tunes <br /> without hassle.
					</p>

					<button
						className="mt-4 flex w-fit items-center text-sm p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
						title={`${isAnimationWorking ? 'Stop' : 'Start'} Animation`}
						onClick={() => setIsAnimationWorking((prevState) => !prevState)}>
						<span className="material-symbols-rounded">
							{isAnimationWorking ? 'motion_photos_paused' : 'slow_motion_video'}
						</span>
					</button>
				</div>
			</div>
		</Card3D>
	);
};

export default LyricsSupport;

export const durationToMMSS = (duration) => {
    let rounded = Math.round(duration);
    const mm = Math.floor(rounded / 60);
    const ss = rounded % 60;
    return `${mm}:${ss.toString().padStart(2, '0')}`;
}
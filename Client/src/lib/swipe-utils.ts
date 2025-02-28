export const SWIPE_THRESHOLD = 100;

export function getSwipeDirection(offset: number): "left" | "right" | null {
    if (Math.abs(offset) < SWIPE_THRESHOLD) return null;
    return offset > 0 ? "right" : "left";
}

import { motion, useSpring, MotionValue } from "framer-motion";

export function ProgressBar({ value }: { value: MotionValue<number> }) {
  const width = useSpring(value, { damping: 20 });
  return (
    <motion.div className="flex h-4 w-full flex-row items-start justify-start rounded-full overflow-hidden">
      <motion.div
        className="h-full w-full bg-green-500"
        style={{ scaleX: width, originX: 0 }}
        transition={{ ease: "easeIn" }}
      />
    </motion.div>
  );
}

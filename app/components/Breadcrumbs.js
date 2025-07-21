"use client";

import { motion } from "motion/react";
import { useState } from "react";

const CHARS = "AIRMAXNIKEEVOLVED123456789!@#$%^&*()_+[]{}|;:',.<>?/~`";

export default ({ title, index }) => {

  // Scrable text effect
  const TARGET_TEXT = `${title}`;
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;
    const interval = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length) {
        clearInterval(interval);
        setText(TARGET_TEXT);
      }
    }, 100);
  };

  return (
    <div className="col-span-12 flex items-center pt-4 md:px-[30px] px-[15px] pb-20 max-w-[var(--breakpoint-xl)] mx-auto" >

      {/* Square before text */}
      <motion.span
        className="w-1 h-1 bg-current -ml-[15px] mr-2"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      ></motion.span>

      <motion.p
        className="text-gray uppercase"
        onViewportEnter={scramble}
      >
        {index} / {text}
      </motion.p>
    </div>
  );
}
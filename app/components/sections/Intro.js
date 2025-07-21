import SplitType from 'split-type'
import { motion, useInView, animate, stagger } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import Breadcrumbs from "../Breadcrumbs"


const CUSTOM_EASE = [0.25, 0.4, 0.25, 1];

const animationProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 }
};


const headingAnimation = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: CUSTOM_EASE
    }
  }
};


const textAnimation = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: .5,
      ease: CUSTOM_EASE
    }
  }
};

const imageAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: CUSTOM_EASE
    }
  }
};




export default function Intro() {

  // Register appropriate Headline refs to handle the SplitText animation
  const headlineRef = useRef(null);
  const isHeadlineInView = useInView(headlineRef, {
    once: true,
    amount: 0.4
  });

  // SplitText animation effect 
  useEffect(() => {
    if (!isHeadlineInView || !headlineRef.current) return;

    const animateWords = async () => {

      // Ensure fonts are loaded before animating
      await document.fonts.ready;

      const headline = headlineRef.current.querySelector('h2');
      if (!headline) return;

      const { words } = new SplitType(headline, {
        types: 'words',
        tagName: 'span',
        wordClass: 'split-word'
      });

      animate(
        words,
        {
          opacity: [0, 1],
          y: [20, 0],
          filter: ["blur(5px)", "blur(0px)"]
        },
        {
          duration: 1.4,
          delay: stagger(0.03),
          ease: CUSTOM_EASE
        }
      );
    };

    animateWords();
  }, [isHeadlineInView]);


  return (
    <section id="intro">
      <Breadcrumbs index="01" title="Intro" />

      <div className="layout-grid max-w-[var(--breakpoint-lg)] mx-auto gap-y-12">

        {/* Headline */}
        <motion.div
          ref={headlineRef}
          className="col-span-12 md:col-span-6"
          variants={headingAnimation}
          {...animationProps}
        >
          <h2 className="machina-headline-64 md:machina-headline-96 ">
            Inizia una nuova era di <em className="italic saol-headline-56">Air Max</em>,<br />
            dove lo stile è sempre in <em className="italic saol-headline-56">continua evoluzione</em>.
          </h2>
        </motion.div>

        {/* Image */}
        <motion.div
          className="col-span-12 md:col-span-6 md:max-h-[35rem]"
          variants={imageAnimation}
          {...animationProps}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src="/images/section1.png"
            alt="Hero Image"
            width={600}
            height={600}
            className="w-full h-auto object-contain md:max-w-lg xsm:max-w-md md:translate-y-[70%] mx-auto"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          className="col-span-12 md:col-span-4 space-y-2"
          variants={textAnimation}
          {...animationProps}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="machina-body-16 max-w-xl">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
            <strong> doloremque laudantium</strong>, totam rem aperiam, eaque ipsa quae ab illo
            inventore veritatis et <strong>quasi architecto beatae</strong> vitae dicta sunt explicabo.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
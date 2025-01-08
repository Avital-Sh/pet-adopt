import { useSpringRef, useSpring, useChain, SpringRef } from "react-spring";

const animationConfig = (animationRef: SpringRef, isLast: boolean = false) => ({
  ref: animationRef,
  from: {
    opacity: 0,
  },
  to: { opacity: 1 },
  config: {
    duration: 1000,
  },
});

const useAnimationSequence = () => {
  const firstRef = useSpringRef();
  const secondRef = useSpringRef();
  const thirdRef = useSpringRef();
  const forthRef = useSpringRef();
  const fifthRef = useSpringRef();

  const firstProps = useSpring(animationConfig(firstRef));
  const secondProps = useSpring(animationConfig(secondRef));
  const thirdProps = useSpring(animationConfig(thirdRef));
  const forthProps = useSpring(animationConfig(forthRef));
  const [fifthProps] = useSpring(
    () => ({
      ref: fifthRef,
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      onRest: {
        opacity: () => {
          document.querySelectorAll(".hidden-button").forEach((button) => {
            if (button instanceof HTMLElement) {
              button.style.pointerEvents = "auto";
            }
          });
        },
      },
    }),
    []
  );

  useChain(
    [firstRef, secondRef, thirdRef, forthRef, fifthRef],
    [0, 1, 2, 3, 4] // Chain animations with delays
  );

  return [firstProps, secondProps, thirdProps, forthProps, fifthProps];
};

export default useAnimationSequence;

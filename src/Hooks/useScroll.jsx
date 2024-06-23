import { useState, useRef, useEffect } from "react";

const useScroll = (messagesCount) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const scrollBottom = () => {
    requestAnimationFrame(() => {
      scrollPositionRef.current = messagesRef.current.scrollHeight;
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShowScrollButton(false);
    });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      let scrollPos = scrollPositionRef.current + e.deltaY;

      if (scrollPos > messagesRef.current.scrollHeight)
        scrollPositionRef.current = messagesRef.current.scrollHeight;
      else if (scrollPos < messagesRef.current.offsetHeight)
        scrollPositionRef.current = messagesRef.current.offsetHeight;
      else scrollPositionRef.current = scrollPos;

      console.log(messagesRef.current.scrollTop);

      if (messagesRef.current.scrollHeight > messagesRef.current.offsetHeight) {
        if (e.deltaY < 0) setShowScrollButton(true);
        else if (
          e.deltaY > 0 &&
          scrollPositionRef.current >= messagesRef.current.scrollHeight
        )
          setShowScrollButton(false);
      }
    };

    const messagesElement = messagesRef.current;

    if (messagesElement) {
      messagesElement.addEventListener("wheel", handleWheel);
      return () => messagesElement.removeEventListener("wheel", handleWheel);
    }
  }, []);

  useEffect(() => {
    if (
      !showScrollButton &&
      messagesRef.current.scrollHeight > messagesRef.current.offsetHeight
    )
      scrollBottom();
  }, [messagesCount]);

  return { messagesRef, showScrollButton, scrollBottom };
};

export default useScroll;

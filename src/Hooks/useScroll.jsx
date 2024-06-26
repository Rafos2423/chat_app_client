import { useState, useRef, useEffect } from "react";

const useScroll = (messagesCount) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesRef = useRef(null);

  const scrollBottom = () => {
    requestAnimationFrame(() => {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShowScrollButton(false);
    });
  };

  useEffect(() => {
    const messagesElement = messagesRef.current;
    const handleScroll = () => setShowScrollButton(messagesElement.scrollTop + messagesElement.clientHeight < messagesElement.scrollHeight - 30);

    messagesElement.addEventListener("scroll", handleScroll);
    return () => messagesElement.removeEventListener("scroll", handleScroll);
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

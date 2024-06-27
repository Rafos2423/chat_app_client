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
    });
  };

  useEffect(() => {
    const messagesElement = messagesRef.current;
    const handleScroll = () =>
      setShowScrollButton(
        messagesElement.scrollTop + messagesElement.clientHeight <
          messagesElement.scrollHeight - 30
      );

    messagesElement.addEventListener("scroll", handleScroll);
    return () => messagesElement.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const messagesElement = messagesRef.current;
    if (
      messagesElement.scrollTop + messagesElement.clientHeight <
      messagesElement.scrollHeight - 30
    )
      messagesElement.scrollTo({
        top: messagesElement.scrollHeight,
      });
  }, [messagesCount]);

  return { messagesRef, showScrollButton, scrollBottom };
};

export default useScroll;

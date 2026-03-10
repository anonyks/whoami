import { useState, useEffect, useCallback } from 'react';

interface TypedLine {
  text: string;
  isCommand?: boolean;
  delay?: number;
}

export function useTypingEffect(lines: TypedLine[], startDelay = 0) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started || currentLineIndex >= lines.length) {
      if (currentLineIndex >= lines.length && started) setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    const speed = currentLine.isCommand ? 50 : 15;
    const lineDelay = currentLine.delay || 0;

    if (currentCharIndex === 0 && lineDelay > 0) {
      const timer = setTimeout(() => setCurrentCharIndex(1), lineDelay);
      return () => clearTimeout(timer);
    }

    const actualCharIndex = lineDelay > 0 ? currentCharIndex - 1 : currentCharIndex;

    if (actualCharIndex <= currentLine.text.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine.text.slice(0, actualCharIndex);
          return newLines;
        });

        if (actualCharIndex === currentLine.text.length) {
          setTimeout(() => {
            setCurrentLineIndex(i => i + 1);
            setCurrentCharIndex(0);
          }, 100);
        } else {
          setCurrentCharIndex(c => c + 1);
        }
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [started, currentLineIndex, currentCharIndex, lines]);

  return { displayedLines, isComplete, currentLineIndex };
}

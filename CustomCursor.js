import React, { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setCursorPos({ x: clientX, y: clientY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleElementEnter = () => {
      setIsHovered(true);
    };

    const handleElementLeave = () => {
      setIsHovered(false);
    };

    const elements = document.querySelectorAll('button, a');

    elements.forEach((element) => {
      element.addEventListener('mouseenter', handleElementEnter);
      element.addEventListener('mouseleave', handleElementLeave);
      element.style.cursor = 'none';
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mouseenter', handleElementEnter);
        element.removeEventListener('mouseleave', handleElementLeave);
        element.style.cursor = 'auto';
      });
    };
  }, []);

  const cursorSize = isHovered ? 60 : 40;
  const cursorStyle = {
    position: 'fixed',
    top: cursorPos.y - cursorSize / 2,
    left: cursorPos.x - cursorSize / 2,
    width: cursorSize,
    height: cursorSize,
    borderRadius: '50%',
    border: '2px solid #63cccb',
    backgroundImage: `radial-gradient(circle, #63cccb 20%, transparent 80%)`,
    pointerEvents: 'none',
    zIndex: 9999,
    transition: 'width 0.2s ease, height 0.2s ease',
    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
  };

  const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div
      style={cursorStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={dotStyle}></div>
    </div>
  );
};

export default CustomCursor;

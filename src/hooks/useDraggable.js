import { useState, useCallback, useEffect, useRef } from 'react';

export function useDraggable({
  initialPosition = { x: 0, y: 0 },
  bounds = 'viewport',
  onDragStart,
  onDragEnd,
  disabled = false,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const clampPosition = useCallback(
    (x, y) => {
      if (bounds === 'viewport') {
        const maxX = window.innerWidth - 100; // Keep at least 100px visible
        const maxY = window.innerHeight - 50; // Keep titlebar visible
        return {
          x: Math.max(0, Math.min(x, maxX)),
          y: Math.max(0, Math.min(y, maxY)),
        };
      }
      return { x, y };
    },
    [bounds]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || disabled) return;

      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;
      const clamped = clampPosition(newX, newY);
      setPosition(clamped);
    },
    [isDragging, disabled, clampPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  const handleMouseDown = useCallback(
    (e) => {
      if (disabled) return;

      // Prevent dragging if clicking on buttons
      if (e.target.closest('button')) return;

      e.preventDefault();
      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
      onDragStart?.();
    },
    [disabled, position, onDragStart]
  );

  // Touch support
  const handleTouchStart = useCallback(
    (e) => {
      if (disabled) return;
      if (e.target.closest('button')) return;

      const touch = e.touches[0];
      setIsDragging(true);
      dragOffset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      };
      onDragStart?.();
    },
    [disabled, position, onDragStart]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging || disabled) return;

      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.current.x;
      const newY = touch.clientY - dragOffset.current.y;
      const clamped = clampPosition(newX, newY);
      setPosition(clamped);
    },
    [isDragging, disabled, clampPosition]
  );

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd?.(position);
    }
  }, [isDragging, position, onDragEnd]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Update position when initialPosition changes (for external control)
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  return {
    position,
    setPosition,
    isDragging,
    handlers: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
    },
    ref: elementRef,
  };
}

export default useDraggable;

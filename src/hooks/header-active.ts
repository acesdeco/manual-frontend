import { useState, useCallback } from "react";

export const useHeaderActive = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => !prevState);
  }, []);

  return {
    menuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};

"use client";

import * as React from "react";

// Theme toggle functionality has been disabled to enforce default light theme
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import { useTheme } from "next-themes";

import { useHasMounted } from "@/lib/utils";
import { Button } from "./ui/button";

export default function SettingsThemeToggle() {
  const hasMounted = useHasMounted();
  // The theme setting functionality is commented out to hide the theme selection
  // const { setTheme, theme } = useTheme();

  if (!hasMounted) {
    return null;
  }

  // The button for toggling the theme is removed to keep the default theme as light
  // const nextTheme = theme === "light" ? "dark" : "light";

  // Return null to render nothing for the theme toggle component
  return null;

  // The following code has been commented out as part of hiding the theme selection
  /*
  return (
    <Button
      className="justify-start gap-2 w-full"
      size="sm"
      variant="ghost"
      onClick={() => setTheme(nextTheme)}
    >
      {nextTheme === "light" ? (
        <SunIcon className="w-4 h-4" />
        ) : (
        <MoonIcon className="w-4 h-4" />
      )}
      <p>{nextTheme === "light" ? "Light mode" : "Dark mode"}</p>
    </Button>
  );
  */
}

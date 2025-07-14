import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown Trigger */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      <ul
        tabIndex={0}
        className="dropdown-content mt-2 p-2 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10 max-h-80 overflow-y-auto space-y-1 z-50"
      >
        {THEMES.map((themeOption) => (
          <li key={themeOption.name}>
            <button
              className={`
                w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
                ${
                  theme === themeOption.name
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-base-content/5"
                }
              `}
              onClick={() => setTheme(themeOption.name)}
            >
              <PaletteIcon className="size-4" />
              <span className="text-sm">{themeOption.label}</span>

              <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;

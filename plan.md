# Implementation Plan - Customise App Appearance in Settings

## Goals
Enable users to customize the application appearance under the "Settings" page. The changes should persist across sessions.

## Proposed Changes
1. **Settings Page (`src/pages/Settings.tsx`)**:
   - Add a new "Appearance" section.
   - Add options for **Theme** selection (e.g., Light, Dark, Sepia/Warm, Teal/Clinical).
   - Add options for **Font Size** (Small, Medium, Large) or **Sidebar Layout** style.
   - Read/write settings from/to local storage (`localStorage`).
   
2. **App Entry/Root Layout (`src/App.tsx` or `src/main.tsx`)**:
   - Apply the selected theme class (e.g., `dark`, `theme-sepia`, etc.) to the root container or document element.
   - Adjust typography sizes based on the selected font size setting.

3. **Global Styling / Tailwind / CSS (`src/index.css` if necessary)**:
   - Ensure color/font customization plays nicely with existing tailwind classes.

## Execution Steps
- **Step 1**: Frontend Engineer inspects `src/pages/Settings.tsx` and structures the customization options.
- **Step 2**: Apply changes to Settings and tie them to a state/hook that persists in localStorage.
- **Step 3**: Ensure root element reacts to changes.
- **Step 4**: Run build validation to guarantee zero TypeScript or build issues.

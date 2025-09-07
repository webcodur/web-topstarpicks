# MUI to Tailwind CSS & shadcn/ui Conversion Guide

This document outlines the systematic conversion from MUI components to Tailwind CSS and shadcn/ui components.

## Completed Conversions

### Pages Directory
- [x] `src/pages/About.jsx` - Converted to use shadcn Card, Button, and toast system

### View Directory - People
- [x] `src/view/people/AgeBoundaries.jsx` - Converted Input and Label components
- [x] `src/view/people/People.jsx` - Removed styled components, using Tailwind classes
- [x] `src/view/people/Title.jsx` - Converted Typography to semantic HTML with Tailwind
- [x] `src/view/people/dataControlPanel/modals/SearchModal.jsx` - Full Dialog conversion

### Main Layout (Already Partially Converted)
- [x] `src/components/mainLayout/MainLayout.jsx` - Using shadcn Sheet and Tailwind classes

### Style Files Removed
- [x] `src/view/people/People.styles.js` - Replaced with inline Tailwind classes

## Conversion Examples

### Before/After Example: Modal Component

**Before (MUI):**
```jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Box,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const SearchModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Search People
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box sx={{ p: 2 }}>
        <TextField fullWidth placeholder="Enter person name" />
      </Box>
    </Dialog>
  );
};
```

**After (shadcn/ui + Tailwind):**
```jsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '../../../components/ui';
import { Input } from '../../../components/ui';

const SearchModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search People</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Enter person name" />
        </div>
      </DialogContent>
    </Dialog>
  );
};
```

### Card Component Conversion

**Before (MUI + Styled):**
```jsx
import styled from '@emotion/styled';
import { Card, CardContent, Typography } from '@mui/material';

const StyledCard = styled(Card)\`
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-2px);
  }
\`;

const PersonCard = ({ person }) => (
  <StyledCard>
    <CardContent>
      <Typography variant="h6">{person.name}</Typography>
    </CardContent>
  </StyledCard>
);
```

**After (shadcn/ui + Tailwind):**
```jsx
import { Card, CardContent } from '../../../components/ui';

const PersonCard = ({ person }) => (
  <Card className="h-full rounded-2xl shadow-lg hover:-translate-y-1 transition-transform duration-200">
    <CardContent>
      <h3 className="text-lg font-semibold">{person.name}</h3>
    </CardContent>
  </Card>
);
```

## Conversion Patterns

### Common MUI → Tailwind/shadcn Conversions

| MUI Component | shadcn/ui Component | Tailwind Alternative |
|---------------|---------------------|---------------------|
| `Box` | `div` | `div` with classes |
| `Container` | `div` | `max-w-* mx-auto px-*` |
| `Typography` | Semantic HTML | `h1-h6`, `p`, `span` |
| `Paper`, `Card` | `Card` | `bg-white shadow-*` |
| `Button` | `Button` | `Button` component |
| `TextField` | `Input` | `Input` component |
| `Dialog` | `Dialog` | `Dialog` component |
| `Modal` | `Dialog` | `Dialog` component |
| `Drawer` | `Sheet` | `Sheet` component |
| `IconButton` | `Button` | `Button` variant="ghost" |
| `Divider` | `Separator` | `border-t` |
| `Grid` | `div` | CSS Grid/Flexbox |
| `Stack` | `div` | `space-y-*`, `space-x-*` |

### Icon Conversions
- `@mui/icons-material` → `lucide-react`
- Common icons: Close → X, Search → Search, Add → Plus, etc.

### Styling Patterns
- `sx` props → Tailwind classes
- `styled` components → Tailwind classes
- Breakpoint system: `xs`, `sm`, `md`, `lg`, `xl`

## Remaining Files to Convert

### High Priority (Core Components)
1. `src/components/mainLayout/MainLayout.jsx` - Main app layout
2. `src/components/mainLayout/appBar/AppBar.jsx` - Navigation
3. `src/components/mainLayout/drawer/Drawer.jsx` - Side navigation

### View Directory Files
#### People Components
- `src/view/people/peopleGrid/PeopleGrid.jsx`
- `src/view/people/peopleGrid/personCard/PersonCard.jsx`
- `src/view/people/scoreModal/ScoreModal.jsx`
- `src/view/people/dataControlPanel/DataControlPanel.jsx`
- All modal files in `dataControlPanel/modals/`

#### Other Views
- `src/view/home/` - All home page components
- `src/view/games/` - Game components
- `src/view/contents/` - Content components
- `src/view/admin/` - Admin panel
- `src/view/guide/` - Guide components

### Style Files to Remove
All `.styles.js` files using `@emotion/styled` should be removed and converted to Tailwind classes:
- `src/view/people/scoreModal/ScoreModalStyles.js`
- `src/view/home/styles/*.js`
- `src/view/games/styles.js`
- `src/components/mainLayout/MainLayoutStyles.js`
- And many others...

## Implementation Strategy

1. **Convert core layout components first** to prevent app breakage
2. **Remove style files** and update components that import them
3. **Convert modals and dialogs** to shadcn Dialog components
4. **Update icon imports** from MUI to lucide-react
5. **Handle complex components** like data tables and forms
6. **Test functionality** after each major conversion

## Breaking Changes to Watch For

1. **Dialog/Modal API changes**: `open` → `open`, `onClose` → `onOpenChange`
2. **Button variants**: MUI variants may not match shadcn exactly
3. **Form components**: TextField → Input + Label combinations
4. **Grid system**: MUI Grid → CSS Grid or Flexbox with Tailwind
5. **Theme colors**: MUI theme colors → Tailwind color system

## Post-Conversion Cleanup

1. Remove unused MUI dependencies from package.json
2. Remove theme.js if no longer needed
3. Update any remaining sx props or styled components
4. Ensure all imports point to correct components
5. Test all interactive elements and forms
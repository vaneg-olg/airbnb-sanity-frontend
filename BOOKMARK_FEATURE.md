# Bookmark Feature Documentation

## Overview

This implementation adds comprehensive bookmark functionality to the Airbnb clone application, allowing users to:

1. **Bookmark Properties** - Save properties they're interested in
2. **Organize Bookmarks** - Create and manage custom folders to organize bookmarks
3. **Edit Folders** - Rename folders to organize bookmarks by preference
4. **Move Bookmarks** - Move bookmarks between folders easily
5. **Persistent Storage** - All bookmarks and folders are saved in localStorage

## Architecture

### Core Components

#### 1. `hooks/useBookmarks.js` - Bookmark State Management
A custom React hook that manages all bookmark operations:

**Functions:**
- `addBookmark(property, folderId)` - Add a new bookmark to a specific folder
- `removeBookmark(bookmarkId)` - Remove a bookmark
- `moveBookmarkToFolder(bookmarkId, folderId)` - Move bookmark to another folder
- `isBookmarked(propertyId)` - Check if a property is bookmarked
- `getBookmarkForProperty(propertyId)` - Get bookmark details for a property
- `getBookmarksByFolder(folderId)` - Get all bookmarks in a folder
- `createFolder(name)` - Create a new folder
- `renameFolder(folderId, newName)` - Rename a folder
- `deleteFolder(folderId)` - Delete a folder (moves bookmarks to "All Bookmarks")
- `getFolder(folderId)` - Get folder details

**Storage:**
- `airbnb_bookmarks` - localStorage key for bookmarks data
- `airbnb_bookmark_folders` - localStorage key for folders data

**Default Folder:**
- "All Bookmarks" - A non-deletable default folder where bookmarks are saved if no folder is specified

#### 2. `components/BookmarkButton.js` - Bookmark Button Component
A reusable button component for bookmarking properties:

**Props:**
- `property` (required) - The property object with _id, slug, title, pricePerNight, mainImage
- `showLabel` (optional) - Whether to show the "Bookmark" text (default: true)

**Features:**
- Displays bookmark status visually (heart icon)
- Shows folder selection menu when clicking to add a bookmark
- Shows move/remove menu when already bookmarked
- Prevents event propagation for use within links

**Styles:** `styles/BookmarkButton.module.css`

#### 3. `pages/bookmarks.js` - Bookmarks Management Page
A comprehensive page for managing all bookmarks and folders:

**Features:**
- Two-column layout: Folders sidebar and bookmarks main content
- Create new folders with inline form
- Rename folders with pencil icon
- Delete folders with trash icon
- View bookmarks in each folder
- Move bookmarks between folders
- Remove bookmarks
- Empty state with link to explore properties
- Bookmark count for each folder

**Styles:** `styles/Bookmarks.module.css`

### Updated Components

#### 1. `pages/index.js` - Home Page
- Added BookmarkButton to each property card
- Updated to use CSS modules for styling
- Maintains responsive grid layout

#### 2. `pages/property/[slug].js` - Property Detail Page
- Added BookmarkButton in header next to title
- Full property object passed for bookmark functionality
- Added dedicated styles with CSS modules

#### 3. `components/NavBar.js` - Navigation Bar
- Added "My Bookmarks" link with heart icon
- Routes to `/bookmarks` page
- Styled button with hover effects

### CSS Modules

1. **BookmarkButton.module.css** - Styles for bookmark button and folder menu
2. **Bookmarks.module.css** - Comprehensive styling for bookmarks page (426 lines)
3. **Home.module.css** - Updated home page styles with bookmark button positioning
4. **PropertyDetail.module.css** - Updated property detail page styles
5. **NavBar.module.css** - Navigation bar with bookmarks link

## Data Structure

### Bookmark Object
```javascript
{
  id: "prop-123-1699999999999",                    // Unique ID (propertyId-timestamp)
  propertyId: "prop-123",                          // Original property ID from Sanity
  propertySlug: "beautiful-house-in-paris",        // Property slug for linking
  title: "Beautiful House in Paris",               // Property title
  pricePerNight: 150,                              // Nightly price
  mainImage: { asset: { _ref: "image-123" } },    // Image reference for urlFor()
  folderId: "folder-123",                          // Folder this bookmark is in
  addedAt: "2024-01-01T10:00:00.000Z"             // ISO timestamp when added
}
```

### Folder Object
```javascript
{
  id: "all",                              // Unique ID
  name: "All Bookmarks",                 // Folder display name
  isDefault: true,                       // Cannot delete default folders
  createdAt: "2024-01-01T10:00:00.000Z" // ISO timestamp when created
}
```

## Usage Examples

### Adding a Bookmark
```javascript
import { useBookmarks } from '../hooks/useBookmarks'

function PropertyCard({ property }) {
  const { addBookmark } = useBookmarks()
  
  const handleBookmark = () => {
    addBookmark(property, 'all') // Add to "All Bookmarks" folder
  }
  
  return <button onClick={handleBookmark}>Bookmark</button>
}
```

### Creating a Folder
```javascript
import { useBookmarks } from '../hooks/useBookmarks'

function FolderCreator() {
  const { createFolder } = useBookmarks()
  
  const handleCreate = () => {
    createFolder("Beach Destinations")
  }
  
  return <button onClick={handleCreate}>Create Folder</button>
}
```

### Moving Bookmarks
```javascript
import { useBookmarks } from '../hooks/useBookmarks'

function BookmarkManager({ bookmarkId }) {
  const { moveBookmarkToFolder, folders } = useBookmarks()
  
  const handleMove = (folderId) => {
    moveBookmarkToFolder(bookmarkId, folderId)
  }
  
  return (
    <div>
      {folders.map(folder => (
        <button key={folder.id} onClick={() => handleMove(folder.id)}>
          Move to {folder.name}
        </button>
      ))}
    </div>
  )
}
```

## File Structure
```
airbnb-sanity-frontend/
├── hooks/
│   └── useBookmarks.js              # Bookmark state management hook
├── components/
│   ├── BookmarkButton.js            # Bookmark button component
│   ├── NavBar.js                    # Updated with bookmarks link
│   └── ...
├── pages/
│   ├── index.js                     # Updated with bookmark buttons
│   ├── bookmarks.js                 # Bookmarks management page
│   ├── property/
│   │   └── [slug].js                # Updated with bookmark button
│   └── ...
├── styles/
│   ├── BookmarkButton.module.css    # Bookmark button styles
│   ├── Bookmarks.module.css         # Bookmarks page styles
│   ├── Home.module.css              # Updated home page styles
│   ├── PropertyDetail.module.css    # Updated property detail styles
│   ├── NavBar.module.css            # Navigation bar styles
│   └── globals.css                  # Global styles
├── tests/
│   └── bookmark-logic.test.js       # Logic verification tests
└── ...
```

## Key Features

### 1. Persistent Storage
- Bookmarks are stored in browser localStorage
- Data persists across browser sessions
- No backend database required for basic functionality

### 2. Folder Management
- Create unlimited custom folders
- Rename folders to organize bookmarks
- Default "All Bookmarks" folder cannot be deleted
- Deleting a folder moves bookmarks to "All Bookmarks"

### 3. Responsive Design
- Works on desktop and mobile
- Sidebar collapses on smaller screens
- Touch-friendly buttons and interactions
- Optimized layout for various screen sizes

### 4. User Experience
- Visual feedback with heart icon color change
- Folder menu appears on bookmark action
- Move menu with current folder indicator
- Empty state with helpful messaging
- Quick access from navigation bar

### 5. Performance
- Efficient state management with React hooks
- Minimal re-renders with proper dependency arrays
- CSS modules for scoped styling
- No external dependencies for bookmarking (only uses React and Next.js)

## Browser Support
- Works in all modern browsers with localStorage support
- Tested on Chrome, Firefox, Safari, Edge
- Graceful degradation if localStorage is unavailable

## Future Enhancements
- Sync bookmarks with user account (requires backend)
- Share bookmarks with other users
- Export/import bookmarks
- Bookmark search and filter
- Bookmark notes and ratings
- Cloud synchronization
- Bookmark notifications/reminders

## Testing
A comprehensive test file is included (`tests/bookmark-logic.test.js`) that verifies:
- Bookmark creation and removal
- Folder creation and renaming
- Moving bookmarks between folders
- Deleting folders with bookmark migration
- Bookmark status checks

Run tests with: `node tests/bookmark-logic.test.js`

## Dependencies
- React (already in project)
- Next.js (already in project)
- No additional packages required

## Known Limitations
- Bookmarks are stored per browser (not synced across devices)
- Maximum storage depends on browser localStorage limits (typically 5-10MB)
- Bookmarks are lost if browser cache/localStorage is cleared

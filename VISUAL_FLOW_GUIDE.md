# Bookmark Feature - Visual Flow Guide

## User Journey

### 1. Discover & Bookmark Properties

**Home Page Flow:**
```
┌─────────────────────────────────────┐
│  AirBnb Clone - Home Page           │
│                                     │
│  Places to stay near you            │
│                                     │
│  ┌──────────────┐  ┌──────────────┐│
│  │[Image]  ♥    │  │[Image]  ♥    ││
│  │Beautiful Home│  │Cozy Apt      ││
│  │£150/night    │  │£100/night    ││
│  │5 reviews     │  │8 reviews     ││
│  └──────────────┘  └──────────────┘│
│                                     │
│  [Navigation Bar]                   │
│  ┌──────────────────────────────────┐
│  │ AirBnb Logo  ♥ My Bookmarks      │
│  └──────────────────────────────────┘
└─────────────────────────────────────┘

User clicks ♥ on property card:

┌─────────────────────────────┐
│ Save to folder:             │
├─────────────────────────────┤
│ • All Bookmarks             │
│ • Dream Homes               │
│ • Beach Destinations        │
└─────────────────────────────┘
```

### 2. Bookmark Menu on Property Detail Page

**Property Detail Page:**
```
┌─────────────────────────────────────────┐
│ Beautiful House in Paris                │
│ ♥ Bookmark                              │
│ 5 reviews                               │
│                                         │
│ [Large property images...]              │
│                                         │
│ Hosted by John Doe                      │
│ 3 bedrooms • 2 beds                     │
│ [Details...]                            │
└─────────────────────────────────────────┘

User clicks ♥ to bookmark:

┌──────────────────────────┐
│ Save to folder:          │
├──────────────────────────┤
│ • All Bookmarks          │
│ • Dream Homes            │
│ • Beach Destinations     │
│ • Budget Friendly        │
└──────────────────────────┘
```

### 3. Bookmarks Management Page

**Full Bookmarks Page Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│ My Bookmarks                                                 │
└──────────────────────────────────────────────────────────────┘

┌─────────────────────┐  ┌────────────────────────────────────┐
│ FOLDERS             │  │ All Bookmarks                      │
├─────────────────────┤  │ 8 bookmarks                        │
│ All Bookmarks (8)   │  │                                    │
│ Dream Homes (3)  ✎️🗑️│  ┌─────────────┐  ┌─────────────┐   │
│ Beach Dests (2) ✎️🗑️│  │[Image]      │  │[Image]      │   │
│ Budget Friendly (1)✎️🗑️ │Beautiful    │  │Cozy Apt     │   │
│ + Create Folder     │  │House        │  │             │   │
│                     │  │£150/night   │  │£100/night   │   │
│ [Create Form]       │  │Saved Jan 1  │  │Saved Dec 28 │   │
│ [Folder Name...]    │  │             │  │             │   │
│ [Create] [Cancel]   │  │Move to...   │  │Move to...   │   │
│                     │  │     ✕       │  │     ✕       │   │
│                     │  └─────────────┘  └─────────────┘   │
│                     │                                      │
│                     │  [More bookmarks...]                 │
└─────────────────────┘  └────────────────────────────────────┘
```

### 4. Folder Management

**Rename Folder Flow:**
```
User hovers over folder:

┌──────────────────────────┐
│ Dream Homes (3) ✎️ 🗑️    │
└──────────────────────────┘

User clicks ✎️ (pencil):

┌──────────────────────────┐
│ [Dream Homes...........]  │
│ [Save] [Cancel]         │
└──────────────────────────┘

User types new name and clicks Save:

✓ Folder renamed to "European Getaways"
```

**Delete Folder Flow:**
```
User clicks 🗑️ (trash):

┌──────────────────────────────────┐
│ Delete this folder?              │
│ All bookmarks will be moved to    │
│ "All Bookmarks"                  │
│                                  │
│ [Delete Folder] [Cancel]         │
└──────────────────────────────────┘

After deletion:
- European Getaways folder disappears
- 3 bookmarks move to "All Bookmarks"
- "All Bookmarks" now shows (11) instead of (8)
```

### 5. Moving Bookmarks

**Move Bookmark Flow:**
```
┌─────────────────────────┐
│ Beautiful House in Paris│
│ £150/night              │
│ Saved Jan 1             │
│                         │
│ [Move to...] [✕]        │
└─────────────────────────┘

Click "Move to...":

┌─────────────────────────┐
│ • All Bookmarks         │
│ • Dream Homes           │
│ ✓ Beach Destinations    │
│ • Budget Friendly       │
└─────────────────────────┘

User clicks new folder:
✓ Bookmark moved to selected folder
Menu closes automatically
```

## State Changes

### Bookmarking a Property

```
Initial State:
- Property not bookmarked
- Heart icon is empty/outlined

User clicks heart:

Transition State:
- Folder menu appears
- User selects folder

Final State:
- Property is bookmarked
- Heart icon turns red/filled
- Shows "Bookmarked" status
- All data saved to localStorage
```

### Creating a Folder

```
Initial State:
- User on Bookmarks page
- "+ Create Folder" button visible

User clicks button:

Transition State:
- Input form appears
- Focus on input field

User enters name and clicks Create:

Final State:
- New folder appears in list
- Show count: (0)
- New folder ready to use
- Input form disappears
```

## Data Flow

### Adding Bookmark

```
Property Card / Detail Page
        ↓
User clicks ♥ button
        ↓
Folder Selection Menu
        ↓
User selects folder
        ↓
useBookmarks.addBookmark()
        ↓
Create bookmark object
        ↓
Save to localStorage
        ↓
Update component state
        ↓
Button shows "Bookmarked"
        ↓
Data persists across sessions
```

### Managing Folders

```
Bookmarks Page Loaded
        ↓
useBookmarks.useEffect() runs
        ↓
Read from localStorage
        ↓
Load folders and bookmarks
        ↓
Display folder list in sidebar
        ↓
User performs action (rename/delete/create)
        ↓
useBookmarks function called
        ↓
Update folder data
        ↓
Save to localStorage
        ↓
Component re-renders
        ↓
Display updated folders
```

## Component Interaction

```
┌─────────────────────────────────────────┐
│         useBookmarks Hook               │
│  (localStorage state management)        │
└────────────────────┬────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌────────────┐  ┌──────────┐  ┌──────────────┐
│Bookmark    │  │Bookmarks │  │NavBar        │
│Button      │  │Page      │  │(link to page)│
│Component   │  │Component │  │              │
└────────────┘  └──────────┘  └──────────────┘
        │            │
        └────────────┴─────────────────────┐
                                           │
                        ┌──────────────────▼────────┐
                        │   Home Page / Property    │
                        │   Detail Page Components  │
                        └───────────────────────────┘
```

## Responsive Design

### Desktop View
```
┌─────────────────────────────────────────────────┐
│  My Bookmarks                                   │
├───────────────────┬─────────────────────────────┤
│ Folders Sidebar   │ Bookmarks Grid              │
│ (250px)           │ (Flexible - 3-4 columns)    │
│                   │                             │
│ • All Bookmarks   │ ┌──────┐ ┌──────┐          │
│ • Dream Homes     │ │Book1 │ │Book2 │          │
│ • Beach Dests     │ └──────┘ └──────┘          │
│ • Budget Friendly │                             │
│ + Create Folder   │ ┌──────┐ ┌──────┐          │
│                   │ │Book3 │ │Book4 │          │
│                   │ └──────┘ └──────┘          │
│                   │                             │
└───────────────────┴─────────────────────────────┘
```

### Mobile View
```
┌────────────────┐
│ My Bookmarks   │
├────────────────┤
│ FOLDERS        │
│ All Bookmarks  │
│ Dream Homes    │
│ Beach Dests    │
│ + Create       │
├────────────────┤
│ All Bookmarks  │
│ 8 bookmarks    │
│                │
│ ┌──────────┐   │
│ │Book1     │   │
│ │Saved Jan1│   │
│ └──────────┘   │
│                │
│ ┌──────────┐   │
│ │Book2     │   │
│ │Saved Dec │   │
│ └──────────┘   │
│                │
│ [More...]      │
└────────────────┘
```

## Empty States

### No Bookmarks Yet
```
┌─────────────────────────────────────┐
│ My Bookmarks                        │
│                                     │
│ [Empty state image/icon]            │
│                                     │
│ No bookmarks yet                    │
│                                     │
│ Start bookmarking properties to     │
│ see them here                       │
│                                     │
│ [Explore Properties] → (links home) │
└─────────────────────────────────────┘
```

### Folder is Empty
```
┌─────────────────────────────────────┐
│ Dream Homes                         │
│ 0 bookmarks                         │
│                                     │
│ [Empty state image/icon]            │
│                                     │
│ No bookmarks yet                    │
│                                     │
│ Move bookmarks to this folder to    │
│ see them here                       │
│                                     │
│ [Go Back]                           │
└─────────────────────────────────────┘
```

## Interactive Feedback

### Visual Feedback for Actions

```
Action              Before              After
──────────────────────────────────────────────────
Click heart         ♡ (empty)           ♥ (red/filled)
Bookmark            Gray color          Pink background

Hover folder        Normal              Slightly elevated
                    Gray background     Light gray bg

Hover bookmark      Normal              Subtle shadow
card                No shadow           Box shadow added

Rename in progress  ✏️ icon             Input field
                                       highlighted

Folder deleted      Folder visible      Folder gone
                                       Bookmarks moved
                                       Notification/visual

Move bookmark       Old folder          New folder
                   Selected             Selected
                   (highlighted)        (highlighted)
```

This visual guide helps users understand the bookmark feature's workflow and interactions!

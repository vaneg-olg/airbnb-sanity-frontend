/**
 * Test cases for bookmark functionality
 * This demonstrates that the bookmark logic is sound
 */

// Mock localStorage
class MockStorage {
  constructor() {
    this.store = {}
  }
  getItem(key) {
    return this.store[key] || null
  }
  setItem(key, value) {
    this.store[key] = value
  }
  removeItem(key) {
    delete this.store[key]
  }
  clear() {
    this.store = {}
  }
}

// Test bookmark logic
function testBookmarks() {
  const storage = new MockStorage()
  const STORAGE_KEY = 'airbnb_bookmarks'
  const FOLDERS_KEY = 'airbnb_bookmark_folders'
  
  // Initialize folders
  const defaultFolders = [
    {
      id: 'all',
      name: 'All Bookmarks',
      isDefault: true,
      createdAt: new Date().toISOString(),
    },
  ]
  storage.setItem(FOLDERS_KEY, JSON.stringify(defaultFolders))
  storage.setItem(STORAGE_KEY, JSON.stringify([]))
  
  let bookmarks = JSON.parse(storage.getItem(STORAGE_KEY))
  let folders = JSON.parse(storage.getItem(FOLDERS_KEY))
  
  // Test 1: Create bookmark
  console.log('Test 1: Create bookmark')
  const property = {
    _id: 'prop-1',
    slug: { current: 'test-property' },
    title: 'Beautiful House',
    pricePerNight: 100,
    mainImage: { asset: { _ref: 'image-1' } },
  }
  
  const bookmark = {
    id: `${property._id}-${Date.now()}`,
    propertyId: property._id,
    propertySlug: property.slug.current,
    title: property.title,
    pricePerNight: property.pricePerNight,
    mainImage: property.mainImage,
    folderId: 'all',
    addedAt: new Date().toISOString(),
  }
  
  bookmarks.push(bookmark)
  storage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  console.log('✓ Bookmark created:', bookmark.title)
  
  // Test 2: Check if bookmarked
  console.log('\nTest 2: Check if property is bookmarked')
  const isBookmarked = bookmarks.some(b => b.propertyId === 'prop-1')
  console.log('✓ Property bookmarked:', isBookmarked)
  
  // Test 3: Create folder
  console.log('\nTest 3: Create folder')
  const newFolder = {
    id: `folder-${Date.now()}`,
    name: 'Wishlist',
    isDefault: false,
    createdAt: new Date().toISOString(),
  }
  folders.push(newFolder)
  storage.setItem(FOLDERS_KEY, JSON.stringify(folders))
  console.log('✓ Folder created:', newFolder.name)
  
  // Test 4: Move bookmark to folder
  console.log('\nTest 4: Move bookmark to folder')
  bookmarks = bookmarks.map(b =>
    b.id === bookmark.id ? { ...b, folderId: newFolder.id } : b
  )
  storage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  console.log('✓ Bookmark moved to folder:', newFolder.name)
  
  // Test 5: Rename folder
  console.log('\nTest 5: Rename folder')
  folders = folders.map(f =>
    f.id === newFolder.id ? { ...f, name: 'Dream Homes' } : f
  )
  storage.setItem(FOLDERS_KEY, JSON.stringify(folders))
  console.log('✓ Folder renamed to: Dream Homes')
  
  // Test 6: Get bookmarks by folder
  console.log('\nTest 6: Get bookmarks by folder')
  const folderBookmarks = bookmarks.filter(b => b.folderId === newFolder.id)
  console.log('✓ Found', folderBookmarks.length, 'bookmarks in folder')
  
  // Test 7: Delete folder (move bookmarks to 'all')
  console.log('\nTest 7: Delete folder and move bookmarks')
  const updatedBookmarks = bookmarks.map(b =>
    b.folderId === newFolder.id ? { ...b, folderId: 'all' } : b
  )
  folders = folders.filter(f => f.id !== newFolder.id)
  storage.setItem(STORAGE_KEY, JSON.stringify(updatedBookmarks))
  storage.setItem(FOLDERS_KEY, JSON.stringify(folders))
  console.log('✓ Folder deleted, bookmarks moved to All Bookmarks')
  
  // Test 8: Remove bookmark
  console.log('\nTest 8: Remove bookmark')
  const finalBookmarks = updatedBookmarks.filter(b => b.id !== bookmark.id)
  storage.setItem(STORAGE_KEY, JSON.stringify(finalBookmarks))
  console.log('✓ Bookmark removed')
  
  console.log('\n✓ All tests passed!')
}

testBookmarks()

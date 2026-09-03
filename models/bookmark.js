/**
 * BookmarkFolder type
 * @typedef {Object} BookmarkFolder
 * @property {string} _id - Unique identifier
 * @property {string} _type - Should be "bookmarkFolder"
 * @property {string} name - Folder name
 * @property {boolean} isHidden - Whether the folder is hidden
 * @property {number} order - Display order
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * Bookmark type
 * @typedef {Object} Bookmark
 * @property {string} _id - Unique identifier
 * @property {string} _type - Should be "bookmark"
 * @property {string} propertyId - Reference to the property being bookmarked
 * @property {string} propertyTitle - Title of the bookmarked property
 * @property {string} folderId - Reference to the containing folder
 * @property {number} order - Display order within folder
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * Sanity schema definitions for bookmarks
 * This file documents the schemas that should be created in the Sanity backend
 */

export const BOOKMARK_SCHEMAS = {
  bookmarkFolder: {
    name: "bookmarkFolder",
    title: "Bookmark Folder",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Folder Name",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "isHidden",
        title: "Hidden",
        type: "boolean",
        description: "Hide this folder from view",
        initialValue: false,
      },
      {
        name: "order",
        title: "Display Order",
        type: "number",
        initialValue: 0,
      },
      {
        name: "createdAt",
        title: "Created",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          timeStep: 1,
        },
      },
      {
        name: "updatedAt",
        title: "Updated",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          timeStep: 1,
        },
      },
    ],
    preview: {
      select: {
        title: "name",
        hidden: "isHidden",
      },
      prepare(selection) {
        return {
          title: selection.title,
          subtitle: selection.hidden ? "Hidden" : "Visible",
        }
      },
    },
  },
  bookmark: {
    name: "bookmark",
    title: "Bookmark",
    type: "document",
    fields: [
      {
        name: "propertyId",
        title: "Property ID",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "propertyTitle",
        title: "Property Title",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "folderId",
        title: "Folder",
        type: "reference",
        to: [{ type: "bookmarkFolder" }],
        validation: (Rule) => Rule.required(),
      },
      {
        name: "order",
        title: "Display Order",
        type: "number",
        initialValue: 0,
      },
      {
        name: "createdAt",
        title: "Created",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          timeStep: 1,
        },
      },
      {
        name: "updatedAt",
        title: "Updated",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm",
          timeStep: 1,
        },
      },
    ],
    preview: {
      select: {
        title: "propertyTitle",
        folder: "folderId.name",
      },
      prepare(selection) {
        return {
          title: selection.title,
          subtitle: `in ${selection.folder}`,
        }
      },
    },
  },
}

# AirBnb Sanity.io Frontend

This repository is to support my tutorial on how to build an AirBnb Clone with structured content using Sanity.io and Next.js. View the full tutorial [here](https://youtu.be/mx1dbMzd3tU) 📺

In this video I show you how to build an AirBNB Clone, as well as manage all your data visually. We are going to build a backend for the app that defines the relationships between our data thanks to Schemas and Types, and add data using Sanity Studio ( https://www.sanity.io/ )

## ✨ New Feature: Bookmark Management

This project now includes a comprehensive **bookmark and folder management system** that allows users to:

- 🔖 **Bookmark properties** from the home page or property details
- 📁 **Create and organize** bookmarks into custom folders
- ✏️ **Rename and edit** folders to organize bookmarks
- 🚀 **Manage bookmarks** with a dedicated management page
- 💾 **Persistent storage** using browser localStorage

### Bookmark Features

- **One-click bookmarking** - Save properties with a single click
- **Folder organization** - Create custom folders to organize bookmarks
- **Visual feedback** - Heart icon changes color when bookmarked
- **Quick access** - "My Bookmarks" link in the navigation bar
- **Responsive design** - Works seamlessly on desktop and mobile
- **No account required** - All data stored locally in your browser

For detailed documentation on the bookmark feature, see [BOOKMARK_FEATURE.md](./BOOKMARK_FEATURE.md) and [BOOKMARK_USER_GUIDE.md](./BOOKMARK_USER_GUIDE.md).

---

## Topics Covered

* Schemas
* Types
* Content Management Systems
* Geolocation
* Google Maps API
* Clustering Markers
* Next.js
* ServerSideProps
* Sanity SDK
* React Hooks
* Custom React Hooks
* localStorage for state persistence
* CSS Modules
* Responsive Design

---

## Tutorial Timeline

0:00 - Introduction\
2:39 - Getting started with Sanity\
11:43 - Creating our Sanity Schemas\
24:55 - Creating PropertyImage Type\
30:15 - Creating Review Schema\
34:44 - Creating Traveller Schema\
35:50 - Creating Person Schema\
42:28 - Adding Data to our Sanity Studio\
52:17 - Getting Started with Next.js\
56:00 - Connecting our Sanity App to our Next app\
1:00:20 - Querying our Data with GROQ\
1:03:57 - Building our Next.js pages\
1:24:23 - Styling with CSS and Google Fonts\
1:31:10 - Adding in our images\
1:43:25 - Adding in our AirBnB property information styling\
1:46:45 - Adding in Review information\
1:54:25 - Adding in Location information\
2:06:01 - Adding Links with Next.js\
2:07:15 - Building our AirBnB's home page\
2:17:40 - Building our NavBar component\
2:21:30 - Adding our AirBnB logo\
2:23:35 - Adding a Cluster Map\
2:30:25 - Conclusion

---

## Support & Resources

If you get stuck, the Sanity community can be found here on the Sanity Exchange (https://www.sanity.io/exchange) and the Sanity Slack Community (https://slack.sanity.io/).

The backend to this project can be found [here](https://github.com/kubowania/airbnb-sanity-backend)

Google Maps API info can be found [here](https://developers.google.com/maps)

---

## Tools & Resources

In most videos I use Tabnine as my A.I autocompletion tool. You can download it for free [here](http://bit.ly/tabnine-top-tool)

If you would like to buy me a coffee, well thank you very much that is mega kind! : https://www.buymeacoffee.com/aniakubow

Sign up [here](https://bit.ly/JS-tips) for weekly coding tips from my newsletter partnership.

You can also find me on:\
Twitter: https://twitter.com/ania_kubow \
Instagram: https://www.instagram.com/aniakubow

---

## Getting Started

First, install the packages:
```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm run start
```

---

## Project Structure

```
airbnb-sanity-frontend/
├── components/          # React components
│   ├── BookmarkButton.js        # NEW: Bookmark button component
│   ├── DashboardMap.js
│   ├── Image.js
│   ├── Map.js
│   ├── NavBar.js
│   └── Review.js
├── hooks/              # Custom React hooks
│   └── useBookmarks.js          # NEW: Bookmark management hook
├── pages/              # Next.js pages
│   ├── _app.js
│   ├── api/
│   ├── bookmarks.js             # NEW: Bookmarks management page
│   ├── index.js
│   └── property/
│       └── [slug].js
├── public/             # Static assets
├── styles/             # CSS modules
│   ├── BookmarkButton.module.css # NEW: Bookmark button styles
│   ├── Bookmarks.module.css      # NEW: Bookmarks page styles
│   ├── Home.module.css           # UPDATED: Home page styles
│   ├── NavBar.module.css         # NEW: NavBar styles
│   ├── PropertyDetail.module.css # NEW: Property detail styles
│   └── globals.css
└── [config files]
```

---

## Documentation

- **[BOOKMARK_FEATURE.md](./BOOKMARK_FEATURE.md)** - Technical documentation for developers
- **[BOOKMARK_USER_GUIDE.md](./BOOKMARK_USER_GUIDE.md)** - User guide for bookmarking features
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Summary of bookmark implementation
- **[VISUAL_FLOW_GUIDE.md](./VISUAL_FLOW_GUIDE.md)** - Visual diagrams of user flows
- **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Complete verification of features

---

## Environment Variables

Make sure to set up your environment variables in a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Features

### Core Features
- ✅ Browse properties
- ✅ View property details
- ✅ See reviews and ratings
- ✅ Interactive map with clustering
- ✅ Google Maps integration

### Bookmark Features (NEW)
- ✅ Bookmark properties
- ✅ Create custom folders
- ✅ Rename folders
- ✅ Edit folders
- ✅ Move bookmarks between folders
- ✅ Delete bookmarks and folders
- ✅ Persistent storage
- ✅ Responsive design

---

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

## Performance

The bookmark feature is optimized for performance:
- No external dependencies
- Efficient state management with React hooks
- CSS modules for scoped styling
- localStorage for instant data persistence
- Minimal bundle impact

---

## Future Enhancements

- Cloud synchronization for bookmarks across devices
- Share bookmark collections with other users
- Export bookmarks (PDF, CSV)
- Advanced search and filtering
- Bookmark ratings and notes
- Social features

---

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

## License

This project is open source and available under the MIT License.

---

## Changelog

### v1.1.0 - Bookmark Management Feature
- Added bookmark functionality
- Added folder management system
- Added bookmarks management page
- Updated navigation bar
- Added comprehensive documentation
- Upgraded Next.js to v12 for better compatibility

### v1.0.0 - Initial Release
- Property listing and details
- Google Maps integration
- Sanity.io content management
- Review system

---

**Happy Coding! 🚀**

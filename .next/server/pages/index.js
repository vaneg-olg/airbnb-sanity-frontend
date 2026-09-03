(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 1288:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "Home_main__nLjiQ",
	"feedContainer": "Home_feedContainer__Zqmrt",
	"feed": "Home_feed__7lJTS",
	"map": "Home_map__5Zolt",
	"cardWrapper": "Home_cardWrapper__7GQqw",
	"card": "Home_card___LpL1",
	"reviewCount": "Home_reviewCount__7DUEm"
};


/***/ }),

/***/ 3059:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./sanity.js
var sanity = __webpack_require__(3774);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./utils.js
var utils = __webpack_require__(1313);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "@react-google-maps/api"
var api_ = __webpack_require__(2433);
;// CONCATENATED MODULE: ./components/DashboardMap.js



const DashboardMap = ({ properties  })=>{
    const { isLoaded  } = (0,api_.useJsApiLoader)({
        id: "google-map-script",
        googleMapsApiKey: process.env.googlePlacesAPI
    });
    console.log(properties[0].location?.lat);
    console.log(properties[0].location?.lat);
    const containerStyle = {
        width: "100%",
        height: "100vh"
    };
    const center = {
        lat: properties[0].location?.lat,
        lng: properties[0].location?.lng
    };
    const [map, setMap] = external_react_default().useState(null);
    const onLoad = external_react_default().useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    }, []);
    const onUnmount = external_react_default().useCallback(function callback(map) {
        setMap(null);
    }, []);
    const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    return isLoaded ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(api_.GoogleMap, {
        mapContainerStyle: containerStyle,
        center: center,
        zoom: 10,
        onLoad: onLoad,
        onUnmount: onUnmount,
        children: [
            properties.map((property, index)=>/*#__PURE__*/ jsx_runtime_.jsx(api_.Marker, {
                    position: {
                        lat: property?.location?.lat,
                        lng: property?.location?.lng
                    },
                    icon: {
                        url: image,
                        anchor: new google.maps.Point(5, 58)
                    }
                })),
            /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {})
        ]
    }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
};
/* harmony default export */ const components_DashboardMap = (/*#__PURE__*/external_react_default().memo(DashboardMap));

// EXTERNAL MODULE: ./components/BookmarkButton.js
var BookmarkButton = __webpack_require__(5769);
// EXTERNAL MODULE: ./styles/Home.module.css
var Home_module = __webpack_require__(1288);
var Home_module_default = /*#__PURE__*/__webpack_require__.n(Home_module);
;// CONCATENATED MODULE: ./pages/index.js







const Home = ({ properties  })=>{
    console.log(properties);
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: properties && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: (Home_module_default()).main,
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (Home_module_default()).feedContainer,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                            children: "Places to stay near you"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: (Home_module_default()).feed,
                            children: properties.map((property)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (Home_module_default()).cardWrapper,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            href: `property/${property.slug.current}`,
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: (Home_module_default()).card,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                        src: (0,sanity/* urlFor */.u)(property.mainImage)
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                                        className: (Home_module_default()).reviewCount,
                                                        children: [
                                                            property.reviews.length,
                                                            " review",
                                                            (0,utils/* isMultiple */.E)(property.reviews.length)
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                        children: property.title
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("b", {
                                                            children: [
                                                                "\xa3",
                                                                property.pricePerNight,
                                                                "/per Night"
                                                            ]
                                                        })
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(BookmarkButton/* default */.Z, {
                                            property: property,
                                            showLabel: false
                                        })
                                    ]
                                }, property._id))
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: (Home_module_default()).map,
                    children: /*#__PURE__*/ jsx_runtime_.jsx(components_DashboardMap, {
                        properties: properties
                    })
                })
            ]
        })
    });
};
const getServerSideProps = async ()=>{
    const query = '*[ _type == "property"]{_id, _type, title, slug, mainImage, pricePerNight, reviews}';
    const properties = await sanity/* sanityClient.fetch */.i.fetch(query);
    if (!properties.length) {
        return {
            props: {
                properties: []
            }
        };
    } else {
        return {
            props: {
                properties
            }
        };
    }
};
/* harmony default export */ const pages = (Home);


/***/ }),

/***/ 2433:
/***/ ((module) => {

"use strict";
module.exports = require("@react-google-maps/api");

/***/ }),

/***/ 5879:
/***/ ((module) => {

"use strict";
module.exports = require("next-sanity");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,63,645,732], () => (__webpack_exec__(3059)));
module.exports = __webpack_exports__;

})();
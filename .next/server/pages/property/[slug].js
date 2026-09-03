(() => {
var exports = {};
exports.id = 941;
exports.ids = [941];
exports.modules = {

/***/ 7372:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "PropertyDetail_container__AgWqH",
	"header": "PropertyDetail_header__Qd6FK",
	"reviewSummary": "PropertyDetail_reviewSummary__bX4Eu",
	"headerActions": "PropertyDetail_headerActions__ZTO8r",
	"section": "PropertyDetail_section__VxAc2",
	"information": "PropertyDetail_information__4SZXC",
	"priceBox": "PropertyDetail_priceBox__BEw0W",
	"button": "PropertyDetail_button__dbPoF",
	"imagesSection": "PropertyDetail_imagesSection__C8TsV",
	"mainImage": "PropertyDetail_mainImage__Zb0hF",
	"subImagesSection": "PropertyDetail_subImagesSection__gxNB8"
};


/***/ }),

/***/ 6515:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _slug_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./sanity.js
var sanity = __webpack_require__(3774);
// EXTERNAL MODULE: ./utils.js
var utils = __webpack_require__(1313);
;// CONCATENATED MODULE: ./components/Image.js


const Image = ({ identifier , image  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: identifier === "main-image" ? "main-image" : "image",
        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
            src: (0,sanity/* urlFor */.u)(image).auto("format")
        })
    });
};
/* harmony default export */ const components_Image = (Image);

;// CONCATENATED MODULE: ./components/Review.js


const Review = ({ review  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "review-box",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                children: review.rating
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: review.traveller.name
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("img", {
                src: (0,sanity/* urlFor */.u)(review.traveller.image).width(50).height(50).crop("focalpoint").auto("format")
            })
        ]
    });
};
/* harmony default export */ const components_Review = (Review);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "@react-google-maps/api"
var api_ = __webpack_require__(2433);
;// CONCATENATED MODULE: ./components/Map.js



const Map = ({ location  })=>{
    const { isLoaded  } = (0,api_.useJsApiLoader)({
        id: "google-map-script",
        googleMapsApiKey: process.env.googlePlacesAPI
    });
    console.log("location.lat", location.lat);
    console.log("location.lat", location.lat);
    const containerStyle = {
        width: "100%",
        height: "400px"
    };
    console.log(location.lat);
    const center = {
        lat: location.lat,
        lng: location.lng
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
            /*#__PURE__*/ jsx_runtime_.jsx(api_.Marker, {
                position: {
                    lat: location.lat,
                    lng: location.lng
                },
                icon: {
                    url: image,
                    anchor: new google.maps.Point(5, 58)
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {})
        ]
    }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {});
};
/* harmony default export */ const components_Map = (/*#__PURE__*/external_react_default().memo(Map));

// EXTERNAL MODULE: ./components/BookmarkButton.js
var BookmarkButton = __webpack_require__(5769);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./styles/PropertyDetail.module.css
var PropertyDetail_module = __webpack_require__(7372);
var PropertyDetail_module_default = /*#__PURE__*/__webpack_require__.n(PropertyDetail_module);
;// CONCATENATED MODULE: ./pages/property/[slug].js









const Property = ({ title , location , propertyType , mainImage , images , pricePerNight , beds , bedrooms , description , host , reviews , property ,  })=>{
    const reviewAmount = reviews.length;
    console.log(images);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (PropertyDetail_module_default()).container,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (PropertyDetail_module_default()).header,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                    children: title
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                className: (PropertyDetail_module_default()).reviewSummary,
                                children: [
                                    reviewAmount,
                                    " review",
                                    (0,utils/* isMultiple */.E)(reviewAmount)
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (PropertyDetail_module_default()).headerActions,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(BookmarkButton/* default */.Z, {
                            property: property,
                            showLabel: true
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (PropertyDetail_module_default()).imagesSection,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components_Image, {
                        identifier: "main-image",
                        image: mainImage
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (PropertyDetail_module_default()).subImagesSection,
                        children: images.map(({ _key , asset  }, image)=>/*#__PURE__*/ jsx_runtime_.jsx(components_Image, {
                                identifier: "image",
                                image: asset
                            }, _key))
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (PropertyDetail_module_default()).section,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (PropertyDetail_module_default()).information,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("b", {
                                    children: [
                                        propertyType,
                                        " hosted by ",
                                        host?.name
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                children: [
                                    bedrooms,
                                    " bedroom",
                                    (0,utils/* isMultiple */.E)(bedrooms),
                                    " * ",
                                    beds,
                                    " bed",
                                    (0,utils/* isMultiple */.E)(beds)
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                    children: "Enhanced Clean"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "This host is committed to Airbnb's 5-step enhanced cleaning process."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                    children: "Amenities for everyday living"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "The host has equipped this place for long stays - kitchen, shampoo, conditioner, hairdryer included."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("b", {
                                    children: "House rules"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "This place isn't suitable for pets andthe host does not allow parties or smoking."
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: (PropertyDetail_module_default()).priceBox,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                                children: [
                                    "\xa3",
                                    pricePerNight
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                children: [
                                    reviewAmount,
                                    " review",
                                    (0,utils/* isMultiple */.E)(reviewAmount)
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: "/",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (PropertyDetail_module_default()).button,
                                    children: "Change Dates"
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                children: description
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                children: [
                    reviewAmount,
                    " review",
                    (0,utils/* isMultiple */.E)(reviewAmount)
                ]
            }),
            reviewAmount > 0 && reviews.map((review)=>/*#__PURE__*/ jsx_runtime_.jsx(components_Review, {
                    review: review
                }, review._key)),
            /*#__PURE__*/ jsx_runtime_.jsx("hr", {}),
            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                children: "Location"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Map, {
                location: location
            })
        ]
    });
};
const getServerSideProps = async (pageContext)=>{
    const pageSlug = pageContext.query.slug;
    const query = `*[ _type == "property" && slug.current == $pageSlug][0]{
    _id,
    title,
    slug,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      name,
      slug,
      image
    },
    reviews[]{
      ...,
      traveller->{
        _id,
        name,
        slug,
        image
      }
    }
  }`;
    const property = await sanity/* sanityClient.fetch */.i.fetch(query, {
        pageSlug
    });
    if (!property) {
        return {
            props: null,
            notFound: true
        };
    } else {
        return {
            props: {
                title: property.title,
                location: property.location,
                propertyType: property.propertyType,
                mainImage: property.mainImage,
                images: property.images,
                pricePerNight: property.pricePerNight,
                beds: property.beds,
                bedrooms: property.bedrooms,
                description: property.description,
                host: property.host,
                reviews: property.reviews,
                property: property
            }
        };
    }
};
/* harmony default export */ const _slug_ = (Property);


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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,63,645,732], () => (__webpack_exec__(6515)));
module.exports = __webpack_exports__;

})();
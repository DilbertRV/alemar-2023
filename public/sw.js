if(!self.define){let e,s={};const c=(c,n)=>(c=new URL(c+".js",n).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(n,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Crearordenbgfood.png",revision:"976376cb8de0af05390b2746e907d9ae"},{url:"/Logo.svg",revision:"439b14b175327697801626018706952d"},{url:"/_next/static/Ox9m4im4dl241fBEPpF-T/_buildManifest.js",revision:"584bc56ec5a710df2546db5e11e5aa19"},{url:"/_next/static/Ox9m4im4dl241fBEPpF-T/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/607.48f23a68eab308a7.js",revision:"48f23a68eab308a7"},{url:"/_next/static/chunks/61-0ade489e4dfcfe0d.js",revision:"0ade489e4dfcfe0d"},{url:"/_next/static/chunks/928-a2c4d610aee30efb.js",revision:"a2c4d610aee30efb"},{url:"/_next/static/chunks/b98bc7c3-2d5f7b223f158dab.js",revision:"2d5f7b223f158dab"},{url:"/_next/static/chunks/framework-114634acb84f8baa.js",revision:"114634acb84f8baa"},{url:"/_next/static/chunks/main-ac533633f8b32a28.js",revision:"ac533633f8b32a28"},{url:"/_next/static/chunks/pages/_app-f9e1e6585827e99b.js",revision:"f9e1e6585827e99b"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/index-a47064c4485cf699.js",revision:"a47064c4485cf699"},{url:"/_next/static/chunks/pages/inventario-523a8b2e15824729.js",revision:"523a8b2e15824729"},{url:"/_next/static/chunks/pages/inventario/%5Bid%5D/editar-a83609fcbcebb660.js",revision:"a83609fcbcebb660"},{url:"/_next/static/chunks/pages/inventario/new-e646f83cb6b41985.js",revision:"e646f83cb6b41985"},{url:"/_next/static/chunks/pages/orden-c3c7d2ab43586117.js",revision:"c3c7d2ab43586117"},{url:"/_next/static/chunks/pages/orden/ordenes-f579ccf6e2e93f97.js",revision:"f579ccf6e2e93f97"},{url:"/_next/static/chunks/pages/orden/procesarorden-0711751320749e38.js",revision:"0711751320749e38"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-100c629c5cbf07c6.js",revision:"100c629c5cbf07c6"},{url:"/_next/static/css/67e065506d53b391.css",revision:"67e065506d53b391"},{url:"/_next/static/media/2aaf0723e720e8b9.p.woff2",revision:"e1b9f0ecaaebb12c93064cd3c406f82b"},{url:"/_next/static/media/9c4f34569c9b36ca.woff2",revision:"2c1fc211bf5cca7ae7e7396dc9e4c824"},{url:"/_next/static/media/ae9ae6716d4f8bf8.woff2",revision:"b0c49a041e15bdbca22833f1ed5cfb19"},{url:"/_next/static/media/b1db3e28af9ef94a.woff2",revision:"70afeea69c7f52ffccde29e1ea470838"},{url:"/_next/static/media/b967158bc7d7a9fb.woff2",revision:"08ccb2a3cfc83cf18d4a3ec64dd7c11b"},{url:"/_next/static/media/c0f5ec5bbf5913b7.woff2",revision:"8ca5bc1cd1579933b73e51ec9354eec9"},{url:"/_next/static/media/d1d9458b69004127.woff2",revision:"9885d5da3e4dfffab0b4b1f4a259ca27"},{url:"/bebidas.png",revision:"b219ca248c328098d9dc0b4e399c1478"},{url:"/bg.svg",revision:"ea2d2443c416666b8359c35e6212b36b"},{url:"/ejecutivo.png",revision:"059fa8ff9cc124eccc265e0cc95399cf"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/food.png",revision:"d31fb3588f689b3d5c47b0959eb39efe"},{url:"/icon-192x192.png",revision:"bd20452844b03e9f9f8790a31eadb92c"},{url:"/icon-256x256.png",revision:"e21805e4a91817e1e376a63686df0cca"},{url:"/icon-384x384.png",revision:"1751e03c5b03150217a803c50a04be5a"},{url:"/icon-512x512.png",revision:"9a9b63541bc7bdf3d3211808474e417e"},{url:"/logoAlemar.png",revision:"45b221a6fbde6ded7e1699527070c899"},{url:"/manifest.json",revision:"b90783c23e0c4641f38b8e9214984cd4"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/thirteen.svg",revision:"53f96b8290673ef9d2895908e69b2f92"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

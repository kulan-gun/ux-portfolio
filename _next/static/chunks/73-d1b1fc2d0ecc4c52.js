"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[73],{1644:(e,r,t)=>{t.d(r,{A:()=>s});var n=t(5155);function s(e){let{sections:r}=e;return(0,n.jsx)("div",{className:"rounded-3xl bg-zinc-900/50 p-8 md:p-12 backdrop-blur-sm",children:(0,n.jsx)("div",{className:"space-y-12",children:r.map((e,r)=>(0,n.jsxs)("div",{className:"flex items-start gap-8 md:gap-16",children:[(0,n.jsx)("div",{className:"w-32 md:w-40",children:(0,n.jsx)("h3",{className:"text-xl md:text-2xl font-normal text-white",children:e.title})}),(0,n.jsxs)("div",{className:"flex-1",children:[(0,n.jsx)("div",{className:"h-0.5 w-12 bg-white mb-6 opacity-70","aria-hidden":"true"}),(0,n.jsx)("ul",{className:"space-y-4 text-gray-300",children:e.items.map((e,r)=>(0,n.jsxs)("li",{className:"flex gap-3",children:[(0,n.jsx)("span",{className:"text-white","aria-hidden":"true",children:"•"}),(0,n.jsx)("span",{children:e})]},r))})]})]},r))})})}},5427:(e,r,t)=>{t.d(r,{A:()=>i});var n=t(5155),s=t(2115),a=t(9881);function i(){let[e,r]=(0,s.useState)(!1);return((0,s.useEffect)(()=>{let e=()=>{r(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),e)?(0,n.jsx)("div",{className:"flex justify-center my-8",children:(0,n.jsxs)("button",{onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},className:"inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50","aria-label":"Scroll back to top",children:[(0,n.jsx)(a.A,{className:"mr-1.5 w-4 h-4","aria-hidden":"true"}),(0,n.jsx)("span",{children:"Back to top"})]})}):null}},7052:(e,r,t)=>{t.d(r,{A:()=>l});var n=t(5155),s=t(2115),a=t(2596),i=t(9688);function l(e){let{children:r,className:t,delay:l=0,once:o=!0,animation:d="fade-up",initiallyVisible:c=!1}=e,[u,h]=(0,s.useState)(c),[x,m]=(0,s.useState)(c),f=(0,s.useRef)(null);return(0,s.useEffect)(()=>{if(c){h(!0),o&&m(!0);return}let e=new IntersectionObserver(e=>{let[r]=e;o&&x||(r.isIntersecting?(h(!0),o&&m(!0)):o||h(!1))},{root:null,rootMargin:"0px",threshold:.1}),r=f.current;return r&&e.observe(r),()=>{r&&e.unobserve(r)}},[o,x,c]),(0,n.jsx)("div",{ref:f,className:function(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,i.QP)((0,a.$)(r))}({"fade-up":"transition-all duration-700 ease-out","fade-in":"transition-opacity duration-700 ease-out","bounce-up":"transition-all duration-700 ease-out"}[d],u?"":({"fade-up":"translate-y-10 opacity-0","fade-in":"opacity-0","bounce-up":"translate-y-16 opacity-0"})[d],t),style:{transitionDelay:"".concat(l,"ms"),transform:u?"translate3d(0, 0, 0)":"fade-in"===d?"translate3d(0, 0, 0)":"bounce-up"===d?"translate3d(0, 4rem, 0)":"translate3d(0, 2.5rem, 0)",opacity:+!!u},children:r})}},7351:(e,r,t)=>{t.d(r,{A:()=>o});var n=t(5155),s=t(6766),a=t(2115),i=t(6874),l=t.n(i);function o(e){let{onMobileMenuToggle:r}=e,[t,i]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=()=>{i(window.innerWidth<768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),(0,n.jsx)("header",{className:"".concat(t?"relative":"md:sticky"," top-0 z-40 border-b border-gray-800 backdrop-blur-sm"),style:{backgroundColor:"rgba(18, 18, 18, 0.8)"},children:(0,n.jsxs)("div",{className:"flex flex-col md:flex-row md:h-16 items-center justify-between px-4 sm:px-8 py-3 md:py-0",children:[(0,n.jsx)("div",{className:"flex justify-center w-full md:w-auto md:justify-start mb-3 md:mb-0",children:(0,n.jsx)(l(),{href:"/",className:"flex items-center","aria-label":"Home",children:(0,n.jsx)("div",{className:"w-10 h-10 relative rounded-lg overflow-hidden bg-white",children:(0,n.jsx)(s.default,{src:"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-b07vLZDfIhbE0cTGGIba8vBcMMU4UB.png",alt:"KG Logo",fill:!0,className:"object-contain p-1",priority:!0})})})}),(0,n.jsxs)("nav",{className:"flex items-center space-x-6","aria-label":"Main navigation",children:[(0,n.jsx)(l(),{href:"/",className:"text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline",children:"Work"}),(0,n.jsxs)("a",{href:"https://www.credly.com/users/kulan-gunawardena",target:"_blank",rel:"noopener noreferrer",className:"text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group","aria-label":"Credentials (opens in new tab)",children:["Credentials",(0,n.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M7 17L17 7M17 7H7M17 7V17"})})]}),(0,n.jsxs)("a",{href:"https://www.linkedin.com/in/kulan-gun/",target:"_blank",rel:"noopener noreferrer",className:"text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group","aria-label":"LinkedIn (opens in new tab)",children:["LinkedIn",(0,n.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M7 17L17 7M17 7H7M17 7V17"})})]}),(0,n.jsxs)("a",{href:"https://read.cv/kulan.gun",target:"_blank",rel:"noopener noreferrer",className:"text-sm font-normal hover:text-gray-300 focus:outline-none focus:underline flex items-center group","aria-label":"CV (opens in new tab)",children:["CV",(0,n.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M7 17L17 7M17 7H7M17 7V17"})})]})]})]})})}},7746:(e,r,t)=>{t.d(r,{A:()=>i});var n=t(5155),s=t(6874),a=t.n(s);function i(){return(0,n.jsx)("footer",{className:"border-t border-gray-800 backdrop-blur-sm",style:{backgroundColor:"rgba(18, 18, 18, 0.8)"},role:"contentinfo",children:(0,n.jsxs)("div",{className:"mx-auto max-w-6xl px-4 sm:px-8 py-12 md:py-16",children:[(0,n.jsxs)("div",{className:"grid grid-cols-2 gap-8 md:gap-16 mb-12",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{className:"text-sm font-medium text-gray-400 mb-4",children:"MAIN"}),(0,n.jsx)("ul",{className:"space-y-3",children:(0,n.jsx)("li",{children:(0,n.jsx)(a(),{href:"/work",className:"text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:underline",children:"Work"})})})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{className:"text-sm font-medium text-gray-400 mb-4",children:"CONTACT"}),(0,n.jsxs)("ul",{className:"space-y-3",children:[(0,n.jsx)("li",{children:(0,n.jsxs)("a",{href:"https://www.linkedin.com/in/kulan-gun/",target:"_blank",rel:"noopener noreferrer",className:"text-sm text-gray-300 hover:text-white transition-colors flex items-center group focus:outline-none focus:underline","aria-label":"LinkedIn (opens in new tab)",children:["LinkedIn",(0,n.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M7 17L17 7M17 7H7M17 7V17"})})]})}),(0,n.jsx)("li",{children:(0,n.jsxs)("a",{href:"https://read.cv/kulan.gun",target:"_blank",rel:"noopener noreferrer",className:"text-sm text-gray-300 hover:text-white transition-colors flex items-center group focus:outline-none focus:underline","aria-label":"CV (opens in new tab)",children:["CV",(0,n.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"ml-1 transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]","aria-hidden":"true",children:(0,n.jsx)("path",{d:"M7 17L17 7M17 7H7M17 7V17"})})]})})]})]})]}),(0,n.jsx)("div",{className:"pt-8 border-t border-gray-800",children:(0,n.jsx)("p",{className:"text-sm text-gray-400",children:"\xa9 2025 Kulan Gunawardena. All rights reserved. Built using React.js and TypeScript."})})]})})}},9864:(e,r,t)=>{t.d(r,{A:()=>a});var n=t(5155),s=t(2115);function a(){let[e,r]=(0,s.useState)(0);return(0,s.useEffect)(()=>{let e=()=>{let e=document.documentElement.scrollHeight-window.innerHeight;r(window.scrollY/e*100)};return window.addEventListener("scroll",e),e(),()=>window.removeEventListener("scroll",e)},[]),(0,n.jsx)("div",{className:"fixed top-0 left-0 right-0 h-1 z-50",children:(0,n.jsx)("div",{className:"h-full bg-white transition-all duration-150 ease-out",style:{width:"".concat(e,"%")},"aria-hidden":"true"})})}}}]);
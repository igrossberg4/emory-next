import { Icon, addCollection } from "@iconify/react/dist/offline"
// https://api.iconify.design/mdi-light.json?icons=menu,chevron-down,chevron-right,chevron-left,chevron-up,plus,minus,volume,volume-off,eye,microphone,play&pretty=1
// https://api.iconify.design/bi.json?icons=youtube,twitter,linkedin,instagram,facebook&pretty=1
// import "./icons-bundle"
addCollection({
    "prefix": "em",
    "icons": {
        "menu": {
            "body": "<path d=\"M3 8V7h17v1H3zm17 4v1H3v-1h17zM3 17h17v1H3v-1z\" fill=\"currentColor\"/>"
        },
        "mute":{
            "body":'<path d="M 3.293 3.978 L 4 3.271 L 20.75 20.022 L 20.043 20.729 L 17.802 18.489 C 16.796 19.081 15.665 19.429 14.5 19.505 L 14.5 18.502 C 15.399 18.434 16.274 18.179 17.068 17.752 L 15.558 16.243 C 15.223 16.368 14.868 16.453 14.5 16.493 L 14.5 15.486 C 14.586 15.473 14.67 15.458 14.754 15.439 L 12.5 13.185 L 12.5 19.522 L 10.5 19.522 L 6.5 15.522 L 2.5 15.522 L 2.5 8.522 L 6.5 8.522 L 7.168 7.853 L 3.293 3.978 Z  M 21.5 12.022 C 21.5 14.051 20.694 15.891 19.385 17.242 L 18.678 16.535 C 19.534 15.647 20.12 14.535 20.367 13.327 C 20.615 12.119 20.513 10.865 20.075 9.713 C 19.637 8.56 18.881 7.556 17.893 6.818 C 16.906 6.079 15.729 5.636 14.5 5.541 L 14.5 4.538 C 16.398 4.664 18.178 5.508 19.477 6.898 C 20.777 8.287 21.5 10.119 21.5 12.022 Z  M 18.5 12.022 C 18.5 13.221 18.03 14.314 17.263 15.121 L 16.556 14.413 C 16.993 13.945 17.294 13.367 17.426 12.741 C 17.557 12.115 17.515 11.465 17.303 10.861 C 17.091 10.258 16.718 9.724 16.224 9.317 C 15.729 8.911 15.133 8.648 14.5 8.557 L 14.5 7.549 C 15.6 7.672 16.616 8.196 17.354 9.021 C 18.092 9.846 18.5 10.914 18.5 12.022 Z  M 15.5 12.022 C 15.5 12.394 15.364 12.734 15.14 12.997 L 14.5 12.357 L 14.5 10.607 C 14.793 10.71 15.046 10.902 15.225 11.155 C 15.404 11.408 15.5 11.711 15.5 12.022 Z  M 6.914 9.522 L 3.5 9.522 L 3.5 14.522 L 6.914 14.522 L 10.914 18.522 L 11.5 18.522 L 11.5 12.186 L 7.875 8.561 L 6.915 9.523 L 6.914 9.522 Z  M 10.5 4.522 L 12.5 4.522 L 12.5 10.358 L 11.5 9.358 L 11.5 5.522 L 10.914 5.522 L 9.29 7.147 L 8.583 6.44 L 10.5 4.522 Z" fill="#212322"/>'
        },
        "unmute":{
            "body":'<path d="M 21.5 12 C 21.5 13.903 20.777 15.734 19.477 17.124 C 18.178 18.514 16.398 19.357 14.5 19.484 L 14.5 18.48 C 16.131 18.352 17.653 17.614 18.763 16.412 C 19.874 15.211 20.49 13.636 20.49 12 C 20.49 10.364 19.874 8.789 18.763 7.588 C 17.653 6.387 16.131 5.648 14.5 5.52 L 14.5 4.516 C 16.398 4.643 18.178 5.487 19.477 6.876 C 20.777 8.266 21.5 10.097 21.5 12 Z  M 18.5 12 C 18.5 13.107 18.092 14.175 17.354 15.001 C 16.616 15.826 15.6 16.35 14.5 16.473 L 14.5 15.465 C 15.333 15.345 16.095 14.928 16.646 14.292 C 17.197 13.655 17.5 12.842 17.5 12 C 17.5 11.158 17.197 10.345 16.646 9.708 C 16.095 9.072 15.333 8.655 14.5 8.535 L 14.5 7.527 C 15.6 7.65 16.616 8.174 17.354 8.999 C 18.092 9.825 18.5 10.893 18.5 12 Z  M 15.5 12 C 15.5 12.31 15.404 12.613 15.225 12.866 C 15.046 13.12 14.793 13.312 14.5 13.415 L 14.5 10.585 C 14.793 10.688 15.046 10.88 15.225 11.134 C 15.404 11.387 15.5 11.69 15.5 12 Z  M 2.5 8.5 L 6.5 8.5 L 10.5 4.5 L 12.5 4.5 L 12.5 19.5 L 10.5 19.5 L 6.5 15.5 L 2.5 15.5 L 2.5 8.5 Z  M 3.5 14.5 L 6.914 14.5 L 10.914 18.5 L 11.5 18.5 L 11.5 5.5 L 10.914 5.5 L 6.914 9.5 L 3.5 9.5 L 3.5 14.5 Z" fill="#212322"/>'
        },
        "chevron-down": {
            "body": "<path d=\"M5.843 9.593L11.5 15.25l5.657-5.657l-.707-.707l-4.95 4.95l-4.95-4.95l-.707.707z\" fill=\"currentColor\"/>"
        },
        "chevron-right": {
            "body": "<path d=\"M8.593 18.157L14.25 12.5L8.593 6.843l-.707.707l4.95 4.95l-4.95 4.95l.707.707z\" fill=\"currentColor\"/>"
        },
        "chevron-left": {
            "body": "<path d=\"M14.407 18.157L8.75 12.5l5.657-5.657l.707.707l-4.95 4.95l4.95 4.95l-.707.707z\" fill=\"currentColor\"/>"
        },
        "chevron-up": {
            "body": "<path d=\"M5.843 15.407L11.5 9.75l5.657 5.657l-.707.707l-4.95-4.95l-4.95 4.95l-.707-.707z\" fill=\"currentColor\"/>"
        },
        "plus": {
            "body": "<path d=\"M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6H5z\" fill=\"currentColor\"/>"
        },
        "close": {
            "body": "<path d=\"M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6H5z\" fill=\"currentColor\" transform=\"rotate(45)\"/>"
        },
        "minus": {
            "body": "<path d=\"M5 13v-1h13.01L18 13H5z\" fill=\"currentColor\"/>"
        },
        "volume": {
            "body": "<path d=\"M21 12.5a7.5 7.5 0 0 1-7 7.484V18.98A6.5 6.5 0 0 0 14 6.02V5.016a7.5 7.5 0 0 1 7 7.484zm-3 0a4.5 4.5 0 0 1-4 4.473v-1.008a3.501 3.501 0 0 0 0-6.93V8.027a4.5 4.5 0 0 1 4 4.473zm-3 0a1.5 1.5 0 0 1-1 1.415v-2.83a1.5 1.5 0 0 1 1 1.415zM2 9h4l4-4h2v15h-2l-4-4H2V9zm1 6h3.414l4 4H11V6h-.586l-4 4H3v5z\" fill=\"currentColor\"/>"
        },
        "volume-off": {
            "body": "<path d=\"M2.793 4.457L3.5 3.75L20.25 20.5l-.707.707l-2.241-2.24A7.455 7.455 0 0 1 14 19.983V18.98a6.463 6.463 0 0 0 2.568-.749l-1.51-1.51c-.335.125-.69.21-1.058.25v-1.007c.086-.013.17-.028.254-.046L12 13.663V20h-2l-4-4H2V9h4l.668-.668l-3.875-3.875zM21 12.5c0 2.03-.806 3.87-2.115 5.22l-.707-.707A6.5 6.5 0 0 0 14 6.02V5.016a7.5 7.5 0 0 1 7 7.484zm-3 0c0 1.2-.47 2.292-1.237 3.099l-.707-.708A3.5 3.5 0 0 0 14 9.035V8.027a4.5 4.5 0 0 1 4 4.473zm-3 0c0 .372-.136.713-.36.975l-.64-.64v-1.75a1.5 1.5 0 0 1 1 1.415zM6.414 10H3v5h3.414l4 4H11v-6.336L7.375 9.04l-.96.961zM10 5h2v5.836l-1-1V6h-.586L8.79 7.625l-.707-.707L10 5z\" fill=\"currentColor\"/>"
        },
        "eye": {
            "body": "<path d=\"M11.5 18c3.989 0 7.458-2.224 9.235-5.5A10.498 10.498 0 0 0 11.5 7a10.498 10.498 0 0 0-9.235 5.5A10.498 10.498 0 0 0 11.5 18zm0-12a11.5 11.5 0 0 1 10.36 6.5A11.5 11.5 0 0 1 11.5 19a11.5 11.5 0 0 1-10.36-6.5A11.5 11.5 0 0 1 11.5 6zm0 2a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9zm0 1a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7z\" fill=\"currentColor\"/>"
        },
        "microphone": {
            "body": "<path d=\"M11 21v-3.019A6.5 6.5 0 0 1 5 11.5V11h1v.5a5.5 5.5 0 1 0 11 0V11h1v.5a6.5 6.5 0 0 1-6 6.481V21h-1zm.5-18A2.5 2.5 0 0 1 14 5.5v6a2.5 2.5 0 0 1-5 0v-6A2.5 2.5 0 0 1 11.5 3zm0 1A1.5 1.5 0 0 0 10 5.5v6a1.5 1.5 0 0 0 3 0v-6A1.5 1.5 0 0 0 11.5 4z\" fill=\"currentColor\"/>"
        },
        "play": {
            "body": "<path d=\"M18.402 12.5L9 18.375L8 19V6l10.402 6.5zm-1.887 0L9 7.804v9.392l7.515-4.696z\" fill=\"currentColor\"/>"
        },
        "youtube": {
            "body": "<g fill=\"currentColor\"><path d=\"M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104l.022.26l.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105l-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006l-.087-.004l-.171-.007l-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103l.003-.052l.008-.104l.022-.26l.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007l.172-.006l.086-.003l.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z\"/></g>"
        },
        "twitter": {
            "body": "<g fill=\"currentColor\"><path d=\"M5.026 15c6.038 0 9.341-5.003 9.341-9.334c0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518a3.301 3.301 0 0 0 1.447-1.817a6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429a3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218a3.203 3.203 0 0 1-.865.115a3.23 3.23 0 0 1-.614-.057a3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z\"/></g>"
        },
        "linkedin": {
            "body": "<g fill=\"currentColor\"><path d=\"M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z\"/></g>"
        },
        "instagram": {
            "body": "<g fill=\"currentColor\"><path d=\"M8 0C5.829 0 5.556.01 4.703.048C3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7C.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297c.04.852.174 1.433.372 1.942c.205.526.478.972.923 1.417c.444.445.89.719 1.416.923c.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417c.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046c.78.035 1.204.166 1.486.275c.373.145.64.319.92.599c.28.28.453.546.598.92c.11.281.24.705.275 1.485c.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598c-.28.11-.704.24-1.485.276c-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598a2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485c-.038-.843-.046-1.096-.046-3.233c0-2.136.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486c.145-.373.319-.64.599-.92c.28-.28.546-.453.92-.598c.282-.11.705-.24 1.485-.276c.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92a.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217a4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334a2.667 2.667 0 0 1 0-5.334z\"/></g>"
        },
        "facebook": {
            "body": "<g fill=\"currentColor\"><path d=\"M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131c.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z\" fill=\"currentColor\"/>"
        },
        "pause": {
            "body": "<path d=\"M 14 18.167 L 14 0.833 L 19.333 0.833 L 19.333 18.167 L 14 18.167 Z  M 4.667 18.167 L 4.667 0.833 L 10 0.833 L 10 18.167 L 4.667 18.167 Z  M 6 2.167 L 6 16.833 L 8.667 16.833 L 8.667 2.167 L 6 2.167 Z  M 15.333 2.167 L 15.333 16.833 L 18 16.833 L 18 2.167 L 15.333 2.167 Z\" fill=\"currentColor\"/>"
        },
        "caption": {
           "body": "<path d=\"M3.708 7.755c0-1.111.488-1.753 1.319-1.753.681 0 1.138.47 1.186 1.107H7.36V7c-.052-1.186-1.024-2-2.342-2C3.414 5 2.5 6.05 2.5 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114H6.213c-.048.615-.496 1.05-1.186 1.05-.84 0-1.319-.62-1.319-1.727v-.743zm6.14 0c0-1.111.488-1.753 1.318-1.753.682 0 1.139.47 1.187 1.107H13.5V7c-.053-1.186-1.024-2-2.342-2C9.554 5 8.64 6.05 8.64 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.743z\"/><path d=\"M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z\"/>"
        },
        "no-caption": {
            "body": "<path d=\"M3.708 7.755c0-1.111.488-1.753 1.319-1.753.681 0 1.138.47 1.186 1.107H7.36V7c-.052-1.186-1.024-2-2.342-2C3.414 5 2.5 6.05 2.5 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114H6.213c-.048.615-.496 1.05-1.186 1.05-.84 0-1.319-.62-1.319-1.727v-.743zm6.14 0c0-1.111.488-1.753 1.318-1.753.682 0 1.139.47 1.187 1.107H13.5V7c-.053-1.186-1.024-2-2.342-2C9.554 5 8.64 6.05 8.64 7.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.743z\"/><path d=\"M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z\"/>"
        }
    },
    "width": 24,
    "height": 24
});

function Icons(props: any) {
  return <Icon icon={'em:' + props.icon} />
}

export default Icons;

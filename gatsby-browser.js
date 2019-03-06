exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (window.fathom) {
    window.fathom('trackPageview')
  }
}

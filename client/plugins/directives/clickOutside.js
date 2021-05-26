export default {
  bind: (el, binding) => {
    if (typeof binding.value === "function") {
      el.addEventListener("mousedown", stopProp);
      /**
       * Use requestAnimationFrame to make sure the mousedown event
       * triggering a creation of a bound component has time to propagate
       * before triggering the eventListener.
       */
      requestAnimFrame(() => {
        document.body.addEventListener("mousedown", binding.value);
      });
    }
  },
  unbind: (el, binding) => {
    el.removeEventListener("mousedown", stopProp);
    document.body.removeEventListener("mousedown", binding.value);
  },
};

function stopProp(event) {
  event.stopPropagation();
}

const requestAnimFrame =
  window.requestAnimationFrame ||
  /**
   * If requestAnimationFrame is not supported,
   * fallback to setTimeout at 60 FPS.
   */
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

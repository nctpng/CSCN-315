
    // Helper function to get query string parameters
    function getQueryParams() {
      return Object.fromEntries(new URLSearchParams(window.location.search));
    }

    // Helper to set cookies
    function setCookie(name, value, days = 30) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    }

    // Helper to get cookies
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      return parts.length === 2 ? parts.pop().split(';').shift() : null;
    }

    // Apply preferences to the page
    function applyPreferences(prefs) {
      if (prefs.bgColor) document.body.style.backgroundColor = prefs.bgColor;
      if (prefs.textColor) document.body.style.color = prefs.textColor;
      if (prefs.fontSize) document.body.style.fontSize = `${prefs.fontSize}px`;
    }

    // Get preferences from query or cookies
    function loadPreferences() {
      const params = getQueryParams();
      const prefs = {
        bgColor: params.bgColor || getCookie('bgColor'),
        textColor: params.textColor || getCookie('textColor'),
        fontSize: params.fontSize || getCookie('fontSize'),
      };

      // Save preferences in cookies
      if (params.bgColor) setCookie('bgColor', params.bgColor);
      if (params.textColor) setCookie('textColor', params.textColor);
      if (params.fontSize) setCookie('fontSize', params.fontSize);

      return prefs;
    }

    // Prefill form and apply settings on load
    window.onload = () => {
      const prefs = loadPreferences();
      document.querySelector('input[name="bgColor"]').value = prefs.bgColor || '#ffffff';
      document.querySelector('input[name="textColor"]').value = prefs.textColor || '#000000';
      document.querySelector('input[name="fontSize"]').value = prefs.fontSize || 16;
      applyPreferences(prefs);
    };

    // Handle form submission
    document.getElementById('customize-form').onsubmit = function(e) {
      e.preventDefault();
      const bgColor = this.bgColor.value;
      const textColor = this.textColor.value;
      const fontSize = this.fontSize.value;

      const queryString = `?bgColor=${encodeURIComponent(bgColor)}&textColor=${encodeURIComponent(textColor)}&fontSize=${encodeURIComponent(fontSize)}`;
      window.location.search = queryString; // triggers reload with new query string
    };


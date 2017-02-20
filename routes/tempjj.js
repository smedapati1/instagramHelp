TWTR = window.TWTR || {};
(function () {
  var A = 0;
  var D;
  var B = ["init", "setDimensions", "setRpp", "setFeatures", "setTweetInterval", "setBase", "setList", "setProfileImage", "setTitle", "setCaption", "setFooterText", "setTheme", "byClass", "render", "removeEvents", "clear", "start", "stop", "pause", "resume", "destroy"];

  function C(H) {
    var E = 0;
    var G;
    var F = ["The Twitter API v1.0 is deprecated, and this widget has ceased functioning.", "You can replace it with a new, upgraded widget from <https://twitter.com/settings/widgets/new/" + H + ">", "For more information on alternative Twitter tools, see <https://dev.twitter.com/docs/twitter-for-websites>"];
    if (!window.console) {
      return
    }
    for (; G = F[E]; E++) {
      if (console.warn) {
        console.warn("TWITTER WIDGET: " + G);
        continue
      }
      console.log(G)
    }
  }

  TWTR.Widget = function (E) {
    switch (E.type) {
      case"search":
        C("search?query=" + escape(E.search));
        break;
      case"profile":
        this._profile = true;
        break;
      case"list":
      case"lists":
        C("list");
        break;
      default:
        return
    }
  };
  TWTR.Widget.ify = {
    autoLink: function () {
      return {
        match: function () {
          return false
        }
      }
    }
  };
  TWTR.Widget.randomNumber = function () {
  };
  TWTR.Widget.prototype.isRunning = function () {
    return false
  };
  TWTR.Widget.prototype.setProfile = function (E) {
    C("user?screen_name=" + escape(E));
    return this
  };
  TWTR.Widget.prototype.setUser = function (E) {
    if (this._profile) {
      return this.setProfile(E)
    }
    C("favorites?screen_name=" + escape(E));
    return this
  };
  TWTR.Widget.prototype.setSearch = function (E) {
    C("search?query=" + escape(E));
    return this
  };
  for (; D = B[A]; A++) {
    TWTR.Widget.prototype[D] = function () {
      return this
    }
  }
})();
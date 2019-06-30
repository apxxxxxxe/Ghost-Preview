"use strict";
var _createClass = function () {
	function a(e, f) {
		for (var h, g = 0; g < f.length; g++) h = f[g], h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(e, h.key, h)
	}
	return function (e, f, g) {
		return f && a(e.prototype, f), g && a(e, g), e
	}
}();

function _classCallCheck(a, e) {
	if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function")
}
var TJScrollTask = function () {
		function a(e, f, g) {
			_classCallCheck(this, a), this.tjDeck = e, this.$t = e.$wrap, this.x = f, this.d = g, this.sl = e.wrapL, this.sTime = Date.now(), this.ended = !1, this._bindAnim = this._anim.bind(this);
			var h = e.getClms();
			0 > f || f > h[0].offsetWidth * (h.length - 1) ? this.ended = !0 : requestAnimationFrame(this._bindAnim)
		}
		return _createClass(a, [{
			key: "stop",
			value: function stop() {
				this.ended || (this.ended = !0, cancelAnimationFrame(this._bindAnim))
			}
		}, {
			key: "_anim",
			value: function _anim() {
				if (!this.ended) {
					var e = (Date.now() - this.sTime) / this.d,
						f = this.sl,
						g = this.x - this.sl;
					1 < e && !this.ended && (this.stop(), e = 1), this.tjDeck.scrollWrap(this._easeOut(e, f, g, 1)), 1 > e && requestAnimationFrame(this._bindAnim)
				}
			}
		}, {
			key: "_easeOut",
			value: function _easeOut(e, f, g, h) {
				return e /= h, --e, g * (e * e * e + 1) + f
			}
		}]), a
	}(),
	TJDeck = function () {
		function a() {
			_classCallCheck(this, a), this.version = "0.0.9", this.$wrap = document.querySelector(".js-app-columns"), this.wrapL = 0, this.scrollTask = null, this.options = this.getOptionObj(), this.setOptionFromObj(this.options), this.$options = this.createOptionPanel(), document.body.appendChild(this.$options), this.updateBlur(), this.updateLight()
		}
		return _createClass(a, [{
			key: "getOption",
			value: function getOption(e, f) {
				var g = localStorage.getItem("tj_deck_" + e);
				return g ? "true" == g : f
			}
		}, {
			key: "back",
			value: function back() {
				if ("none" != this.$options.style.display) return this.updateOption(), void this.hideOptionPanel();
				var e = document.querySelector(".mdl-dismiss");
				if (e) return void e.click();
				if (this.isShownDrawer()) return void this.hideDrawer();
				var f = this.getClosestColumn(this.wrapL),
					g = f.querySelector(".js-column-back");
				if (g) return void g.click()
			}
		}, {
			key: "hideDrawer",
			value: function hideDrawer() {
				var e = document.querySelector(".js-hide-drawer");
				e && e.click()
			}
		}]), a
	}();
window.tj_deck = null;

function tjDeckStart() {
	console.log("TJDeckスタート！！！"), window.tj_deck = new TJDeck, window.tj_deck.manageStyle(), window.tj_deck.manageScroll(), window.tj_deck.manageBack(), window.tj_deck.observeClms(), window.tj_deck.observeModals(), window.tj_deck.hideMenu(), window.tj_deck.addTJNav(), document.querySelector("textarea.js-compose-text").spellcheck = !1
}
if (document.querySelector(".js-app-columns")) tjDeckStart();
else var timer = setInterval(function () {
	document.querySelector(".js-app-columns") ? (tjDeckStart(), clearInterval(timer)) : console.log("まだロード中")
}, 500);
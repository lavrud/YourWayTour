if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function (t) {
    "use strict";
    var e = jQuery.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")
}(),
function (t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            };
        return !1
    }
    t.fn.emulateTransitionEnd = function (e) {
        var i = !1,
            o = this;
        return t(this).one("bsTransitionEnd", function () {
            i = !0
        }), setTimeout(function () {
            i || t(o).trigger(t.support.transition.end)
        }, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery),
function (t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        i = function (i) {
            t(i).on("click", e, this.close)
        };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 150, i.prototype.close = function (e) {
        function o() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var n = t(this),
            s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var r = t(s);
        e && e.preventDefault(), r.length || (r = n.closest(".alert")), r.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (r.removeClass("in"), t.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o())
    };
    var o = t.fn.alert;
    t.fn.alert = function (e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.alert");
            n || o.data("bs.alert", n = new i(this)), "string" == typeof e && n[e].call(o)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function () {
        return t.fn.alert = o, this
    }, t(document).on("click.bs.alert.data-api", e, i.prototype.close)
}(jQuery),
function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.button"),
                s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e)
        })
    }
    var i = function (e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1
    };
    i.VERSION = "3.3.2", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function (e) {
        var i = "disabled",
            o = this.$element,
            n = o.is("input") ? "val" : "html",
            s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function () {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") && (i.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")), t && i.prop("checked", !this.$element.hasClass("active")).trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        t && this.$element.toggleClass("active")
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = o, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), i.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery),
function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.carousel"),
                s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : r ? n[r]() : s.interval && n.pause().cycle()
        })
    }
    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e);
        if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap) return e;
        var o = (i + ("prev" == t ? -1 : 1)) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function (t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function (e, o) {
        var n = this.$element.find(".item.active"),
            s = o || this.getItemForDirection(e, n),
            r = this.interval,
            a = "next" == e ? "left" : "right",
            l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var c = s[0],
            d = t.Event("slide.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var h = t(this.$indicators.children()[this.getItemIndex(s)]);
                h && h.addClass("active")
            }
            var p = t.Event("slid.bs.carousel", {
                relatedTarget: c,
                direction: a
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), s[0].offsetWidth, n.addClass(a), s.addClass(a), n.one("bsTransitionEnd", function () {
                s.removeClass([e, a].join(" ")).addClass("active"), n.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(p)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(p)), r && this.cycle(), this
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = o, this
    };
    var n = function (i) {
        var o, n = t(this),
            s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var r = t.extend({}, s.data(), n.data()),
                a = n.attr("data-slide-to");
            a && (r.interval = !1), e.call(s, r), a && s.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery),
function (t) {
    "use strict";

    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this),
                n = i.data("bs.collapse"),
                s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && "show" == e && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), "string" == typeof e && n[e]()
        })
    }
    var o = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t(this.options.trigger).filter('[href="#' + e.id + '"], [data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    o.VERSION = "3.3.2", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0,
        trigger: '[data-toggle="collapse"]'
    }, o.prototype.dimension = function () {
        return this.$element.hasClass("width") ? "width" : "height"
    }, o.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse")) && e.transitioning)) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var r = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[r](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", r].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[r](this.$element[0][l])
                }
            }
        }
    }, o.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this)
            }
        }
    }, o.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, o.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n)
        }, this)).end()
    }, o.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = n, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n),
            r = s.data("bs.collapse") ? "toggle" : t.extend({}, n.data(), {
                trigger: this
            });
        i.call(s, r)
    })
}(jQuery),
function (t) {
    "use strict";

    function e(e) {
        e && 3 === e.which || (t(o).remove(), t(n).each(function () {
            var o = t(this),
                n = i(o),
                s = {
                    relatedTarget: this
                };
            n.hasClass("open") && (n.trigger(e = t.Event("hide.bs.dropdown", s)), e.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger("hidden.bs.dropdown", s)))
        }))
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent()
    }
    var o = ".dropdown-backdrop",
        n = '[data-toggle="dropdown"]',
        s = function (e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    s.VERSION = "3.3.2", s.prototype.toggle = function (o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = i(n),
                r = s.hasClass("open");
            if (e(), !r) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e);
                var a = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", a)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger("shown.bs.dropdown", a)
            }
            return !1
        }
    }, s.prototype.keydown = function (e) {
        if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var o = t(this);
            if (e.preventDefault(), e.stopPropagation(), !o.is(".disabled, :disabled")) {
                var s = i(o),
                    r = s.hasClass("open");
                if (!r && 27 != e.which || r && 27 == e.which) return 27 == e.which && s.find(n).trigger("focus"), o.trigger("click");
                var a = " li:not(.divider):visible a",
                    l = s.find('[role="menu"]' + a + ', [role="listbox"]' + a);
                if (l.length) {
                    var c = l.index(e.target);
                    38 == e.which && c > 0 && c--, 40 == e.which && c < l.length - 1 && c++, ~c || (c = 0), l.eq(c).trigger("focus")
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = function (e) {
        return this.each(function () {
            var i = t(this),
                o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new s(this)), "string" == typeof e && o[e].call(i)
        })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = r, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", n, s.prototype.toggle).on("keydown.bs.dropdown.data-api", n, s.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="menu"]', s.prototype.keydown).on("keydown.bs.dropdown.data-api", '[role="listbox"]', s.prototype.keydown)
}(jQuery),
function (t) {
    "use strict";

    function e(e, o) {
        return this.each(function () {
            var n = t(this),
                s = n.data("bs.modal"),
                r = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, r)), "string" == typeof e ? s[e](o) : r.show && s.show(o)
        })
    }
    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var o = this,
            n = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function () {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), o.options.backdrop && o.adjustBackdrop(), o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in").attr("aria-hidden", !1), o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$element.find(".modal-dialog").one("bsTransitionEnd", function () {
                o.$element.trigger("focus").trigger(s)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var o = this,
            n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t('<div class="modal-backdrop ' + n + '" />').prependTo(this.$element).on("click.dismiss.bs.modal", t.proxy(function (t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var r = function () {
                o.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", r).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : r()
        } else e && e()
    }, i.prototype.handleUpdate = function () {
        this.options.backdrop && this.adjustBackdrop(), this.adjustDialog()
    }, i.prototype.adjustBackdrop = function () {
        this.$backdrop.css("height", 0).css("height", this.$element[0].scrollHeight)
    }, i.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function () {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, i.prototype.checkScrollbar = function () {
        this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", "")
    }, i.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = o, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var o = t(this),
            n = o.attr("href"),
            s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            r = s.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(n) && n
            }, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function () {
                o.is(":visible") && o.trigger("focus")
            })
        }), e.call(s, r, this)
    })
}(jQuery),
function (t) {
    "use strict";
    var e = function (t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    e.VERSION = "3.3.2", e.TRANSITION_DURATION = 150, e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, e.prototype.init = function (e, i, o) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focusin",
                    l = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function () {
        return e.DEFAULTS
    }, e.prototype.getOptions = function (e) {
        return (e = t.extend({}, this.getDefaults(), this.$element.data(), e)).delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function () {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function (t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, e.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i && i.$tip && i.$tip.is(":visible") ? void(i.hoverState = "in") : (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, e.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, e.prototype.show = function () {
        var i = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(i);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (i.isDefaultPrevented() || !o) return;
            var n = this,
                s = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i,
                c = l.test(a);
            c && (a = a.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element);
            var d = this.getPosition(),
                h = s[0].offsetWidth,
                p = s[0].offsetHeight;
            if (c) {
                var u = a,
                    f = this.options.container ? t(this.options.container) : this.$element.parent(),
                    m = this.getPosition(f);
                a = "bottom" == a && d.bottom + p > m.bottom ? "top" : "top" == a && d.top - p < m.top ? "bottom" : "right" == a && d.right + h > m.width ? "left" : "left" == a && d.left - h < m.left ? "right" : a, s.removeClass(u).addClass(a)
            }
            var g = this.getCalculatedOffset(a, d, h, p);
            this.applyPlacement(g, a);
            var v = function () {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(e.TRANSITION_DURATION) : v()
        }
    }, e.prototype.applyPlacement = function (e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            r = parseInt(o.css("margin-top"), 10),
            a = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), e.top = e.top + r, e.left = e.left + a, t.offset.setOffset(o[0], t.extend({
            using: function (t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth,
            c = o[0].offsetHeight;
        "top" == i && c != s && (e.top = e.top + s - c);
        var d = this.getViewportAdjustedDelta(i, e, l, c);
        d.left ? e.left += d.left : e.top += d.top;
        var h = /top|bottom/.test(i),
            p = h ? 2 * d.left - n + l : 2 * d.top - s + c,
            u = h ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(p, o[0][u], h)
    }, e.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, e.prototype.setContent = function () {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function (i) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), i && i()
        }
        var n = this,
            s = this.tip(),
            r = t.Event("hide.bs." + this.type);
        return this.$element.trigger(r), r.isDefaultPrevented() ? void 0 : (s.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(e.TRANSITION_DURATION) : o(), this.hoverState = null, this)
    }, e.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function () {
        return this.getTitle()
    }, e.prototype.getPosition = function (e) {
        var i = (e = e || this.$element)[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = o ? {
                top: 0,
                left: 0
            } : e.offset(),
            r = {
                scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            a = o ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, r, a, s)
    }, e.prototype.getCalculatedOffset = function (t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, e.prototype.getViewportAdjustedDelta = function (t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - s - r.scroll,
                l = e.top + s - r.scroll + o;
            a < r.top ? n.top = r.top - a : l > r.top + r.height && (n.top = r.top + r.height - l)
        } else {
            var c = e.left - s,
                d = e.left + s + i;
            c < r.left ? n.left = r.left - c : d > r.width && (n.left = r.left + r.width - d)
        }
        return n
    }, e.prototype.getTitle = function () {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, e.prototype.getUID = function (t) {
        do {
            t += ~~(1e6 * Math.random())
        } while (document.getElementById(t));
        return t
    }, e.prototype.tip = function () {
        return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.enable = function () {
        this.enabled = !0
    }, e.prototype.disable = function () {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function (e) {
        var i = this;
        e && ((i = t(e.currentTarget).data("bs." + this.type)) || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type)
        })
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function (i) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof i && i;
            (n || "destroy" != i) && (n || o.data("bs.tooltip", n = new e(this, s)), "string" == typeof i && n[i]())
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = i, this
    }
}(jQuery),
function (t) {
    "use strict";
    var e = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.3.2", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), (e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype)).constructor = e, e.prototype.getDefaults = function () {
        return e.DEFAULTS
    }, e.prototype.setContent = function () {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function () {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, e.prototype.tip = function () {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var i = t.fn.popover;
    t.fn.popover = function (i) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.popover"),
                s = "object" == typeof i && i;
            (n || "destroy" != i) && (n || o.data("bs.popover", n = new e(this, s)), "string" == typeof i && n[i]())
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function () {
        return t.fn.popover = i, this
    }
}(jQuery),
function (t) {
    "use strict";

    function e(i, o) {
        var n = t.proxy(this.process, this);
        this.$body = t("body"), this.$scrollElement = t(t(i).is("body") ? window : i), this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", n), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.scrollspy"),
                s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }
    e.VERSION = "3.3.2", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = "offset",
            i = 0;
        t.isWindow(this.$scrollElement[0]) || (e = "position", i = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var o = this;
        this.$body.find(this.selector).map(function () {
            var o = t(this),
                n = o.data("target") || o.attr("href"),
                s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [[s[e]().top + i, n]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            o.offsets.push(this[0]), o.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            o = this.options.offset + i - this.$scrollElement.height(),
            n = this.offsets,
            s = this.targets,
            r = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return r != (t = s[s.length - 1]) && this.activate(t);
        if (r && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--;) r != s[t] && e >= n[t] && (!n[t + 1] || e <= n[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), o.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = o, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery),
function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]()
        })
    }
    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.2", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"),
                s = t.Event("hide.bs.tab", {
                    relatedTarget: e[0]
                }),
                r = t.Event("show.bs.tab", {
                    relatedTarget: n[0]
                });
            if (n.trigger(s), e.trigger(r), !r.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var a = t(o);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, o, n) {
        function s() {
            r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), n && n()
        }
        var r = o.find("> .active"),
            a = n && t.support.transition && (r.length && r.hasClass("fade") || !!o.find("> .fade").length);
        r.length && a ? r.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), r.removeClass("in")
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = o, this
    };
    var n = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n)
}(jQuery),
function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var o = t(this),
                n = o.data("bs.affix"),
                s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]()
        })
    }
    var i = function (e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.2", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, o) {
        var n = this.$target.scrollTop(),
            s = this.$element.offset(),
            r = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n && "top";
        if ("bottom" == this.affixed) return null != i ? !(n + this.unpin <= s.top) && "bottom" : !(t - o >= n + r) && "bottom";
        var a = null == this.affixed,
            l = a ? n : s.top;
        return null != i && i >= n ? "top" : null != o && l + (a ? r : e) >= t - o && "bottom"
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(),
                o = this.options.offset,
                n = o.top,
                s = o.bottom,
                r = t("body").height();
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), "function" == typeof s && (s = o.bottom(this.$element));
            var a = this.getState(r, e, n, s);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""),
                    c = t.Event(l + ".bs.affix");
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: r - e - s
            })
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = o, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this),
                o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o)
        })
    })
}(jQuery),
function (t) {
    var e = function (e, i) {
        this.options = i;
        var o = t(e),
            n = o.is("img"),
            s = n ? o.attr("src") : o.backgroundImageUrl(),
            s = this.options.generateUrl(o, s);
        t("<img/>").attr("src", s).load(function () {
            n ? o.attr("src", t(this).attr("src")) : (o.backgroundImageUrl(t(this).attr("src")), o.backgroundSize(t(this)[0].width, t(this)[0].height)), o.attr("data-retina", "complete")
        })
    };
    e.prototype = {
        constructor: e
    }, t.fn.retinaReplace = function (i) {
        return 1 >= (void 0 === window.devicePixelRatio ? 1 : window.devicePixelRatio) ? this : this.each(function () {
            var o = t(this),
                n = o.data("retinaReplace"),
                s = t.extend({}, t.fn.retinaReplace.defaults, o.data(), "object" == typeof i && i);
            n || o.data("retinaReplace", n = new e(this, s)), "string" == typeof i && n[i]()
        })
    }, t.fn.retinaReplace.defaults = {
        suffix: "_2x",
        generateUrl: function (t, e) {
            var i = e.lastIndexOf("."),
                o = e.substr(i + 1);
            return e.substr(0, i) + this.suffix + "." + o
        }
    }, t.fn.retinaReplace.Constructor = e, t.fn.backgroundImageUrl = function (e) {
        return e ? this.each(function () {
            t(this).css("background-image", 'url("' + e + '")')
        }) : t(this).css("background-image").replace(/url\(|\)|"|'/g, "")
    }, t.fn.backgroundSize = function (e, i) {
        var o = Math.floor(e / 2) + "px " + Math.floor(i / 2) + "px";
        t(this).css("background-size", o), t(this).css("-webkit-background-size", o)
    }, t(function () {
        t("[data-retina='true']").retinaReplace()
    })
}(window.jQuery),
function (t, e, i, o) {
    function n(e, i) {
        var s = this;
        "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this, i)), this.$element = t(e), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var r = (this.position + "").toLowerCase().match(/\S+/g) || [];
        return r.length < 1 && r.push("center"), 1 == r.length && r.push(r[0]), "top" == r[0] || "bottom" == r[0] || "left" == r[1] || "right" == r[1] ? (s.positionX = r[1], s.positionY = r[0]) : (s.positionX = r[0], s.positionY = r[1]), this.positionX != o && (r[0] = this.positionX.toLowerCase()), this.positionY != o && (r[1] = this.positionY.toLowerCase()), "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? (this.iosFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this) : navigator.userAgent.match(/(Android)/) ? (this.androidFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this) : (this.$mirror = t("<div />").prependTo("body"), this.$slider = t("<img />").prependTo(this.$mirror), this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }), this.$slider.addClass("parallax-slider").one("load", function () {
            s.naturalHeight && s.naturalWidth || (s.naturalHeight = this.naturalHeight || this.height || 1, s.naturalWidth = this.naturalWidth || this.width || 1), s.aspectRatio = s.naturalWidth / s.naturalHeight, n.isSetup || n.setup(), n.sliders.push(s), n.isFresh = !1, n.requestRender()
        }), this.$slider[0].src = this.imageSrc, void((this.naturalHeight && this.naturalWidth || this.$slider[0].complete) && this.$slider.trigger("load")))
    }! function () {
        for (var t = 0, i = ["ms", "moz", "webkit", "o"], o = 0; o < i.length && !e.requestAnimationFrame; ++o) e.requestAnimationFrame = e[i[o] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[o] + "CancelAnimationFrame"] || e[i[o] + "CancelRequestAnimationFrame"];
        e.requestAnimationFrame || (e.requestAnimationFrame = function (i) {
            var o = (new Date).getTime(),
                n = Math.max(0, 16 - (o - t)),
                s = e.setTimeout(function () {
                    i(o + n)
                }, n);
            return t = o + n, s
        }), e.cancelAnimationFrame || (e.cancelAnimationFrame = function (t) {
            clearTimeout(t)
        })
    }(), t.extend(n.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        overScrollFix: !0,
        refresh: function () {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var t = n.winHeight,
                e = n.docHeight,
                i = Math.min(this.boxOffsetTop, e - t),
                o = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
                s = this.boxHeight + (i - o) * (1 - this.speed) | 0,
                r = (this.boxOffsetTop - i) * (1 - this.speed) | 0;
            if (s * this.aspectRatio >= this.boxWidth) this.imageWidth = s * this.aspectRatio | 0, this.imageHeight = s, this.offsetBaseTop = r, a = this.imageWidth - this.boxWidth, this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -a : isNaN(this.positionX) ? -a / 2 | 0 : Math.max(this.positionX, -a);
            else {
                this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0;
                var a = this.imageHeight - s;
                this.offsetBaseTop = "top" == this.positionY ? r : "bottom" == this.positionY ? r - a : isNaN(this.positionY) ? r - a / 2 | 0 : r + Math.max(this.positionY, -a)
            }
        },
        render: function () {
            var t = n.scrollTop,
                e = n.scrollLeft,
                i = this.overScrollFix ? n.overScroll : 0,
                o = t + n.winHeight;
            this.visibility = this.boxOffsetBottom > t && this.boxOffsetTop < o ? "visible" : "hidden", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - e, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed), this.$mirror.css({
                visibility: this.visibility,
                top: this.mirrorTop - i,
                left: this.mirrorLeft,
                height: this.boxHeight,
                width: this.boxWidth
            }), this.$slider.css({
                position: "absolute",
                top: this.offsetTop,
                left: this.offsetLeft,
                height: this.imageHeight,
                width: this.imageWidth
            })
        }
    }), t.extend(n, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function () {
            if (!this.isReady) {
                var o = t(i),
                    s = t(e);
                s.on("scroll.px.parallax load.px.parallax", function () {
                    var t = n.docHeight - n.winHeight,
                        e = n.docWidth - n.winWidth;
                    n.scrollTop = Math.max(0, Math.min(t, s.scrollTop())), n.scrollLeft = Math.max(0, Math.min(e, s.scrollLeft())), n.overScroll = Math.max(s.scrollTop() - t, Math.min(s.scrollTop(), 0)), n.requestRender()
                }).on("resize.px.parallax load.px.parallax", function () {
                    n.winHeight = s.height(), n.winWidth = s.width(), n.docHeight = o.height(), n.docWidth = o.width(), n.isFresh = !1, n.requestRender()
                }), this.isReady = !0
            }
        },
        configure: function (e) {
            "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this.prototype, e))
        },
        refresh: function () {
            t.each(this.sliders, function () {
                this.refresh()
            }), this.isFresh = !0
        },
        render: function () {
            this.isFresh || this.refresh(), t.each(this.sliders, function () {
                this.render()
            })
        },
        requestRender: function () {
            var t = this;
            this.isBusy || (this.isBusy = !0, e.requestAnimationFrame(function () {
                t.render(), t.isBusy = !1
            }))
        }
    });
    var s = t.fn.parallax;
    t.fn.parallax = function (o) {
        return this.each(function () {
            var s = t(this),
                r = "object" == typeof o && o;
            this == e || this == i || s.is("body") ? n.configure(r) : s.data("px.parallax") || (r = t.extend({}, s.data(), r), s.data("px.parallax", new n(this, r))), "string" == typeof o && n[o]()
        })
    }, t.fn.parallax.Constructor = n, t.fn.parallax.noConflict = function () {
        return t.fn.parallax = s, this
    }, t(i).on("ready.px.parallax.data-api", function () {
        t('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document),
function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (t) {
    var e, i, o, n, s, r, a = "Close",
        l = "BeforeClose",
        c = "MarkupParse",
        d = "Open",
        h = "Change",
        p = "mfp",
        u = "." + p,
        f = "mfp-ready",
        m = "mfp-removing",
        g = "mfp-prevent-close",
        v = function () {},
        b = !!window.jQuery,
        y = t(window),
        w = function (t, i) {
            e.ev.on(p + t + u, i)
        },
        C = function (e, i, o, n) {
            var s = document.createElement("div");
            return s.className = "mfp-" + e, o && (s.innerHTML = o), n ? i && i.appendChild(s) : (s = t(s), i && s.appendTo(i)), s
        },
        x = function (i, o) {
            e.ev.triggerHandler(p + i, o), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(o) ? o : [o]))
        },
        T = function (i) {
            return i === r && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), r = i), e.currTemplate.closeBtn
        },
        $ = function () {
            t.magnificPopup.instance || ((e = new v).init(), t.magnificPopup.instance = e)
        },
        I = function () {
            var t = document.createElement("p").style,
                e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition) return !0;
            for (; e.length;)
                if (e.pop() + "Transition" in t) return !0;
            return !1
        };
    v.prototype = {
        constructor: v,
        init: function () {
            var i = navigator.appVersion;
            e.isIE7 = -1 !== i.indexOf("MSIE 7."), e.isIE8 = -1 !== i.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = I(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = t(document), e.popupsCache = {}
        },
        open: function (i) {
            var n;
            if (!1 === i.isObj) {
                e.items = i.items.toArray(), e.index = 0;
                var r, a = i.items;
                for (n = 0; n < a.length; n++)
                    if ((r = a[n]).parsed && (r = r.el[0]), r === i.el[0]) {
                        e.index = n;
                        break
                    }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
            if (!e.isOpen) {
                e.types = [], s = "", e.ev = i.mainEl && i.mainEl.length ? i.mainEl.eq(0) : o, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = C("bg").on("click" + u, function () {
                    e.close()
                }), e.wrap = C("wrap").attr("tabindex", -1).on("click" + u, function (t) {
                    e._checkIfClose(t.target) && e.close()
                }), e.container = C("container", e.wrap)), e.contentContainer = C("content"), e.st.preloader && (e.preloader = C("preloader", e.container, e.st.tLoading));
                var l = t.magnificPopup.modules;
                for (n = 0; n < l.length; n++) {
                    var h = l[n];
                    h = h.charAt(0).toUpperCase() + h.slice(1), e["init" + h].call(e)
                }
                x("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (w(c, function (t, e, i, o) {
                    i.close_replaceWith = T(o.type)
                }), s += " mfp-close-btn-in") : e.wrap.append(T())), e.st.alignTop && (s += " mfp-align-top"), e.wrap.css(e.fixedContentPos ? {
                    overflow: e.st.overflowY,
                    overflowX: "hidden",
                    overflowY: e.st.overflowY
                } : {
                    top: y.scrollTop(),
                    position: "absolute"
                }), (!1 === e.st.fixedBgPos || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                    height: o.height(),
                    position: "absolute"
                }), e.st.enableEscapeKey && o.on("keyup" + u, function (t) {
                    27 === t.keyCode && e.close()
                }), y.on("resize" + u, function () {
                    e.updateSize()
                }), e.st.closeOnContentClick || (s += " mfp-auto-cursor"), s && e.wrap.addClass(s);
                var p = e.wH = y.height(),
                    m = {};
                if (e.fixedContentPos && e._hasScrollBar(p)) {
                    var g = e._getScrollbarSize();
                    g && (m.marginRight = g)
                }
                e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : m.overflow = "hidden");
                var v = e.st.mainClass;
                return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), x("BuildControls"), t("html").css(m), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
                    e.content ? (e._addClassToMFP(f), e._setFocus()) : e.bgOverlay.addClass(f), o.on("focusin" + u, e._onFocusIn)
                }, 16), e.isOpen = !0, e.updateSize(p), x(d), i
            }
            e.updateItemHTML()
        },
        close: function () {
            e.isOpen && (x(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(m), setTimeout(function () {
                e._close()
            }, e.st.removalDelay)) : e._close())
        },
        _close: function () {
            x(a);
            var i = m + " " + f + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var n = {
                    marginRight: ""
                };
                e.isIE7 ? t("body, html").css("overflow", "") : n.overflow = "", t("html").css(n)
            }
            o.off("keyup.mfp focusin" + u), e.ev.off(u), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && !0 !== e.currTemplate[e.currItem.type] || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, x("AfterClose")
        },
        updateSize: function (t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    o = window.innerHeight * i;
                e.wrap.css("height", o), e.wH = o
            } else e.wH = t || y.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), x("Resize")
        },
        updateItemHTML: function () {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var o = i.type;
            if (x("BeforeChange", [e.currItem ? e.currItem.type : "", o]), e.currItem = i, !e.currTemplate[o]) {
                var s = !!e.st[o] && e.st[o].markup;
                x("FirstMarkupParse", s), e.currTemplate[o] = !s || t(s)
            }
            n && n !== i.type && e.container.removeClass("mfp-" + n + "-holder");
            var r = e["get" + o.charAt(0).toUpperCase() + o.slice(1)](i, e.currTemplate[o]);
            e.appendContent(r, o), i.preloaded = !0, x(h, i), n = i.type, e.container.prepend(e.contentContainer), x("AfterChange")
        },
        appendContent: function (t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && !0 === e.currTemplate[i] ? e.content.find(".mfp-close").length || e.content.append(T()) : e.content = t : e.content = "", x("BeforeAppend"), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        },
        parseEl: function (i) {
            var o, n = e.items[i];
            if (n.tagName ? n = {
                    el: t(n)
                } : (o = n.type, n = {
                    data: n,
                    src: n.src
                }), n.el) {
                for (var s = e.types, r = 0; r < s.length; r++)
                    if (n.el.hasClass("mfp-" + s[r])) {
                        o = s[r];
                        break
                    }
                n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
            }
            return n.type = o || e.st.type || "inline", n.index = i, n.parsed = !0, e.items[i] = n, x("ElementParse", n), e.items[i]
        },
        addGroup: function (t, i) {
            var o = function (o) {
                o.mfpEl = this, e._openClick(o, t, i)
            };
            i || (i = {});
            var n = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, o)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, o) : (i.items = t, t.off(n).on(n, o)))
        },
        _openClick: function (i, o, n) {
            if ((void 0 !== n.midClick ? n.midClick : t.magnificPopup.defaults.midClick) || 2 !== i.which && !i.ctrlKey && !i.metaKey) {
                var s = void 0 !== n.disableOn ? n.disableOn : t.magnificPopup.defaults.disableOn;
                if (s)
                    if (t.isFunction(s)) {
                        if (!s.call(e)) return !0
                    } else if (y.width() < s) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), n.el = t(i.mfpEl), n.delegate && (n.items = o.find(n.delegate)), e.open(n)
            }
        },
        updateStatus: function (t, o) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), o || "loading" !== t || (o = e.st.tLoading);
                var n = {
                    status: t,
                    text: o
                };
                x("UpdateStatus", n), t = n.status, o = n.text, e.preloader.html(o), e.preloader.find("a").on("click", function (t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        },
        _checkIfClose: function (i) {
            if (!t(i).hasClass(g)) {
                var o = e.st.closeOnContentClick,
                    n = e.st.closeOnBgClick;
                if (o && n) return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (o) return !0
                } else if (n && t.contains(document, i)) return !0;
                return !1
            }
        },
        _addClassToMFP: function (t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        },
        _removeClassFromMFP: function (t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        },
        _hasScrollBar: function (t) {
            return (e.isIE7 ? o.height() : document.body.scrollHeight) > (t || y.height())
        },
        _setFocus: function () {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        },
        _onFocusIn: function (i) {
            return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
        },
        _parseMarkup: function (e, i, o) {
            var n;
            o.data && (i = t.extend(o.data, i)), x(c, [e, i, o]), t.each(i, function (t, i) {
                if (void 0 === i || !1 === i) return !0;
                if ((n = t.split("_")).length > 1) {
                    var o = e.find(u + "-" + n[0]);
                    if (o.length > 0) {
                        var s = n[1];
                        "replaceWith" === s ? o[0] !== i[0] && o.replaceWith(i) : "img" === s ? o.is("img") ? o.attr("src", i) : o.replaceWith('<img src="' + i + '" class="' + o.attr("class") + '" />') : o.attr(n[1], i)
                    }
                } else e.find(u + "-" + t).html(i)
            })
        },
        _getScrollbarSize: function () {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: v.prototype,
        modules: [],
        open: function (e, i) {
            return $(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function () {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function (e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, t.fn.magnificPopup = function (i) {
        $();
        var o = t(this);
        if ("string" == typeof i)
            if ("open" === i) {
                var n, s = b ? o.data("magnificPopup") : o[0].magnificPopup,
                    r = parseInt(arguments[1], 10) || 0;
                s.items ? n = s.items[r] : (n = o, s.delegate && (n = n.find(s.delegate)), n = n.eq(r)), e._openClick({
                    mfpEl: n
                }, o, s)
            } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1));
        else i = t.extend(!0, {}, i), b ? o.data("magnificPopup", i) : o[0].magnificPopup = i, e.addGroup(o, i);
        return o
    };
    var S, k, E, O = "inline",
        A = function () {
            E && (k.after(E.addClass(S)).detach(), E = null)
        };
    t.magnificPopup.registerModule(O, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function () {
                e.types.push(O), w(a + "." + O, function () {
                    A()
                })
            },
            getInline: function (i, o) {
                if (A(), i.src) {
                    var n = e.st.inline,
                        s = t(i.src);
                    if (s.length) {
                        var r = s[0].parentNode;
                        r && r.tagName && (k || (S = n.hiddenClass, k = C(S), S = "mfp-" + S), E = s.after(k).detach().removeClass(S)), e.updateStatus("ready")
                    } else e.updateStatus("error", n.tNotFound), s = t("<div>");
                    return i.inlineElement = s, s
                }
                return e.updateStatus("ready"), e._parseMarkup(o, {}, i), o
            }
        }
    });
    var N, P = "ajax",
        D = function () {
            N && t(document.body).removeClass(N)
        },
        R = function () {
            D(), e.req && e.req.abort()
        };
    t.magnificPopup.registerModule(P, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function () {
                e.types.push(P), N = e.st.ajax.cursor, w(a + "." + P, R), w("BeforeChange." + P, R)
            },
            getAjax: function (i) {
                N && t(document.body).addClass(N), e.updateStatus("loading");
                var o = t.extend({
                    url: i.src,
                    success: function (o, n, s) {
                        var r = {
                            data: o,
                            xhr: s
                        };
                        x("ParseAjax", r), e.appendContent(t(r.data), P), i.finished = !0, D(), e._setFocus(), setTimeout(function () {
                            e.wrap.addClass(f)
                        }, 16), e.updateStatus("ready"), x("AjaxContentAdded")
                    },
                    error: function () {
                        D(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(o), ""
            }
        }
    });
    var _, H = function (i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var o = e.st.image.titleSrc;
        if (o) {
            if (t.isFunction(o)) return o.call(e, i);
            if (i.el) return i.el.attr(o) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function () {
                var i = e.st.image,
                    o = ".image";
                e.types.push("image"), w(d + o, function () {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), w(a + o, function () {
                    i.cursor && t(document.body).removeClass(i.cursor), y.off("resize" + u)
                }), w("Resize" + o, e.resizeImage), e.isLowIE && w("AfterChange", e.resizeImage)
            },
            resizeImage: function () {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            },
            _onImageHasSize: function (t) {
                t.img && (t.hasSize = !0, _ && clearInterval(_), t.isCheckingImgSize = !1, x("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            },
            findImageSize: function (t) {
                var i = 0,
                    o = t.img[0],
                    n = function (s) {
                        _ && clearInterval(_), _ = setInterval(function () {
                            return o.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(_), void(3 == ++i ? n(10) : 40 === i ? n(50) : 100 === i && n(500)))
                        }, s)
                    };
                n(1)
            },
            getImage: function (i, o) {
                var n = 0,
                    s = function () {
                        i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, x("ImageLoadComplete")) : 200 > ++n ? setTimeout(s, 100) : r())
                    },
                    r = function () {
                        i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                    },
                    a = e.st.image,
                    l = o.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = t(c).on("load.mfploader", s).on("error.mfploader", r), c.src = i.src, l.is("img") && (i.img = i.img.clone()), (c = i.img[0]).naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
                }
                return e._parseMarkup(o, {
                    title: H(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (_ && clearInterval(_), i.loadError ? (o.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (o.removeClass("mfp-loading"), e.updateStatus("ready")), o) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, o.addClass("mfp-loading"), e.findImageSize(i)), o)
            }
        }
    });
    var M, F = function () {
        return void 0 === M && (M = void 0 !== document.createElement("p").style.MozTransform), M
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (t) {
                return t.is("img") ? t : t.find("img")
            }
        },
        proto: {
            initZoom: function () {
                var t, i = e.st.zoom,
                    o = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var n, s, r = i.duration,
                        c = function (t) {
                            var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                o = "all " + i.duration / 1e3 + "s " + i.easing,
                                n = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                s = "transition";
                            return n["-webkit-" + s] = n["-moz-" + s] = n["-o-" + s] = n[s] = o, e.css(n), e
                        },
                        d = function () {
                            e.content.css("visibility", "visible")
                        };
                    w("BuildControls" + o, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(n), e.content.css("visibility", "hidden"), !(t = e._getItemToZoom())) return void d();
                            (s = c(t)).css(e._getOffset()), e.wrap.append(s), n = setTimeout(function () {
                                s.css(e._getOffset(!0)), n = setTimeout(function () {
                                    d(), setTimeout(function () {
                                        s.remove(), t = s = null, x("ZoomAnimationEnded")
                                    }, 16)
                                }, r)
                            }, 16)
                        }
                    }), w(l + o, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(n), e.st.removalDelay = r, !t) {
                                if (!(t = e._getItemToZoom())) return;
                                s = c(t)
                            }
                            s.css(e._getOffset(!0)), e.wrap.append(s), e.content.css("visibility", "hidden"), setTimeout(function () {
                                s.css(e._getOffset())
                            }, 16)
                        }
                    }), w(a + o, function () {
                        e._allowZoom() && (d(), s && s.remove(), t = null)
                    })
                }
            },
            _allowZoom: function () {
                return "image" === e.currItem.type
            },
            _getItemToZoom: function () {
                return !!e.currItem.hasSize && e.currItem.img
            },
            _getOffset: function (i) {
                var o, n = (o = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem)).offset(),
                    s = parseInt(o.css("padding-top"), 10),
                    r = parseInt(o.css("padding-bottom"), 10);
                n.top -= t(window).scrollTop() - s;
                var a = {
                    width: o.width(),
                    height: (b ? o.innerHeight() : o[0].offsetHeight) - r - s
                };
                return F() ? a["-moz-transform"] = a.transform = "translate(" + n.left + "px," + n.top + "px)" : (a.left = n.left, a.top = n.top), a
            }
        }
    });
    var L = "iframe",
        z = function (t) {
            if (e.currTemplate[L]) {
                var i = e.currTemplate[L].find("iframe");
                i.length && (t || (i[0].src = "//about:blank"), e.isIE8 && i.css("display", t ? "block" : "none"))
            }
        };
    t.magnificPopup.registerModule(L, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function () {
                e.types.push(L), w("BeforeChange", function (t, e, i) {
                    e !== i && (e === L ? z() : i === L && z(!0))
                }), w(a + "." + L, function () {
                    z()
                })
            },
            getIframe: function (i, o) {
                var n = i.src,
                    s = e.st.iframe;
                t.each(s.patterns, function () {
                    return n.indexOf(this.index) > -1 ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1) : void 0
                });
                var r = {};
                return s.srcAction && (r[s.srcAction] = n), e._parseMarkup(o, r, i), e.updateStatus("ready"), o
            }
        }
    });
    var j = function (t) {
            var i = e.items.length;
            return t > i - 1 ? t - i : 0 > t ? i + t : t
        },
        B = function (t, e, i) {
            return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
        };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function () {
                var i = e.st.gallery,
                    n = ".mfp-gallery",
                    r = Boolean(t.fn.mfpFastClick);
                return e.direction = !0, !(!i || !i.enabled) && (s += " mfp-gallery", w(d + n, function () {
                    i.navigateByImgClick && e.wrap.on("click" + n, ".mfp-img", function () {
                        return e.items.length > 1 ? (e.next(), !1) : void 0
                    }), o.on("keydown" + n, function (t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), w("UpdateStatus" + n, function (t, i) {
                    i.text && (i.text = B(i.text, e.currItem.index, e.items.length))
                }), w(c + n, function (t, o, n, s) {
                    var r = e.items.length;
                    n.counter = r > 1 ? B(i.tCounter, s.index, r) : ""
                }), w("BuildControls" + n, function () {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var o = i.arrowMarkup,
                            n = e.arrowLeft = t(o.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(g),
                            s = e.arrowRight = t(o.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(g),
                            a = r ? "mfpFastClick" : "click";
                        n[a](function () {
                            e.prev()
                        }), s[a](function () {
                            e.next()
                        }), e.isIE7 && (C("b", n[0], !1, !0), C("a", n[0], !1, !0), C("b", s[0], !1, !0), C("a", s[0], !1, !0)), e.container.append(n.add(s))
                    }
                }), w(h + n, function () {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void w(a + n, function () {
                    o.off(n), e.wrap.off("click" + n), e.arrowLeft && r && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), e.arrowRight = e.arrowLeft = null
                }))
            },
            next: function () {
                e.direction = !0, e.index = j(e.index + 1), e.updateItemHTML()
            },
            prev: function () {
                e.direction = !1, e.index = j(e.index - 1), e.updateItemHTML()
            },
            goTo: function (t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            },
            preloadNearbyImages: function () {
                var t, i = e.st.gallery.preload,
                    o = Math.min(i[0], e.items.length),
                    n = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? n : o); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? o : n); t++) e._preloadItem(e.index - t)
            },
            _preloadItem: function (i) {
                if (i = j(i), !e.items[i].preloaded) {
                    var o = e.items[i];
                    o.parsed || (o = e.parseEl(i)), x("LazyLoad", o), "image" === o.type && (o.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
                        o.hasSize = !0
                    }).on("error.mfploader", function () {
                        o.hasSize = !0, o.loadError = !0, x("LazyLoadError", o)
                    }).attr("src", o.src)), o.preloaded = !0
                }
            }
        }
    });
    var W = "retina";
    t.magnificPopup.registerModule(W, {
            options: {
                replaceSrc: function (t) {
                    return t.src.replace(/\.\w+$/, function (t) {
                        return "@2x" + t
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function () {
                    if (window.devicePixelRatio > 1) {
                        var t = e.st.retina,
                            i = t.ratio;
                        (i = isNaN(i) ? i() : i) > 1 && (w("ImageHasSize." + W, function (t, e) {
                            e.img.css({
                                "max-width": e.img[0].naturalWidth / i,
                                width: "100%"
                            })
                        }), w("ElementParse." + W, function (e, o) {
                            o.src = t.replaceSrc(o, i)
                        }))
                    }
                }
            }
        }),
        function () {
            var e = "ontouchstart" in window,
                i = function () {
                    y.off("touchmove" + o + " touchend" + o)
                },
                o = ".mfpFastClick";
            t.fn.mfpFastClick = function (n) {
                return t(this).each(function () {
                    var s, r = t(this);
                    if (e) {
                        var a, l, c, d, h, p;
                        r.on("touchstart" + o, function (t) {
                            d = !1, p = 1, h = t.originalEvent ? t.originalEvent.touches[0] : t.touches[0], l = h.clientX, c = h.clientY, y.on("touchmove" + o, function (t) {
                                h = t.originalEvent ? t.originalEvent.touches : t.touches, p = h.length, h = h[0], (Math.abs(h.clientX - l) > 10 || Math.abs(h.clientY - c) > 10) && (d = !0, i())
                            }).on("touchend" + o, function (t) {
                                i(), d || p > 1 || (s = !0, t.preventDefault(), clearTimeout(a), a = setTimeout(function () {
                                    s = !1
                                }, 1e3), n())
                            })
                        })
                    }
                    r.on("click" + o, function () {
                        s || n()
                    })
                })
            }, t.fn.destroyMfpFastClick = function () {
                t(this).off("touchstart" + o + " click" + o), e && y.off("touchmove" + o + " touchend" + o)
            }
        }(), $()
}),
function () {
    var t, e, i, o, n, s = function (t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        },
        r = [].indexOf || function (t) {
            for (var e = 0, i = this.length; i > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    e = function () {
        function t() {}
        return t.prototype.extend = function (t, e) {
            var i, o;
            for (i in e) o = e[i], null == t[i] && (t[i] = o);
            return t
        }, t.prototype.isMobile = function (t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.addEvent = function (t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }, t.prototype.removeEvent = function (t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }, t.prototype.innerHeight = function () {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), i = this.WeakMap || this.MozWeakMap || (i = function () {
        function t() {
            this.keys = [], this.values = []
        }
        return t.prototype.get = function (t) {
            var e, i, o, n;
            for (e = i = 0, o = (n = this.keys).length; o > i; e = ++i)
                if (n[e] === t) return this.values[e]
        }, t.prototype.set = function (t, e) {
            var i, o, n, s;
            for (i = o = 0, n = (s = this.keys).length; n > o; i = ++o)
                if (s[i] === t) return void(this.values[i] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function () {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported = !0, t.prototype.observe = function () {}, t
    }()), o = this.getComputedStyle || function (t) {
        return this.getPropertyValue = function (e) {
            var i;
            return "float" === e && (e = "styleFloat"), n.test(e) && e.replace(n, function (t, e) {
                return e.toUpperCase()
            }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
        }, this
    }, n = /(\-([a-z]){1})/g, this.WOW = function () {
        function n(t) {
            null == t && (t = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.start = s(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new i
        }
        return n.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        }, n.prototype.init = function () {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, n.prototype.start = function () {
            var e, i, o, n;
            if (this.stopped = !1, this.boxes = function () {
                    var t, i, o, n;
                    for (n = [], t = 0, i = (o = this.element.querySelectorAll("." + this.config.boxClass)).length; i > t; t++) e = o[t], n.push(e);
                    return n
                }.call(this), this.all = function () {
                    var t, i, o, n;
                    for (n = [], t = 0, i = (o = this.boxes).length; i > t; t++) e = o[t], n.push(e);
                    return n
                }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (n = this.boxes, i = 0, o = n.length; o > i; i++) e = n[i], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function (t) {
                return function (e) {
                    var i, o, n, s, r;
                    for (r = [], n = 0, s = e.length; s > n; n++) o = e[n], r.push(function () {
                        var t, e, n, s;
                        for (s = [], t = 0, e = (n = o.addedNodes || []).length; e > t; t++) i = n[t], s.push(this.doSync(i));
                        return s
                    }.call(t));
                    return r
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, n.prototype.stop = function () {
            return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, n.prototype.sync = function () {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, n.prototype.doSync = function (t) {
            var e, i, o, n, s;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (s = [], i = 0, o = (n = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass)).length; o > i; i++) e = n[i], r.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), s.push(this.scrolled = !0)) : s.push(void 0);
                return s
            }
        }, n.prototype.show = function (t) {
            return this.applyStyle(t), t.className = t.className + " " + this.config.animateClass, null != this.config.callback ? this.config.callback(t) : void 0
        }, n.prototype.applyStyle = function (t, e) {
            var i, o, n;
            return o = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), n = t.getAttribute("data-wow-iteration"), this.animate(function (s) {
                return function () {
                    return s.customStyle(t, e, o, i, n)
                }
            }(this))
        }, n.prototype.animate = "requestAnimationFrame" in window ? function (t) {
            return window.requestAnimationFrame(t)
        } : function (t) {
            return t()
        }, n.prototype.resetStyle = function () {
            var t, e, i, o, n;
            for (n = [], e = 0, i = (o = this.boxes).length; i > e; e++) t = o[e], n.push(t.style.visibility = "visible");
            return n
        }, n.prototype.customStyle = function (t, e, i, o, n) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                animationDuration: i
            }), o && this.vendorSet(t.style, {
                animationDelay: o
            }), n && this.vendorSet(t.style, {
                animationIterationCount: n
            }), this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }), t
        }, n.prototype.vendors = ["moz", "webkit"], n.prototype.vendorSet = function (t, e) {
            var i, o, n, s;
            s = [];
            for (i in e) o = e[i], t["" + i] = o, s.push(function () {
                var e, s, r, a;
                for (a = [], e = 0, s = (r = this.vendors).length; s > e; e++) n = r[e], a.push(t["" + n + i.charAt(0).toUpperCase() + i.substr(1)] = o);
                return a
            }.call(this));
            return s
        }, n.prototype.vendorCSS = function (t, e) {
            var i, n, s, r, a, l;
            for (i = (n = o(t)).getPropertyCSSValue(e), r = 0, a = (l = this.vendors).length; a > r; r++) s = l[r], i = i || n.getPropertyCSSValue("-" + s + "-" + e);
            return i
        }, n.prototype.animationName = function (t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = o(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, n.prototype.cacheAnimationName = function (t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, n.prototype.cachedAnimationName = function (t) {
            return this.animationNameCache.get(t)
        }, n.prototype.scrollHandler = function () {
            return this.scrolled = !0
        }, n.prototype.scrollCallback = function () {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
                var e, i, o, n;
                for (n = [], e = 0, i = (o = this.boxes).length; i > e; e++)(t = o[e]) && (this.isVisible(t) ? this.show(t) : n.push(t));
                return n
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, n.prototype.offsetTop = function (t) {
            for (var e; void 0 === t.offsetTop;) t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, n.prototype.isVisible = function (t) {
            var e, i, o, n, s;
            return i = t.getAttribute("data-wow-offset") || this.config.offset, s = window.pageYOffset, n = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, o = this.offsetTop(t), e = o + t.clientHeight, n >= o && e >= s
        }, n.prototype.util = function () {
            return null != this._util ? this._util : this._util = new e
        }, n.prototype.disabled = function () {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, n
    }()
}.call(this);

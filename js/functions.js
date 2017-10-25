$ = jQuery.noConflict(),
    function (t) {
        t.forEach || (t.forEach = t.forEach || function (t, e) {
            for (var i = 0, n = this.length; i < n; i++) i in this && t.call(e, this[i], i, this)
        })
    }(Array.prototype),
    function (t) {
        t(window).load(function () {
            t("#status").fadeOut(), t("#preloader").delay(350).fadeOut("slow"), t("body").delay(350).css({
                overflow: "visible"
            })
        })
    }(jQuery),
    function (t) {
        t(window).scroll(function () {
            t(this).scrollTop() > 10 ? t("header").addClass("sticky") : t("header").removeClass("sticky")
        })
    }(jQuery),
    function (t) {
        t("a.open_close").on("click", function () {
            t(".main-menu").toggleClass("show"), t(".layer").toggleClass("layer-is-visible")
        }), t(".menu-item-has-children > a").on("click", function (e) {
            return e.preventDefault(), t(this).next().toggleClass("show_normal"), !1
        }), t(".menu-item-has-children-mega > a").on("click", function () {
            t(this).next().toggleClass("show_mega")
        }), t(window).width() <= 480 && t("a.open_close").on("click", function () {
            t(".cmn-toggle-switch").removeClass("active")
        })
    }(jQuery),
    function (t) {
        t(".tooltip-1").tooltip({
            html: !0
        }), t(".panel-group").on("hidden.bs.collapse shown.bs.collapse", function (e) {
            t(e.target).prev(".panel-heading").find("i.indicator").toggleClass("icon-plus icon-minus")
        }), t(".widget_recent_entries").length && t(".widget_recent_entries > ul > li").each(function (e) {
            t(this).children(".post-date").after(t(this).children("a"))
        }), (new WOW).init()
    }(jQuery),
    function (t) {
        t(".expose").on("click", function (e) {
            t("#overlay i.animate-spin").hide(), t(this).css("z-index", "100"), t("#overlay").fadeIn(300)
        }), t("#overlay").on("click", function (e) {
            t("#overlay i.animate-spin").show(), t("#overlay").fadeOut(300, function () {
                t(".expose").css("z-index", "1")
            })
        }), t(document).bind("keydown", function (e) {
            var i = e.keyCode;
            t(".opacity-overlay:visible").length > 0 && 27 === i && (e.preventDefault(), t(".opacity-overlay").fadeOut())
        }), t(document).on("click", ".opacity-overlay", function (e) {
            t(e.target).is(".opacity-overlay .popup-content *") || t(".opacity-overlay").fadeOut()
        })
    }(jQuery),
    function (t) {
        t(".video").magnificPopup({
            type: "iframe"
        }), t(".parallax-window").parallax({}), t(".magnific-gallery").each(function () {
            t(this).magnificPopup({
                delegate: "a",
                type: "image",
                gallery: {
                    enabled: !0
                }
            })
        }), t(".dropdown-menu").on("click", function (t) {
            t.stopPropagation()
        });
        for (var e = document.querySelectorAll(".cmn-toggle-switch"), i = e.length - 1; i >= 0; i--) ! function (t) {
            t.addEventListener("click", function (t) {
                t.preventDefault(), !0 === this.classList.contains("active") ? this.classList.remove("active") : this.classList.add("active")
            })
        }(e[i]);
        t(window).scroll(function () {
            0 != t(this).scrollTop() ? t("#toTop").fadeIn() : t("#toTop").fadeOut()
        }), t("#toTop").on("click", function () {
            t("body, html").animate({
                scrollTop: 0
            }, 500)
        }), t(".numbers-row").append('<div class="inc button_inc">+</div><div class="dec button_inc">-</div>'), t(".numbers-row input").on("change", function () {
            t(this).parent().attr("data-max") && t(this).val() > t(this).parent().data("max") && t(this).val(t(this).parent().data("max")), t(this).parent().attr("data-min") && t(this).val() < t(this).parent().data("min") && t(this).val(t(this).parent().data("min"))
        }), t("body").on("click", ".button_inc", function () {
            var e = t(this),
                i = e.parent().find("input").val();
            if ("+" == e.text()) {
                var n = 9999;
                if (t(this).parent().attr("data-max") && (n = t(this).parent().data("max")), i < n) s = parseFloat(i) + 1;
                else s = n
            } else {
                var a = 0;
                if (t(this).parent().attr("data-min") && (a = t(this).parent().data("min")), i > a) var s = parseFloat(i) - 1;
                else t(this).parent() && (s = a)
            }
            e.parent().find("input").attr("disabled") || e.parent().find("input").val(s).change()
        })
    }(jQuery),
    function (t) {
        is_rtl = "true", t("#single_hotel_desc .owl-carousel").length && t("#single_hotel_desc .owl-carousel").owlCarousel({
            rtl: is_rtl,
            autoplay: !0,
            responsiveClass: !0,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
    }(jQuery),
    function (t) {
        t(".guest-reviews .more-review").click(function () {
            var e = t(this);
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "get_more_reviews",
                    post_id: t(this).data("post_id"),
                    last_no: t(".guest-review").length
                },
                success: function (i) {
                    0 == i.success ? t(".more-review").remove() : (t(".guest-reviews").append(i.html), t(".guest-reviews").append(e)), 1 != i.more_reviews && (e.text(i.notice), e.attr("disabled", "disabled"))
                }
            }), !1
        }), t("#review-form").submit(function () {
            t("#message-review").hide();
            var e = t(this).serialize();
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: e,
                success: function (e) {
                    1 == e.success ? (t("#review-form").hide(), t("#message-review").html(e.result), t("#myReviewLabel").html(e.title), t("#message-review").show()) : (t("#message-review").html(e.result), t("#message-review").show())
                }
            }), !1
        })
    }(jQuery),
    function (t) {
        t("body").on("click", ".btn-add-wishlist", function (e) {
            e.preventDefault(), t("#overlay i.animate-spin").show(), t("#overlay").show();
            var i = t(this);
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "add_to_wishlist",
                    post_id: t(this).data("post-id")
                },
                success: function (e) {
                    1 == e.success ? (i.hide(), i.siblings(".btn-remove-wishlist").show()) : alert(e.result), t("#overlay").hide()
                }
            }), !1
        }), t("body").on("click", ".btn-remove-wishlist", function (e) {
            e.preventDefault(), t("#overlay i.animate-spin").show(), t("#overlay").show();
            var i = t(this);
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "add_to_wishlist",
                    post_id: t(this).data("post-id"),
                    remove: 1
                },
                success: function (e) {
                    1 == e.success ? (i.hide(), i.siblings(".btn-add-wishlist").show()) : alert(e.result), t("#overlay").hide()
                }
            }), !1
        })
    }(jQuery),
    function (t) {
        t(window).bind("load", function () {
            t(this).width() < 991 ? (t(".collapse#collapseFilters").removeClass("in"), t(".collapse#collapseFilters").addClass("out")) : (t(".collapse#collapseFilters").removeClass("out"), t(".collapse#collapseFilters").addClass("in"))
        }), t(document).ready(function () {
            t(".list-filter input").on("ifToggled", function () {
                var e = t(this).closest("ul").data("base-url").replace(/&amp;/g, "&"),
                    i = e,
                    n = t(this).closest("ul").data("arg");
                return t(this).closest("ul").find("input:checked").each(function (a) {
                    if (-1 == t(this).val()) return i = e, !1;
                    i += "&" + n + "[]=" + t(this).val()
                }), i.indexOf("?") < 0 && (i = i.replace(/&/, "?")), window.location.href = i, !1
            }), t("#sort_price").change(function () {
                var e = t(this).data("base-url").replace(/&amp;/g, "&");
                return "lower" == t(this).val() ? e += "&order_by=price&order=ASC" : "higher" == t(this).val() && (e += "&order_by=price&order=DESC"), e.indexOf("?") < 0 && (e = e.replace(/&/, "?")), window.location.href = e, !1
            }), t("#sort_rating").change(function () {
                var e = t(this).data("base-url").replace(/&amp;/g, "&");
                return "lower" == t(this).val() ? e += "&order_by=rating&order=ASC" : "higher" == t(this).val() && (e += "&order_by=rating&order=DESC"), e.indexOf("?") < 0 && (e = e.replace(/&/, "?")), window.location.href = e, !1
            })
        })
    }(jQuery),
    function (t) {
        t(".signup-btn").click(function (e) {
            return e.preventDefault(), t(".loginform").hide(), t(".signupform").show(), !1
        }), t(".login-btn").click(function (e) {
            return e.preventDefault(), t(".loginform").show(), t(".signupform").hide(), !1
        })
    }(jQuery),
    function (t) {
        t(".cl-switcher").change(function () {
            return window.location.href = t(this).find(":selected").data("url"), !1
        })
    }(jQuery),
    function (t, e) {
        if (t(".woocommerce .owl-carousel").length > 0 && t(".woocommerce .owl-carousel").each(function () {
                var e = t(this).data("slider"),
                    i = !1;
                e && (void 0 === e.items && (e.items = 3), void 0 === e.slide_count && (e.slide_count = e.items + 1), i = e.slide_count > e.items), t(this).owlCarousel({
                    rtl: is_rtl,
                    items: e.items,
                    loop: i,
                    autoplay: !0,
                    autoplayTimeout: 4e3,
                    nav: !0,
                    navText: ["", ""]
                })
            }), t(".product-remove span.edit-product").click(function (e) {
                window.open(t(this).attr("href"))
            }), t(document).on("change", ".woocommerce-checkout #billing_country, .woocommerce-checkout #shipping_country, .shipping-calculator-form #calc_shipping_country", function (e) {
                t("#billing_state_field > input, #billing_state_field > select").length > 0 && t("#billing_state_field > input, #billing_state_field > select").addClass("form-control"), t("#shipping_state_field > input, #shipping_state_field > select").length > 0 && t("#shipping_state_field > input, #shipping_state_field > select").addClass("form-control"), t("#calc_shipping_state_field input, #calc_shipping_state_field select").length > 0 && !t("#calc_shipping_state_field input, #calc_shipping_state_field select").hasClass("form-control") && t("#calc_shipping_state_field input, #calc_shipping_state_field select").addClass("form-control")
            }), t(document).on("click", ".quickview", function (e) {
                e.preventDefault();
                var i = t(this).data("id");
                t("#soap-map-popup").length < 1 && t('<div class="opacity-overlay" id="soap-map-popup"><div class="container"><div class="popup-wrapper"><i class="icon-spin3 animate-spin"></i><div class="popup-content"></div></div></div></div>').appendTo("body"), t("#soap-map-popup").fadeIn();
                t.ajax({
                    url: ajaxurl,
                    type: "POST",
                    data: {
                        action: "ct_product_quickview",
                        pid: i
                    },
                    success: function (e) {
                        1 == e.success ? (t("#soap-map-popup .popup-content").html(e.output), t(".popup-content .numbers-row").append('<div class="inc button_inc">+</div><div class="dec button_inc">-</div>')) : alert("Please try again later")
                    }
                })
            }), t(".widget.widget_price_filter .price_slider").length > 0) {
            var i = t(".widget.widget_price_filter .price_slider"),
                n = 0,
                a = 0;
            i.append('<span class="price_from"></span>'), i.append('<span class="price_to"></span>'), t(".widget.widget_price_filter .price_label .from").on("DOMSubtreeModified", function () {
                i.find(".price_from").text(t(this).html()), a = i.find(".price_from").width(), n = i.find("span:nth-child(4)").css("left"), n = parseInt(n.substring(0, n.length - 2)) - a / 2, i.find(".price_from").css("left", n + "px")
            }), t(".widget.widget_price_filter .price_label .to").on("DOMSubtreeModified", function () {
                i.find(".price_to").text(t(this).html()), a = i.find(".price_to").width(), n = i.find("span:last-child").css("left"), n = parseInt(n.substring(0, n.length - 2)) - a / 2, i.find(".price_to").css("left", n + "px")
            })
        }
        t(document).ready(function () {
            "use strict";
            if (t(".dropdown-cart #cart_items").length > 0) t("#cart_items .product_list_widget").height()
        }), t(document).on("added_to_cart", "body", function (e, i, n, a) {
            "use strict";
            var s = a.parent().find(".added_to_cart"),
                o = s.html();
            if (s.html('<span class="icon-basket"></span><div class="tool-tip">' + o + "</div>"), s.addClass("btn_shop"), a.hide(), t("header #cart_items").length > 0) {
                var l = t("header #cart_items #ajax_mini_cart").val();
                t.ajax({
                    url: ajaxurl,
                    type: "POST",
                    data: {
                        action: "ct_ajax_mini_cart",
                        nonce: l
                    },
                    success: function (e) {
                        e.success && (t("header .cart-item-qty").text(e.cart_qty), t("#cart_items").html(e.mini_cart))
                    }
                })
            }
        })
    }(jQuery),
    function (t, e) {
        "use strict";
        t(window).load(function () {
            function e(e, n, a) {
                if (!i) {
                    i = !0;
                    var s = n.find(".owl-item").length,
                        o = [],
                        l = 0;
                    a = (a + s) % s, e && e.trigger("to.owl.carousel", [a, 300, !0]), n.find(".owl-item").removeClass("selected"), n.find(".owl-item:eq(" + a + ")").addClass("selected"), n.data("currentThumb", a), n.find(".owl-item.active").each(function () {
                        o[l++] = t(this).index()
                    }), -1 == t.inArray(a, o) && (Math.abs(a - o[0]) > Math.abs(a - o[o.length - 1]) ? n.trigger("to.owl.carousel", [(a - o.length + 1) % s, 300, !0]) : n.trigger("to.owl.carousel", [a % s, 300, !0])), i = !1
                }
            }
            var i = !1,
                n = t(".product-images-slider"),
                a = n.closest(".product").find(".product-thumbs-slider"),
                s = 0,
                o = n.find("> *").length;
            a.owlCarousel({
                rtl: is_rtl,
                loop: !1,
                autoplay: !1,
                items: 4,
                nav: !1,
                navText: ["", ""],
                dots: !1,
                rewind: !0,
                stagePadding: 1,
                onInitialized: function () {
                    e(null, a, 0), a.find(".owl-item").length >= 4 && a.append('<div class="thumb-nav"><div class="thumb-prev"></div><div class="thumb-next"></div></div>')
                }
            }).on("click", ".owl-item", function () {
                e(n, a, t(this).index())
            }), a.on("click", ".thumb-prev", function (t) {
                var i = a.data("currentThumb");
                e(n, a, --i)
            }), a.on("click", ".thumb-next", function (t) {
                var i = a.data("currentThumb");
                e(n, a, ++i)
            }), n.owlCarousel({
                rtl: is_rtl,
                loop: o > 1,
                autoplay: !1,
                items: 1,
                autoHeight: !0,
                nav: !0,
                navText: ["", ""],
                dots: !1,
                rewind: !0,
                onTranslate: function (t) {
                    s = t.item.index - n.find(".cloned").length / 2, e(null, a, s)
                }
            })
        })
    }(jQuery),
    function (t) {
        t("#faq_box a[href*=#]:not([href=#])").click(function () {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var e = t(this.hash);
                if ((e = e.length ? e : t("[name=" + this.hash.slice(1) + "]")).length) return t("html,body").animate({
                    scrollTop: e.offset().top - 110
                }, 500), !1
            }
        })
    }(jQuery);
$ = jQuery.noConflict(),
    function (t) {
        t.forEach || (t.forEach = t.forEach || function (t, e) {
            for (var i = 0, n = this.length; i < n; i++) i in this && t.call(e, this[i], i, this)
        })
    }(Array.prototype),
    function (t) {
        t(window).load(function () {
            t("#status").fadeOut(), t("#preloader").delay(350).fadeOut("slow"), t("body").delay(350).css({
                overflow: "visible"
            })
        })
    }(jQuery),
    function (t) {
        t(window).scroll(function () {
            t(this).scrollTop() > 10 ? t("header").addClass("sticky") : t("header").removeClass("sticky")
        })
    }(jQuery),
    function (t) {
        t("a.open_close").on("click", function () {
            t(".main-menu").toggleClass("show"), t(".layer").toggleClass("layer-is-visible")
        }), t(".menu-item-has-children > a").on("click", function (e) {
            return e.preventDefault(), t(this).next().toggleClass("show_normal"), !1
        }), t(".menu-item-has-children-mega > a").on("click", function () {
            t(this).next().toggleClass("show_mega")
        }), t(window).width() <= 480 && t("a.open_close").on("click", function () {
            t(".cmn-toggle-switch").removeClass("active")
        })
    }(jQuery),
    function (t) {
        t(".tooltip-1").tooltip({
            html: !0
        }), t(".panel-group").on("hidden.bs.collapse shown.bs.collapse", function (e) {
            t(e.target).prev(".panel-heading").find("i.indicator").toggleClass("icon-plus icon-minus")
        }), t(".widget_recent_entries").length && t(".widget_recent_entries > ul > li").each(function (e) {
            t(this).children(".post-date").after(t(this).children("a"))
        }), (new WOW).init()
    }(jQuery),
    function (t) {
        t(".expose").on("click", function (e) {
            t("#overlay i.animate-spin").hide(), t(this).css("z-index", "100"), t("#overlay").fadeIn(300)
        }), t("#overlay").on("click", function (e) {
            t("#overlay i.animate-spin").show(), t("#overlay").fadeOut(300, function () {
                t(".expose").css("z-index", "1")
            })
        }), t(document).bind("keydown", function (e) {
            var i = e.keyCode;
            t(".opacity-overlay:visible").length > 0 && 27 === i && (e.preventDefault(), t(".opacity-overlay").fadeOut())
        }), t(document).on("click", ".opacity-overlay", function (e) {
            t(e.target).is(".opacity-overlay .popup-content *") || t(".opacity-overlay").fadeOut()
        })
    }(jQuery),
    function (t) {
        t(".video").magnificPopup({
            type: "iframe"
        }), t(".parallax-window").parallax({}), t(".magnific-gallery").each(function () {
            t(this).magnificPopup({
                delegate: "a",
                type: "image",
                gallery: {
                    enabled: !0
                }
            })
        }), t(".dropdown-menu").on("click", function (t) {
            t.stopPropagation()
        });
        for (var e = document.querySelectorAll(".cmn-toggle-switch"), i = e.length - 1; i >= 0; i--) e[i].addEventListener("click", function (t) {
            t.preventDefault(), !0 === this.classList.contains("active") ? this.classList.remove("active") : this.classList.add("active")
        });
        t(window).scroll(function () {
            0 != t(this).scrollTop() ? t("#toTop").fadeIn() : t("#toTop").fadeOut()
        }), t("#toTop").on("click", function () {
            t("body, html").animate({
                scrollTop: 0
            }, 500)
        }), t(".numbers-row").append('<div class="inc button_inc">+</div><div class="dec button_inc">-</div>'), t(".numbers-row input").on("change", function () {
            t(this).parent().attr("data-max") && t(this).val() > t(this).parent().data("max") && t(this).val(t(this).parent().data("max")), t(this).parent().attr("data-min") && t(this).val() < t(this).parent().data("min") && t(this).val(t(this).parent().data("min"))
        }), t("body").on("click", ".button_inc", function () {
            var e = t(this),
                i = e.parent().find("input").val();
            if ("+" == e.text()) {
                var n = 9999;
                t(this).parent().attr("data-max") && (n = t(this).parent().data("max")), s = i < n ? parseFloat(i) + 1 : n
            } else {
                var a = 0;
                if (t(this).parent().attr("data-min") && (a = t(this).parent().data("min")), i > a) var s = parseFloat(i) - 1;
                else t(this).parent() && (s = a)
            }
            e.parent().find("input").attr("disabled") || e.parent().find("input").val(s).change()
        })
    }(jQuery),
    function (t) {
        is_rtl = "true", t("#single_hotel_desc .owl-carousel").length && t("#single_hotel_desc .owl-carousel").owlCarousel({
            rtl: is_rtl,
            autoplay: !0,
            responsiveClass: !0,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        })
    }(jQuery),
    function (t) {
        t(".guest-reviews .more-review").click(function () {
            var e = t(this);
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "get_more_reviews",
                    post_id: t(this).data("post_id"),
                    last_no: t(".guest-review").length
                },
                success: function (i) {
                    0 == i.success ? t(".more-review").remove() : (t(".guest-reviews").append(i.html), t(".guest-reviews").append(e)), 1 != i.more_reviews && (e.text(i.notice), e.attr("disabled", "disabled"))
                }
            }), !1
        }), t("#review-form").submit(function () {
            t("#message-review").hide();
            var e = t(this).serialize();
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: e,
                success: function (e) {
                    1 == e.success ? (t("#review-form").hide(), t("#message-review").html(e.result), t("#myReviewLabel").html(e.title), t("#message-review").show()) : (t("#message-review").html(e.result), t("#message-review").show())
                }
            }), !1
        })
    }(jQuery),
    function (t) {
        t("body").on("click", ".btn-add-wishlist", function (e) {
            e.preventDefault(), t("#overlay i.animate-spin").show(), t("#overlay").show();
            var i = t(this);
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "add_to_wishlist",
                    post_id: t(this).data("post-id")
                },
                success: function (e) {
                    1 == e.success ? (i.hide(), i.siblings(".btn-remove-wishlist").show()) : alert(e.result), t("#overlay").hide()
                }
            }), !1
        }), t("body").on("click", ".btn-remove-wishlist", function (e) {
            e.preventDefault(), t("#overlay i.animate-spin").show(), t("#overlay").show();
            var i = t(this);
            return t.ajax({
                url: ajaxurl,
                type: "POST",
                data: {
                    action: "add_to_wishlist",
                    post_id: t(this).data("post-id"),
                    remove: 1
                },
                success: function (e) {
                    1 == e.success ? (i.hide(), i.siblings(".btn-add-wishlist").show()) : alert(e.result), t("#overlay").hide()
                }
            }), !1
        })
    }(jQuery),
    function (t) {
        t(window).bind("load", function () {
            t(this).width() < 991 ? (t(".collapse#collapseFilters").removeClass("in"), t(".collapse#collapseFilters").addClass("out")) : (t(".collapse#collapseFilters").removeClass("out"), t(".collapse#collapseFilters").addClass("in"))
        }), t(document).ready(function () {
            t(".list-filter input").on("ifToggled", function () {
                var e = t(this).closest("ul").data("base-url").replace(/&amp;/g, "&"),
                    i = e,
                    n = t(this).closest("ul").data("arg");
                return t(this).closest("ul").find("input:checked").each(function (a) {
                    if (-1 == t(this).val()) return i = e, !1;
                    i += "&" + n + "[]=" + t(this).val()
                }), i.indexOf("?") < 0 && (i = i.replace(/&/, "?")), window.location.href = i, !1
            }), t("#sort_price").change(function () {
                var e = t(this).data("base-url").replace(/&amp;/g, "&");
                return "lower" == t(this).val() ? e += "&order_by=price&order=ASC" : "higher" == t(this).val() && (e += "&order_by=price&order=DESC"), e.indexOf("?") < 0 && (e = e.replace(/&/, "?")), window.location.href = e, !1
            }), t("#sort_rating").change(function () {
                var e = t(this).data("base-url").replace(/&amp;/g, "&");
                return "lower" == t(this).val() ? e += "&order_by=rating&order=ASC" : "higher" == t(this).val() && (e += "&order_by=rating&order=DESC"), e.indexOf("?") < 0 && (e = e.replace(/&/, "?")), window.location.href = e, !1
            })
        })
    }(jQuery),
    function (t) {
        t(".signup-btn").click(function (e) {
            return e.preventDefault(), t(".loginform").hide(), t(".signupform").show(), !1
        }), t(".login-btn").click(function (e) {
            return e.preventDefault(), t(".loginform").show(), t(".signupform").hide(), !1
        })
    }(jQuery),
    function (t) {
        t(".cl-switcher").change(function () {
            return window.location.href = t(this).find(":selected").data("url"), !1
        })
    }(jQuery),
    function (t, e) {
        if (t(".woocommerce .owl-carousel").length > 0 && t(".woocommerce .owl-carousel").each(function () {
                var e = t(this).data("slider"),
                    i = !1;
                e && (void 0 === e.items && (e.items = 3), void 0 === e.slide_count && (e.slide_count = e.items + 1), i = e.slide_count > e.items), t(this).owlCarousel({
                    rtl: is_rtl,
                    items: e.items,
                    loop: i,
                    autoplay: !0,
                    autoplayTimeout: 4e3,
                    nav: !0,
                    navText: ["", ""]
                })
            }), t(".product-remove span.edit-product").click(function (e) {
                window.open(t(this).attr("href"))
            }), t(document).on("change", ".woocommerce-checkout #billing_country, .woocommerce-checkout #shipping_country, .shipping-calculator-form #calc_shipping_country", function (e) {
                t("#billing_state_field > input, #billing_state_field > select").length > 0 && t("#billing_state_field > input, #billing_state_field > select").addClass("form-control"), t("#shipping_state_field > input, #shipping_state_field > select").length > 0 && t("#shipping_state_field > input, #shipping_state_field > select").addClass("form-control"), t("#calc_shipping_state_field input, #calc_shipping_state_field select").length > 0 && !t("#calc_shipping_state_field input, #calc_shipping_state_field select").hasClass("form-control") && t("#calc_shipping_state_field input, #calc_shipping_state_field select").addClass("form-control")
            }), t(document).on("click", ".quickview", function (e) {
                e.preventDefault();
                var i = t(this).data("id");
                t("#soap-map-popup").length < 1 && t('<div class="opacity-overlay" id="soap-map-popup"><div class="container"><div class="popup-wrapper"><i class="icon-spin3 animate-spin"></i><div class="popup-content"></div></div></div></div>').appendTo("body"), t("#soap-map-popup").fadeIn(), t.ajax({
                    url: ajaxurl,
                    type: "POST",
                    data: {
                        action: "ct_product_quickview",
                        pid: i
                    },
                    success: function (e) {
                        1 == e.success ? (t("#soap-map-popup .popup-content").html(e.output), t(".popup-content .numbers-row").append('<div class="inc button_inc">+</div><div class="dec button_inc">-</div>')) : alert("Please try again later")
                    }
                })
            }), t(".widget.widget_price_filter .price_slider").length > 0) {
            var i = t(".widget.widget_price_filter .price_slider"),
                n = 0,
                a = 0;
            i.append('<span class="price_from"></span>'), i.append('<span class="price_to"></span>'), t(".widget.widget_price_filter .price_label .from").on("DOMSubtreeModified", function () {
                i.find(".price_from").text(t(this).html()), a = i.find(".price_from").width(), n = i.find("span:nth-child(4)").css("left"), n = parseInt(n.substring(0, n.length - 2)) - a / 2, i.find(".price_from").css("left", n + "px")
            }), t(".widget.widget_price_filter .price_label .to").on("DOMSubtreeModified", function () {
                i.find(".price_to").text(t(this).html()), a = i.find(".price_to").width(), n = i.find("span:last-child").css("left"), n = parseInt(n.substring(0, n.length - 2)) - a / 2, i.find(".price_to").css("left", n + "px")
            })
        }
        t(document).ready(function () {
            "use strict";
            t(".dropdown-cart #cart_items").length > 0 && t("#cart_items .product_list_widget").height()
        }), t(document).on("added_to_cart", "body", function (e, i, n, a) {
            "use strict";
            var s = a.parent().find(".added_to_cart"),
                o = s.html();
            if (s.html('<span class="icon-basket"></span><div class="tool-tip">' + o + "</div>"), s.addClass("btn_shop"), a.hide(), t("header #cart_items").length > 0) {
                var l = t("header #cart_items #ajax_mini_cart").val();
                t.ajax({
                    url: ajaxurl,
                    type: "POST",
                    data: {
                        action: "ct_ajax_mini_cart",
                        nonce: l
                    },
                    success: function (e) {
                        e.success && (t("header .cart-item-qty").text(e.cart_qty), t("#cart_items").html(e.mini_cart))
                    }
                })
            }
        })
    }(jQuery),
    function (t, e) {
        "use strict";
        t(window).load(function () {
            function e(e, n, a) {
                if (!i) {
                    i = !0;
                    var s = n.find(".owl-item").length,
                        o = [],
                        l = 0;
                    a = (a + s) % s, e && e.trigger("to.owl.carousel", [a, 300, !0]), n.find(".owl-item").removeClass("selected"), n.find(".owl-item:eq(" + a + ")").addClass("selected"), n.data("currentThumb", a), n.find(".owl-item.active").each(function () {
                        o[l++] = t(this).index()
                    }), -1 == t.inArray(a, o) && (Math.abs(a - o[0]) > Math.abs(a - o[o.length - 1]) ? n.trigger("to.owl.carousel", [(a - o.length + 1) % s, 300, !0]) : n.trigger("to.owl.carousel", [a % s, 300, !0])), i = !1
                }
            }
            var i = !1,
                n = t(".product-images-slider"),
                a = n.closest(".product").find(".product-thumbs-slider"),
                s = 0,
                o = n.find("> *").length;
            a.owlCarousel({
                rtl: is_rtl,
                loop: !1,
                autoplay: !1,
                items: 4,
                nav: !1,
                navText: ["", ""],
                dots: !1,
                rewind: !0,
                stagePadding: 1,
                onInitialized: function () {
                    e(null, a, 0), a.find(".owl-item").length >= 4 && a.append('<div class="thumb-nav"><div class="thumb-prev"></div><div class="thumb-next"></div></div>')
                }
            }).on("click", ".owl-item", function () {
                e(n, a, t(this).index())
            }), a.on("click", ".thumb-prev", function (t) {
                var i = a.data("currentThumb");
                e(n, a, --i)
            }), a.on("click", ".thumb-next", function (t) {
                var i = a.data("currentThumb");
                e(n, a, ++i)
            }), n.owlCarousel({
                rtl: is_rtl,
                loop: o > 1,
                autoplay: !1,
                items: 1,
                autoHeight: !0,
                nav: !0,
                navText: ["", ""],
                dots: !1,
                rewind: !0,
                onTranslate: function (t) {
                    s = t.item.index - n.find(".cloned").length / 2, e(null, a, s)
                }
            })
        })
    }(jQuery),
    function (t) {
        t("#faq_box a[href*=#]:not([href=#])").click(function () {
            if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                var e = t(this.hash);
                if ((e = e.length ? e : t("[name=" + this.hash.slice(1) + "]")).length) return t("html,body").animate({
                    scrollTop: e.offset().top - 110
                }, 500), !1
            }
        })
    }(jQuery);

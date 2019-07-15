"use strict";
/**
 * 自定义指令
 * */
import Vue from "vue"

Vue.directive('require', {
    // 当被绑定的元素插入到 DOM 中时，在文本后面插入一个红色的 *  和：
    inserted: function (el) {
        el.innerHTML = el.innerHTML+`<span class="redRequired">*</span>`
    }
})
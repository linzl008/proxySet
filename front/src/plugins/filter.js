import Vue from "vue"
import moment from './moment';


/**
 * *************************************
 * 通用格式的
 * *************************************
 */
// 手机号中间四位是星号
Vue.filter('phoneFmt', (input) =>{
    if (!input) {
        return '--'
    }
    const h = input.slice(0, 3)
    const e = input.slice(-4)
    return h + '****' + e
})

// 输出当前时间 - input 时间差值，xx 天 xx 时
Vue.filter('yearDuraFmt', (input, biggerDate) => {
    const now = moment(biggerDate)
    const before = moment(input)
    // 不满一年算一年, 所以 + 1
    const years = now.diff(before, 'years') + 1;
    let yStr = `${years}年`;
    if (years <= 1) {
        yStr = '1年及1年以下'
    } else if (years >= 10) {
        yStr = '10年及10年以上'
    }
    return yStr || '--'
})

/*规范数字显示、空值显示*/
Vue.filter('numFmt',(input)=>{
    if (input === null || input === undefined) {
        return '--'
    }
    return input
})

/**
 * 格式化百分比显示
 * digits:小数位数
 * */
Vue.filter('percentFmt',(input,digits=2)=>{
    if (input === null || input === undefined) {
        return '--'
    }
    return (input*100).toFixed(digits)+'%'
})
/**
 * 日期格式化
 * formatString: 格式化字符串 YYYY-MM-DD HH:mm:ss
 * */
Vue.filter('dateFmt',(input,formatString='YYYY-MM-DD')=>{
    if (input === null || input === undefined) {
        return '--'
    }
    return moment(input).format(formatString)
})

/**
 * *************************************
 * 项目专用的
 * *************************************
 * */

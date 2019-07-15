import CryptoJS from 'crypto-js/crypto-js'
import moment from './moment';
import md5 from 'js-md5';

export default {
    //AES加密
    encrypt(word, keyStr){//加密 
        keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
        var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return encrypted.toString();
    },
    decrypt(word, keyStr){  //解密
        keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
        var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
        var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    checkIsPhone(str) {
        return (/^1[0-9]{10}$/.test(str))
    },
    md5(str){
        return md5(str)
    },
    /**
     * 处理成url的拼接模式
     * @param params
     * @returns {string}  ?key=val&key1=val1
     */
    toStringURLParams(params){
        let str = "?"
        for(let key in params){
            str+= `${key}=${(params[key])}&`
        }
        str = str.substring(0, str.length-1)
        return str;
    },
    /**
     * 获取url上的参数
     * @param name key值
     * @returns {string|null} 对应的val
     */
    getUrlParam(name) {//封装方法
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    },
    /**
     * 下载文件，利用xhr 请求文件，获取二进制文件流，
     * 获取返回接口的header里面的文件名（涉及数据安全，需要后台配合），写入文件
     * @param url  GET 方法，拼接好的url， http://www.igelian.com/xxxx?a=1&b=1
     * @param ctx  上下文，暂时只用到message
     * @param onSuccess  操作成功回调函数，
     * @param onError 操作失败回调函数，
     */
    downloadFile(url,ctx,onSuccess,onError){
        // let url= "/system/energyStatistics/export"+str;
        // let url= "http://192.168.2.24:8765/energyStatistics/export"+str;
        let xhr = new XMLHttpRequest();
        let token = localStorage.getItem("unicom-token");
        xhr.open('get', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // 设置请求头，必须在open后添加
        xhr.setRequestHeader('token', token);
        xhr.responseType = 'blob'; // 返回类型blob  blob 存储着大量的二进制数据
        xhr.onload = function () {
            if (this.status === 200) {
                let blob = this.response;
                let reader = new FileReader();
                reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
                reader.onload = function (e) {
                    let disposition = xhr.getResponseHeader('Content-Disposition');
                    disposition = disposition || "";
                    let fileName = "";
                    if(disposition){
                        fileName = disposition.split(";")[1].split("filename=")[1];
                        if (fileName) {//当存在 filename* 时，取filename* 并进行解码（为了解决中文乱码问题）
                            fileName = decodeURIComponent(fileName);
                        }
                    }
                    let a = document.createElement('a'); // 转换完成，创建一个a标签用于下载
                    a.download =  fileName || 'temp.xlsx';
                    a.href = e.target.result;
                    a.click();
                    onSuccess && onSuccess()
                };
            }else{
                let blob = this.response;
                let reader = new FileReader();
                reader.onload = function(event){
                    let content = reader.result;//内容就在这里
                    let data = JSON.parse(content)
                    ctx.$message.error(data.message)
                    onError && onError()
                };
                reader.readAsText(blob);
            }
        }
        xhr.send(); // 发送ajax请求
    },
    /**
     * 日期格式化
     * @param date
     * @param formatString
     * @returns {string|*}
     */
    dateFmt(date,formatString='YYYY-MM-DD'){
        if (!date) {
            return '--'
        }
        return moment(date).format(formatString)
    },
    /**
     *
     * @param direction :vertical,horizontal
     * @param ele  滚动的element
     * @param form 开始位置
     * @param to 结束位置
     * @param times 帧数
     * @param allUseTime 总的耗时
     */
    scrollElement(direction = 'vertical',ele,form,to,times=20,allUseTime=200){
        let count = 0; //计数器
        let interVal =  (to - form)/times; //每次滚动的耗时
        let timer = setInterval(()=>{
            if(count >= times){
                if(direction === 'vertical'){
                    ele.scrollTop= to;
                }else{
                    ele.scrollLeft= to;
                }
                clearInterval(timer);
            }else{
                count++;
                if(direction === 'vertical'){
                    ele.scrollTop = form + interVal*count;
                }else{
                    ele.scrollLeft= form + interVal*count;
                }
            }
        },Math.floor(allUseTime / times))
    },
    /**
     * 获取数组中键值为 keyName，数据为 keyData 的整个对象
     * @param keyData
     * @param list
     * @param keyName
     * @returns {null|*} 没有找到数据，就返回null
     */
    getKeyVal(keyData,list,keyName){
        for (let i = 0; i < list.length; i++) {
            let listElement = list[i];
            if(listElement[keyName] === keyData){
                return listElement
            }
        }
        return null;
    }
}
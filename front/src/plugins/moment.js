class Moment{
    time=null;
    constructor(v){
        this.time =  new Date(v);
    }
    get(){
        return this.time
    }
    format(str = 'YYYY-MM-DD'){ //YYYY-MM-DD HH:mm:ss
        if(this.time+"" === 'Invalid Date'){
            throw new Error('Invalid Date ');
        }
        var year = this.time.getFullYear()+"";
        var month = (this.time.getMonth()+1+"").padStart(2,0);
        var day = (this.time.getDate() +"").padStart(2,0);
        var hours =(this.time.getHours()+"").padStart(2,0);
        var min = (this.time.getMinutes()+"").padStart(2,0);
        var sec = (this.time.getSeconds()+"").padStart(2,0);
        str = str.replace('YYYY',year)
            .replace('MM',month)
            .replace('DD',day)
            .replace('HH',hours)
            .replace('mm',min)
            .replace('ss',sec)
        return str;
    }

    /**
     * 计算两个Moment 的时间差
     * @param before
     * @param type emuns：years  暂时只有这个
     * @returns {number}
     */
    diff(before,type = 'years'){
        if(this.time +"" === 'Invalid Date'){
            throw new Error('Invalid Date ');
        }
        var d2 = before.get();
        if(d2 +"" === 'Invalid Date'){
            throw new Error('Invalid Date');
        }
        var d1 = this.time;
        //调整顺序，保证 d2 > d1
        if(d1.getTime() - d2.getTime() >0){
            [d1,d2] = [d2,d1];
        }
        var obj = {}, M1 = d1.getMonth(), D1 = d1.getDate(), M2 = d2.getMonth(), D2 = d2.getDate();

        obj.Y = d2.getFullYear() - d1.getFullYear() + (M1 * 100 + D1 > M2 * 100 + D2 ? -1 : 0);

        obj.M = obj.Y * 12 + M2 - M1 + (D1 > D2 ? -1 : 0);
        obj.s = Math.floor((d2 - d1) / 1000);//差几秒
        obj.m = Math.floor(obj.s / 60);//差几分钟
        obj.h = Math.floor(obj.m / 60);//差几小时
        obj.D = Math.floor(obj.h / 24);//差几天
        
        if(type === 'years'){
            return Math.abs(obj.Y);
        }else{
            return Math.abs(obj.Y);
        }
    }
}
function moment(v) {
    return new Moment(v)
}
export default moment;

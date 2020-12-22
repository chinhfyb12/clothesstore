function formatMoney(n, separate = "."){
    if(typeof n === 'string') {
        var s = n.toString();
        var len = s.length;
        var ret = "";
        for(var i = 1; i <= len; i++) {
          ret = s[(len-i)] + ret;
          if( i % 3  === 0 && i < len) {
            ret = separate + ret;
          }
        }
        return ret;
    }
}
export default formatMoney;
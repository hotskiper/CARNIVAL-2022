export default {
    numFormatMoney(num) {
 
        //1.使用split把字符串分割成数组;
        //2.使用reverse将数组进行翻转;
        let arr = String(num).split('').reverse();
         
        //3.遍历数组，并在第(i+1)%4，第四个前用splice(i,0,',')插入",";
        arr.forEach((item, i) => {
             if((i+1)%4==0){
                 arr.splice(i,0,',');
            }
        })
        arr.reverse(); // 1 , 2 5 8 , 7 4 6
         
        //4.使用reverse再次翻转数组，遍历数组，空字符追加每个值;
        let str = '';
        arr.forEach((item, i) => {
            str += item	
        })
        return str
     
    }
}
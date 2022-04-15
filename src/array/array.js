let array =[1, 2, 3, 4, 5, 7, 8, 9];

function find_missing_number(array){
    let sum =0 ;
    for (let x in array){
    sum += array[x];

}
let n = array.length + 1;
expected_sum + Math.floor((n*(n+1))/2);
return expected_sum -sum;
}
find_missing_number(array);
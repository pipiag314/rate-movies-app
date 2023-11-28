export const prettyNumber = (num: number) => {
    let array = String(num).split("").reverse();
    let newArray = array.map((n, index) => {
        let indx = index + 1;
        if(indx === array.length) return n;
        if(indx % 3 === 0) return "," + n;
        return n;
    })
    return newArray.reverse().join("");
}


let checkIfMobile = (): boolean => {
   const ifMobile:boolean = window.innerWidth < 768 ? true : false;
    return ifMobile;
}



export default checkIfMobile;
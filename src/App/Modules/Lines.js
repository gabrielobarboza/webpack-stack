const horizontalLine = (o, d, a, b) => {
    // console.log('horizontal', o, d, a, b)
    let array = [];
    let {x} = o
    let y = o.y != d.y;
    
    while(x < d.x){
        let dot = {
            x,
            y: y ? (a*x)+b : d.y
        }

        dot.x = parseInt(dot.x)
        dot.y = parseInt(dot.y)
        
        array.push(dot)
        x++
    }

    return array
}

const verticalLine = (o, d, a, b) => {
    // console.log('vertical', o, d, a, b)
    let array = [];
    let {y} = o;
    let x = o.x != d.x;
    
    while(y < d.y){
        let dot = {
            y,
            x: x ? (y-b)/a : d.x
        }

        dot.x = parseInt(dot.x)
        dot.y = parseInt(dot.y)

        array.push(dot)
        y++
    }

    return array        
}

export const lineSpitter = (o, d) => {
    // console.log(o, d)

    let a, b, c, xo, xd, xr, yo, yd, yr, r;
        
    xo = o.x;
    yo = o.y;
    xd = d.x;
    yd = d.y;
    xr = xd - xo;
    yr = yd - yo;
    
    a = yr/xr;
    b = (a*(0-xo)) + yo;

    r = []

    if( Math.abs(xr) >= Math.abs(yr) || yr == 0) {
        let lo = xr < 0 ? d : o
        let ld = xr < 0 ? o : d

        r = horizontalLine(lo, ld, a, b)
    } else if ( Math.abs(xr) < Math.abs(yr) || xr == 0) {
        let lo = yr < 0 ? d : o
        let ld = yr < 0 ? o : d

        r = verticalLine(lo, ld, a, b)        
    }
    
    return r
}

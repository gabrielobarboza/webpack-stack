let Icons = []

const slicePath = str => {
    const
    r = /(.*)\/((.*)\.(jpe?g|png|gif|svg))$/i,
    o = {
        path: '',
        file: '',
        name: ''
    }

    str.replace(r, match => {
        o.path = str.replace(r, '$1')
        o.file = str.replace(r, '$2')
        o.name = str.replace(r, '$3')
        o.ext = str.replace(r, '$4')
    })

    return o;
}

function ImportSVG(r) {
    return r.keys().map(file => {
        const res = slicePath(file)

        Icons.push({
            path : file.replace('./icons', '/icons'),
            name : res.name,
            component : r(file)
        })
    });
}

ImportSVG(require.context('Assets/svg', true, /\.(svg)$/i));

function importAllImages(r) {
    return r.keys().map(r);
}

importAllImages(require.context('Assets/images', true, /\.(png|jpe?g)$/));

export {
   Icons,
   slicePath 
};

function importAllImages(r) {
    return r.keys().map(r);
}

importAllImages(require.context('Assets/images', true, /\.(png|jpe?g)$/));

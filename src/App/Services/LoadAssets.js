function importAllAssets(r) {
    return r.keys().map(r);
}

importAllAssets(require.context('Assets/images', true, /\.(png|jpe?g)$/));
importAllAssets(require.context('Assets/fonts', true, /\.(ttf|eot|woff|woff2|svg?g)$/));


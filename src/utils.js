function normalize(o) {
    const isStrId = /(.*)id_str$/i;
    const copy = JSON.parse(JSON.stringify(o), function(k, v) {
        let m = isStrId.exec(k);
        if (m) {
            this[m[1] + 'id'] = v;
            return;
        }
        if ('created_at' === k) {
            return new Date(Date.parse(v)).toISOString().replace(/\.000Z$/, 'Z');
        }
        return v;
    });
    return copy;
}

function serialize(array) {
    if (!array || !array.length) {
        return array;
    }
    return array
        .map(normalize)
        .map(item => ({ comparator: Date.parse(item.created_at), content: item }))
        .sort((a, b) => b.comparator - a.comparator)
        .map(item => item.content);
}

module.exports = {
    normalize,
    serialize
};

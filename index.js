let char_to_idx = null;
let model = null;

function randomChoice(weights) {
    var sum = weights.reduce((acc, el) => acc + el, 0);
    var acc = 0;
    weights = weights.map(el => (acc = el + acc));
    var rand = Math.random() * sum;
    return weights.filter(el => el <= rand).length;
}

function startWorking() {
    document.getElementById('spinner').style.display = 'initial'
    document.getElementById('refresh-button').disabled = true
}

function doneWorking() {
    document.getElementById('spinner').style.display = 'none'
    document.getElementById('refresh-button').disabled = false
}

function generateNames() {
    startWorking();

    const header = "\n";
    const idx_to_char = Object.entries(char_to_idx).reduce((res, [c, i]) => { res[i] = c; return res; }, {});
    const vocab_size = Object.keys(char_to_idx).length;
    const newline_symbol = char_to_idx["\n"];
    
    let sampled = Array.from(header);
    /* for c in header[:-1]:
        batch = np.zeros((1, 1))
        batch[0, 0] = char_to_idx[c]
        model.predict_on_batch(batch)
    */
    
    let remaining_newlines = 20;

    async function generateCharacter() {
        if (remaining_newlines === 0) {
            doneWorking();
            return;
        }

        let batch;
        if (sampled.length) {
            batch = tf.fill([1,1], char_to_idx[sampled[sampled.length - 1]]);
        } else {
            batch = tf.fill([1,1], Math.floor(Math.random() * vocab_size));
        }
        result = await model.predict(batch).data();
        sample = parseInt(Object.keys(idx_to_char)[randomChoice(result)]);
        sampled.push(idx_to_char[sample]);
        document.getElementById('names').innerHTML = sampled.join('').trim();

        if (sample === newline_symbol) remaining_newlines--;

        setTimeout(generateCharacter, 0);
    }
    generateCharacter();
}

Promise.all([fetch('model/1/char_to_idx.json'), tf.loadLayersModel('model/1/SavedModel-50-tfjs/model.json')]).then(async ([c2i_response, loaded_model]) => {
    char_to_idx = await c2i_response.json();
    model = loaded_model;
    generateNames();
});

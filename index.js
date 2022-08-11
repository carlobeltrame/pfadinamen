import { fill, loadLayersModel } from '@tensorflow/tfjs'
import search from './search.js'
import './keyboard-interaction.js'
import char_to_idx from './model/1/char_to_idx.json'

let model = null;

function randomChoice(weights) {
    let sum = weights.reduce((acc, el) => acc + el, 0);
    let acc = 0;
    weights = weights.map(el => (acc = el + acc));
    let rand = Math.random() * sum;
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

function noResults() {
    const paragraph = document.createElement('p');
    paragraph.innerText = 'Bedeutung unbekannt';
    return paragraph;
}

function searchAttribution() {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = 'Bedeutungen ähnlicher Namen von <a href="https://pfadinamen.ch" target="_blank">pfadinamen.ch</a>:';
    return paragraph;
}

function explanation(searchResult) {
    const dt = document.createElement('dt');
    dt.innerText = searchResult.item.name;
    const dd = document.createElement('dd');
    dd.innerText = searchResult.item.desc;
    const wrapper = document.createElement('div');
    wrapper.append(dt);
    wrapper.append(dd);
    return wrapper;
}

function explanations(searchResults) {
    const list = document.createElement('dl');
    searchResults.slice(0, 3).map(explanation).forEach((expl) => {
        list.append(expl);
    });
    return list;
}

function nameClicked({ target: checkbox }) {
    document.querySelectorAll('.collapse-trigger').forEach(t => {
       if (t === checkbox) {
           return;
       }
       t.checked = false;
    });
    const name = checkbox.nextSibling.innerHTML;
    const explanation = checkbox.nextSibling.nextSibling;
    if (explanation.innerHTML !== '') {
        explanation.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
    }
    const searchResults = search(name);
    if (searchResults.length === 0) {
        explanation.append(noResults());
        return;
    }
    explanation.append(searchAttribution());
    explanation.append(explanations(searchResults));
    explanation.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

function addLine(display) {
    const line = document.createElement('div');
    const checkboxId = (Math.random() + 1).toString(36).substring(7);

    // <input type="checkbox" id="xxyyzz" class="collapse-trigger"/>
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', checkboxId);
    checkbox.setAttribute('class', 'collapse-trigger');
    checkbox.onchange = nameClicked;
    checkbox.addEventListener('keyup', e => {
        if (e.code === 'Enter') {
            checkbox.checked = !checkbox.checked;
            nameClicked({ target: checkbox });
            checkbox.nextSibling.scrollIntoView({ behavior: 'smooth' });
        }
    })

    // <label for="xxyyzz" class="collapse-trigger-label" role="button">Generated Name</label>
    const label = document.createElement('label');
    label.setAttribute('for', checkboxId);
    label.setAttribute('class', 'collapse-trigger-label');
    label.setAttribute('role', 'button');

    // <div class="collapsible explanation"></div>
    const collapsible = document.createElement('div');
    collapsible.setAttribute('class', 'collapsible explanation');

    line.append(checkbox);
    line.append(label);
    line.append(collapsible);
    display.append(line);
}

function generateNames() {
    startWorking();

    const header = "\n";
    const idx_to_char = Object.entries(char_to_idx).reduce((res, [c, i]) => { res[i] = c; return res; }, {});
    const vocab_size = Object.keys(char_to_idx).length;
    const newline_symbol = char_to_idx["\n"];
    const display = document.getElementById('names');
    display.innerHTML = '';
    addLine(display);
    
    let sampled = Array.from(header);
    /* for c in header[:-1]:
        batch = np.zeros((1, 1))
        batch[0, 0] = char_to_idx[c]
        model.predict_on_batch(batch)
    */
    
    let remaining_newlines = 12;

    async function generateCharacter() {
        if (remaining_newlines === 0) {
            doneWorking();
            return;
        }

        let batch;
        if (sampled.length) {
            batch = fill([1,1], char_to_idx[sampled[sampled.length - 1]]);
        } else {
            batch = fill([1,1], Math.floor(Math.random() * vocab_size));
        }
        let result = await model.predict(batch).data();
        let sample = parseInt(Object.keys(idx_to_char)[randomChoice(result)]);
        sampled.push(idx_to_char[sample]);
        const character = idx_to_char[sample];

        if (sample === newline_symbol && remaining_newlines > 1) {
            addLine(display);
        } else {
            const word = display.childNodes[display.childNodes.length - 1].childNodes[1];
            word.innerHTML = word.innerHTML + character;
        }

        if (sample === newline_symbol) remaining_newlines--;

        setTimeout(generateCharacter, 0);
    }
    generateCharacter();
}

loadLayersModel('/model.json').then(async (loaded_model) => {
    model = loaded_model;
    generateNames();

    document.getElementById('refresh-button').onclick = generateNames;
});

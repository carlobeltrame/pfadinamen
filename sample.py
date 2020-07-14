import argparse
import json
import os

import numpy as np
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dropout, TimeDistributed, Dense, Activation, Embedding

from model import build_sample_model, load_weights
from normalize import STARTING_LETTERS

from pprint import pprint

DATA_DIR = './data'
MODEL_DIR = './model/1'

def sample(epoch, header, num_lines):
    with open(os.path.join(MODEL_DIR, 'char_to_idx.json'), 'r') as f:
        char_to_idx = json.load(f)
    idx_to_char = { i: ch for (ch, i) in list(char_to_idx.items()) }
    vocab_size = len(char_to_idx)
    newline_symbol = char_to_idx['\n']

    model = build_sample_model(vocab_size)
    load_weights(epoch, model)

    sampled = [char_to_idx[c] for c in header]
    for c in header[:-1]:
        batch = np.zeros((1, 1))
        batch[0, 0] = char_to_idx[c]
        model.predict_on_batch(batch)

    for i in range(num_lines):
        sample = -1
        while not sample == newline_symbol:
            batch = np.zeros((1, 1))
            if sampled:
                batch[0, 0] = sampled[-1]
            else:
                batch[0, 0] = np.random.randint(vocab_size)
            result = model.predict_on_batch(batch).ravel()
            sample = np.random.choice(list(range(vocab_size)), p=result)
            sampled.append(sample)

    return ''.join(idx_to_char[c] for c in sampled).strip()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Sample some text from the trained model.')
    parser.add_argument('epoch', type=int, help='epoch checkpoint to sample from')
    parser.add_argument('--seed', default='\n', help='initial seed for the generated text')
    parser.add_argument('--len', type=int, default=20, help='number of lines to sample (default 20)')
    args = parser.parse_args()

    print(sample(args.epoch, args.seed, args.len))

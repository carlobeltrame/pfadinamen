import argparse
import os
import re
from pathlib import Path

from train import DATA_DIR

STARTING_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜËÏÊÉÈÑ'
CONTINUATION_LETTERS = 'abcdefghijklmnopqrstuvwxyzäöüëïêéèñ'

def normalize(line):
    line = line.strip()
    if len(line) == 0:
        return ''
    splits = re.split(r'[/,]', line)
    if len(splits) > 1:
        return ''.join(normalize(part) for part in splits)
    if not re.search(rf"^[{STARTING_LETTERS}][{CONTINUATION_LETTERS}]*(-[{STARTING_LETTERS}][{CONTINUATION_LETTERS}]*)*$", line):
        if not re.search(r'\s', line):
            print(line)
        return ''
    return line + '\n'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Normalize a training data file.')
    parser.add_argument('--input', default='input.txt',
                        help='name of the text file to normalize')
    parser.add_argument('--output', default='input-normalized.txt',
                        help='name of the file that the results are written to')
    args = parser.parse_args()

    with open(os.path.join(DATA_DIR, args.input), 'r', encoding='utf-8') as data_file:
        with open(os.path.join(DATA_DIR, args.output), 'w', encoding='utf-8') as output_file:
            for line in data_file:
                output_file.write(normalize(line))


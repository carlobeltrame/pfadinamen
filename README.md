# Pfadinamen-Generator

This repository contains a [char-rnn](https://github.com/ekzhang/char-rnn-keras) that was trained with roughly 20000 unique scout/CEVI/Jubla nicknames. It can generate a stream of names, generating novel names that are not in the training set about 74% of the time.

Example generated names:
```
Auk
Fälge
Truffi
Munti
Joye
Sussi
Pisedondi
Pauba
Giava
Kawela
Nave
Marena
Ahuk
Eboja
Orica
Astian
Sminyra
Tinimi
Krokos
Kirpper
```

It's not perfect, but usable as inspiration for new names, especially since it's cheap to generate new names.

How to use it:
```bash
# Build and run a Docker container for working with the model
docker build -t pfadinamen .
docker run -it --rm -v $(pwd):/app pfadinamen
# Normalize your input file (optional)
# This will print removed lines to stdout and write kept lines to the output file
python normalize.py --input=input.txt --output=input-normalized.txt
# Train the model using a training file in data/input.txt
python train.py --input input-normalized.txt
# Sample from a trained model at a specific epoch
python sample.py 50
```

Repeat the last command for a new set of 20 names, or add e.g. `--len 50` to generate 50 names at a time instead.

## Deployment as web service
The trained models are also saved in TensorFlow.js format, which allows to serve the models as static files and use them on the client (in JavaScript in the browser). This repository contains an index.html and index.js file, and can simply be deployed to any static file server. To deploy:

1. (Optional) Copy model.json and any .bin-files from your own trained model to the `public` directory
2. `yarn install`
3. `yarn run build`
4. Deploy the contents of the `dist` to your static file server.

The models can also be deployed using Tensorflow serving, since they are also saved in the SavedModel format.

## Updating the name explanation list
In regular intervals, pfadinamen.ch publishes newly added and corrected names and explanations. With the permission of the author, we are allowed to fetch them and prepare them in JSON format for offline use in this generator.
To fetch the most current explanations, execute `yarn run fetch-descriptions`.

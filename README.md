# Pfadinamen-Generator

This repository contains a [char-rnn](https://github.com/ekzhang/char-rnn-keras) that was trained with roughly 20000 unique scout/CEVI/Jubla nicknames. It can generate a stream of names, generating novel names that are not in the training set about 74% of the time.

TODO post new examples that were generated with the keras model
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
python train.py --input input-normalized.txt --epochs 50
# Sample from a trained model at a specific epoch
python sample.py 50
```

Repeat the last command for a new set of 20 names, or add e.g. `--len 50` to generate 50 names at a time instead.

## Deployment as web service
TODO something with tensorflow.js maybe?

## Deploying to OpenShift (note to self)
Publish a new version to Docker Hub:
```
docker build -t carlobeltrame/pfadinamen:latest
docker push carlobeltrame/pfadinamen:latest
```

Initial deploy in a project:
```
oc new-app carlobeltrame/pfadinamen
```

Deploy a newly published version:
```
oc import-image carlobeltrame/pfadinamen:latest
```
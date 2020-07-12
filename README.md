# Pfadinamen-Generator

This repository contains a [char-rnn](https://github.com/karpathy/char-rnn) that was trained with roughly 30000 unique scout/CEVI/Jubla nicknames. It can generate a stream of names, generating novel names that are not in the training set about 92% of the time.

Example generated names:
```
Okia
Quats
Ninon
Cimbreot
Pijuri
Solvet
Nonohi
Negas
Ludilli
Malu
Mia
Ciella
Porux
Phoo
Penta
Badisa
Tstragsu
Uelli
Guitin
Hazto
```

It's not perfect, but usable as inspiration for new names, especially since it's cheap to generate new names.

How to use it:
```bash
docker run -it --rm -v $(pwd):/root/torch-rnn/data -v $(pwd):/root/torch-rnn/cv carlobeltrame/char-rnn:latest bash
th sample.lua -checkpoint cv/checkpoint_4650.t7 -length 2000 -gpu -1
```

Repeat the second command for a new set of names.
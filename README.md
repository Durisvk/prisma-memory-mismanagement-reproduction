# Prisma Memory Mismanagement Reproduction

This repository should showcase a memory mismanagement in Prisma library starting at version 3.9.
The code itself is very simple. It executes a `findMany` query in a loop and monitors `process.memoryUsage().heapUsed`.

I cannot tell this is a memory leak because if you let it run for a while with higher number of iterations (see config.json)
it will eventually fall back to a lower memory usage for a while but most of the time it just keeps increasing.

How is one supposed to discover a memory leak in their application if the core library is behaving like this in between the requests?

## Setup

```bash
npm install
```

Make sure your docker daemon is running and then run:

```bash
docker-compose up -d
```

Or provide your own connection in a `.env` file

And then execute:

```bash
npm run setup
```

### Reproduction

#### Showcase memory management between 3.8 and 3.9

```bash
  npm run showcase
```

This will show you a difference between how the memory is managed in a `"Good memory management" case` (`version 3.8`) and in a `"Bad memory management" case` (`version 3.9`).

## Example logs:

### Sample Size 10000

````log
Good memory management:
Memory usage before: 14.417442321777344 MB
Average memory usage after 2000: 16.55 MB (+0.55 MB)
Average memory usage after 3000: 16.22 MB (-0.33 MB)
Average memory usage after 4000: 16.77 MB (+0.54 MB)
Average memory usage after 5000: 16.29 MB (-0.48 MB)
Average memory usage after 6000: 16.67 MB (+0.38 MB)
Average memory usage after 7000: 16.39 MB (-0.27 MB)
Average memory usage after 8000: 16.56 MB (+0.17 MB)
Average memory usage after 9000: 16.47 MB (-0.09 MB)
Memory usage after: 15.415885925292969 MB

Bad memory management:
Memory usage before: 14.683357238769531 MB
Average memory usage after 2000: 17.91 MB (+1.36 MB)
Average memory usage after 3000: 19.72 MB (+1.8 MB)
Average memory usage after 4000: 21.41 MB (+1.69 MB)
Average memory usage after 5000: 25.37 MB (+3.96 MB)
Average memory usage after 6000: 28.78 MB (+3.42 MB)
Average memory usage after 7000: 30.94 MB (+2.16 MB)
Average memory usage after 8000: 32.75 MB (+1.81 MB)
Average memory usage after 9000: 35.93 MB (+3.18 MB)
Memory usage after: 40.818809509277344 MB

### Sample Size 100000

```log
Good memory management:
Memory usage before: 14.514045715332031 MB
Average memory usage after 2000: 16.43 MB (+0.38 MB)
Average memory usage after 3000: 16.51 MB (+0.08 MB)
Average memory usage after 4000: 16.38 MB (-0.13 MB)
Average memory usage after 5000: 16.85 MB (+0.47 MB)
Average memory usage after 6000: 16.29 MB (-0.56 MB)
Average memory usage after 7000: 16.84 MB (+0.56 MB)
Average memory usage after 8000: 16.21 MB (-0.63 MB)
Average memory usage after 9000: 16.68 MB (+0.47 MB)
Average memory usage after 10000: 16.39 MB (-0.29 MB)
Average memory usage after 11000: 16.9 MB (+0.5 MB)
Average memory usage after 12000: 16.68 MB (-0.21 MB)
Average memory usage after 13000: 16.8 MB (+0.12 MB)
Average memory usage after 14000: 16.81 MB (+0 MB)
Average memory usage after 15000: 16.66 MB (-0.14 MB)
Average memory usage after 16000: 16.97 MB (+0.31 MB)
Average memory usage after 17000: 16.53 MB (-0.44 MB)
Average memory usage after 18000: 17.01 MB (+0.48 MB)
Average memory usage after 19000: 16.54 MB (-0.47 MB)
Average memory usage after 20000: 16.89 MB (+0.35 MB)
Average memory usage after 21000: 16.7 MB (-0.19 MB)
Average memory usage after 22000: 16.76 MB (+0.06 MB)
Average memory usage after 23000: 16.85 MB (+0.09 MB)
Average memory usage after 24000: 16.62 MB (-0.23 MB)
Average memory usage after 25000: 17.01 MB (+0.39 MB)
Average memory usage after 26000: 16.51 MB (-0.5 MB)
Average memory usage after 27000: 16.98 MB (+0.46 MB)
Average memory usage after 28000: 16.55 MB (-0.43 MB)
Average memory usage after 29000: 16.87 MB (+0.32 MB)
Average memory usage after 30000: 16.72 MB (-0.15 MB)
Average memory usage after 31000: 16.73 MB (+0.01 MB)
Average memory usage after 32000: 16.87 MB (+0.14 MB)
Average memory usage after 33000: 16.62 MB (-0.25 MB)
Average memory usage after 34000: 14.68 MB (-1.94 MB)
Average memory usage after 35000: 14.47 MB (-0.21 MB)
Average memory usage after 36000: 14.19 MB (-0.27 MB)
Average memory usage after 37000: 14.41 MB (+0.21 MB)
Average memory usage after 38000: 14.39 MB (-0.02 MB)
Average memory usage after 39000: 14.4 MB (+0.02 MB)
Average memory usage after 40000: 14.41 MB (+0.01 MB)
Average memory usage after 41000: 14.43 MB (+0.02 MB)
Average memory usage after 42000: 14.91 MB (+0.47 MB)
Average memory usage after 43000: 15.22 MB (+0.31 MB)
Average memory usage after 44000: 15.24 MB (+0.02 MB)
Average memory usage after 45000: 15.24 MB (-0.01 MB)
Average memory usage after 46000: 15.22 MB (-0.01 MB)
Average memory usage after 47000: 15.19 MB (-0.03 MB)
Average memory usage after 48000: 15.2 MB (+0.01 MB)
Average memory usage after 49000: 15.22 MB (+0.02 MB)
Average memory usage after 50000: 15.22 MB (0 MB)
Average memory usage after 51000: 15.22 MB (0 MB)
Average memory usage after 52000: 15.23 MB (+0.01 MB)
Average memory usage after 53000: 15.24 MB (+0.01 MB)
Average memory usage after 54000: 15.24 MB (+0 MB)
Average memory usage after 55000: 15.2 MB (-0.05 MB)
Average memory usage after 56000: 15.19 MB (0 MB)
Average memory usage after 57000: 15.19 MB (0 MB)
Average memory usage after 58000: 15.21 MB (+0.01 MB)
Average memory usage after 59000: 15.22 MB (+0.01 MB)
Average memory usage after 60000: 15.22 MB (+0.01 MB)
Average memory usage after 61000: 15.23 MB (+0.01 MB)
Average memory usage after 62000: 15.24 MB (+0.01 MB)
Average memory usage after 63000: 15.26 MB (+0.02 MB)
Average memory usage after 64000: 15.31 MB (+0.05 MB)
Average memory usage after 65000: 17 MB (+1.69 MB)
Average memory usage after 66000: 16.73 MB (-0.28 MB)
Average memory usage after 67000: 16.87 MB (+0.15 MB)
Average memory usage after 68000: 16.86 MB (-0.02 MB)
Average memory usage after 69000: 16.76 MB (-0.1 MB)
Average memory usage after 70000: 17.04 MB (+0.29 MB)
Average memory usage after 71000: 16.62 MB (-0.42 MB)
Average memory usage after 72000: 17.1 MB (+0.47 MB)
Average memory usage after 73000: 16.58 MB (-0.52 MB)
Average memory usage after 74000: 16.99 MB (+0.41 MB)
Average memory usage after 75000: 16.77 MB (-0.22 MB)
Average memory usage after 76000: 16.86 MB (+0.09 MB)
Average memory usage after 77000: 16.92 MB (+0.06 MB)
Average memory usage after 78000: 16.73 MB (-0.19 MB)
Average memory usage after 79000: 17.07 MB (+0.33 MB)
Average memory usage after 80000: 16.6 MB (-0.47 MB)
Average memory usage after 81000: 17.07 MB (+0.47 MB)
Average memory usage after 82000: 16.63 MB (-0.45 MB)
Average memory usage after 83000: 16.95 MB (+0.32 MB)
Average memory usage after 84000: 16.78 MB (-0.17 MB)
Average memory usage after 85000: 16.84 MB (+0.07 MB)
Average memory usage after 86000: 16.93 MB (+0.09 MB)
Average memory usage after 87000: 16.72 MB (-0.22 MB)
Average memory usage after 88000: 17.09 MB (+0.38 MB)
Average memory usage after 89000: 16.59 MB (-0.5 MB)
Average memory usage after 90000: 17.06 MB (+0.47 MB)
Average memory usage after 91000: 16.65 MB (-0.41 MB)
Average memory usage after 92000: 16.93 MB (+0.29 MB)
Average memory usage after 93000: 16.81 MB (-0.12 MB)
Average memory usage after 94000: 16.82 MB (+0.02 MB)
Average memory usage after 95000: 16.96 MB (+0.13 MB)
Average memory usage after 96000: 16.67 MB (-0.28 MB)
Average memory usage after 97000: 17.13 MB (+0.46 MB)
Average memory usage after 98000: 16.56 MB (-0.58 MB)
Average memory usage after 99000: 16.97 MB (+0.42 MB)
Memory usage after: 15.145706176757812 MB

Bad memory management:
Memory usage before: 14.58050537109375 MB
Average memory usage after 2000: 18 MB (+1.51 MB)
Average memory usage after 3000: 19.84 MB (+1.84 MB)
Average memory usage after 4000: 21.43 MB (+1.58 MB)
Average memory usage after 5000: 25.44 MB (+4.01 MB)
Average memory usage after 6000: 28.71 MB (+3.27 MB)
Average memory usage after 7000: 30.91 MB (+2.2 MB)
Average memory usage after 8000: 32.74 MB (+1.83 MB)
Average memory usage after 9000: 35.97 MB (+3.23 MB)
Average memory usage after 10000: 37.15 MB (+1.18 MB)
Average memory usage after 11000: 39.84 MB (+2.69 MB)
Average memory usage after 12000: 42.66 MB (+2.83 MB)
Average memory usage after 13000: 43.69 MB (+1.02 MB)
Average memory usage after 14000: 47.06 MB (+3.37 MB)
Average memory usage after 15000: 48.79 MB (+1.73 MB)
Average memory usage after 16000: 42.38 MB (-6.41 MB)
Average memory usage after 17000: 21.81 MB (-20.57 MB)
Average memory usage after 18000: 22.49 MB (+0.68 MB)
Average memory usage after 19000: 25.71 MB (+3.22 MB)
Average memory usage after 20000: 27.56 MB (+1.85 MB)
Average memory usage after 21000: 29.55 MB (+1.99 MB)
Average memory usage after 22000: 32.72 MB (+3.18 MB)
Average memory usage after 23000: 33.89 MB (+1.17 MB)
Average memory usage after 24000: 23.69 MB (-10.21 MB)
Average memory usage after 25000: 22 MB (-1.69 MB)
Average memory usage after 26000: 23.99 MB (+1.99 MB)
Average memory usage after 27000: 27.19 MB (+3.21 MB)
Average memory usage after 28000: 20.96 MB (-6.24 MB)
Average memory usage after 29000: 19.69 MB (-1.27 MB)
Average memory usage after 30000: 22.69 MB (+3 MB)
Average memory usage after 31000: 25.29 MB (+2.6 MB)
Average memory usage after 32000: 21.38 MB (-3.91 MB)
Average memory usage after 33000: 20.14 MB (-1.24 MB)
Average memory usage after 34000: 22.91 MB (+2.77 MB)
Average memory usage after 35000: 23.77 MB (+0.86 MB)
Average memory usage after 36000: 22.05 MB (-1.73 MB)
Average memory usage after 37000: 20.26 MB (-1.78 MB)
Average memory usage after 38000: 21.97 MB (+1.71 MB)
Average memory usage after 39000: 23.88 MB (+1.91 MB)
Average memory usage after 40000: 27.05 MB (+3.17 MB)
Average memory usage after 41000: 23.47 MB (-3.58 MB)
Average memory usage after 42000: 20.43 MB (-3.03 MB)
Average memory usage after 43000: 22.01 MB (+1.58 MB)
Average memory usage after 44000: 23.93 MB (+1.91 MB)
Average memory usage after 45000: 27.14 MB (+3.21 MB)
Average memory usage after 46000: 28.43 MB (+1.29 MB)
Average memory usage after 47000: 31.09 MB (+2.67 MB)
Average memory usage after 48000: 21.57 MB (-9.53 MB)
Average memory usage after 49000: 20.45 MB (-1.11 MB)
Average memory usage after 50000: 22.49 MB (+2.03 MB)
Average memory usage after 51000: 25.67 MB (+3.19 MB)
Average memory usage after 52000: 22.64 MB (-3.03 MB)
Average memory usage after 53000: 20.41 MB (-2.23 MB)
Average memory usage after 54000: 21.77 MB (+1.37 MB)
Average memory usage after 55000: 23.95 MB (+2.17 MB)
Average memory usage after 56000: 27.15 MB (+3.2 MB)
Average memory usage after 57000: 23.44 MB (-3.71 MB)
Average memory usage after 58000: 20.33 MB (-3.1 MB)
Average memory usage after 59000: 21.79 MB (+1.46 MB)
Average memory usage after 60000: 23.96 MB (+2.17 MB)
Average memory usage after 61000: 27.16 MB (+3.19 MB)
Average memory usage after 62000: 28.14 MB (+0.98 MB)
Average memory usage after 63000: 31.07 MB (+2.93 MB)
Average memory usage after 64000: 21.96 MB (-9.11 MB)
Average memory usage after 65000: 20.3 MB (-1.66 MB)
Average memory usage after 66000: 22.53 MB (+2.23 MB)
Average memory usage after 67000: 25.72 MB (+3.19 MB)
Average memory usage after 68000: 22.68 MB (-3.05 MB)
Average memory usage after 69000: 20.47 MB (-2.2 MB)
Average memory usage after 70000: 21.62 MB (+1.14 MB)
Average memory usage after 71000: 23.98 MB (+2.37 MB)
Average memory usage after 72000: 23.04 MB (-0.95 MB)
Average memory usage after 73000: 20.51 MB (-2.53 MB)
Average memory usage after 74000: 20.98 MB (+0.47 MB)
Average memory usage after 75000: 24.08 MB (+3.1 MB)
Average memory usage after 76000: 26.37 MB (+2.29 MB)
Average memory usage after 77000: 19.53 MB (-6.84 MB)
Average memory usage after 78000: 21.51 MB (+1.98 MB)
Average memory usage after 79000: 22.41 MB (+0.9 MB)
Average memory usage after 80000: 25.55 MB (+3.14 MB)
Average memory usage after 81000: 27.84 MB (+2.29 MB)
Average memory usage after 82000: 29.55 MB (+1.7 MB)
Average memory usage after 83000: 23.62 MB (-5.92 MB)
Average memory usage after 84000: 19.61 MB (-4.01 MB)
Average memory usage after 85000: 22.76 MB (+3.15 MB)
Average memory usage after 86000: 24.99 MB (+2.23 MB)
Average memory usage after 87000: 26.65 MB (+1.66 MB)
Average memory usage after 88000: 28.99 MB (+2.34 MB)
Average memory usage after 89000: 18.96 MB (-10.03 MB)
Average memory usage after 90000: 21.43 MB (+2.47 MB)
Average memory usage after 91000: 23.61 MB (+2.18 MB)
Average memory usage after 92000: 25.3 MB (+1.69 MB)
Average memory usage after 93000: 28.43 MB (+3.13 MB)
Average memory usage after 94000: 30.07 MB (+1.65 MB)
Average memory usage after 95000: 21.06 MB (-9.01 MB)
Average memory usage after 96000: 20.85 MB (-0.21 MB)
Average memory usage after 97000: 22.45 MB (+1.6 MB)
Average memory usage after 98000: 25.65 MB (+3.2 MB)
Average memory usage after 99000: 27.18 MB (+1.52 MB)
Memory usage after: 16.68018341064453 MB
````

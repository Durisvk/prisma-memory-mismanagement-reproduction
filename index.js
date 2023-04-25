const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const SAMPLING_INTERVAL = 1000;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  // the following findMany is here to load all the compiled code needed for execution
  // (it's )
  await prisma.test.findMany();

  console.log(
    `Memory usage before: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`
  );

  let sumMemoryUsage = 0;
  let lastAverage = 0;
  for (let i = 0; i < 10000; i++) {
    await prisma.test.findMany();

    sumMemoryUsage += process.memoryUsage().heapUsed;

    if (i % SAMPLING_INTERVAL === 0) {
      if (i === 0) continue;

      const average = sumMemoryUsage / SAMPLING_INTERVAL;
      const diff = average - lastAverage;

      lastAverage = average;
      sumMemoryUsage = 0;

      if (i === SAMPLING_INTERVAL) continue;
      console.log(
        `Average memory usage after ${i}: ${
          Math.round((average / 1024 / 1024) * 100) / 100
        } MB (${diff > 0 ? "+" : ""}${
          Math.round((diff / 1024 / 1024) * 100) / 100
        } MB)`
      );
    }
  }

  console.log(
    `Memory usage after: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`
  );

  await prisma.$disconnect();
}

main();

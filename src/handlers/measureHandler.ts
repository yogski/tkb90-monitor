export async function measureExecutionTime<T>(fn: () => Promise<T>, label: string): Promise<T> {
    const start = process.hrtime();
    const result = await fn();
    const end = process.hrtime(start);
    const elapsed = end[0] * 1000 + end[1] / 1000000; // convert to milliseconds
    console.log(`Done processing ${label} in ${elapsed.toFixed(1)} ms.`);
    return result;
}
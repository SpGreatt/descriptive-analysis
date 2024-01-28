class DescriptiveStatistics {
  constructor(data) {
    this.data = data;
  }

  computeMean() {
    const sum = this.data.reduce((acc, val) => acc + val, 0);
    return sum / this.data.length;
  }

  computeMedian() {
    const sortedData = this.data.slice().sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);

    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  }

  computeMode() {
    const frequencyMap = new Map();
    for (const num of this.data) {
      frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    let maxFrequency = 0;
    let mode = [];

    frequencyMap.forEach((freq, num) => {
      if (freq > maxFrequency) {
        maxFrequency = freq;
        mode = [num];
      } else if (freq === maxFrequency) {
        mode.push(num);
      }
    });

    return mode.length === this.data.length ? [] : mode;
  }

  computeRange() {
    const sortedData = this.data.slice().sort((a, b) => a - b);
    return sortedData[sortedData.length - 1] - sortedData[0];
  }

  computeVariance() {
    const mean = this.computeMean();
    const squaredDifferences = this.data.map((num) => (num - mean) ** 2);
    return squaredDifferences.reduce((acc, val) => acc + val, 0) / this.data.length;
  }

  computeStandardDeviation() {
    return Math.sqrt(this.computeVariance());
  }

  computeSkewness() {
    const mean = this.computeMean();
    const variance = this.computeVariance();
    const cubedDifferences = this.data.map((num) => (num - mean) ** 3);
    return (
      (cubedDifferences.reduce((acc, val) => acc + val, 0) / this.data.length) /
      Math.pow(variance, 3 / 2)
    );
  }

  computeKurtosis() {
    const mean = this.computeMean();
    const variance = this.computeVariance();
    const fourthPowerDifferences = this.data.map((num) => (num - mean) ** 4);
    return (
      (fourthPowerDifferences.reduce((acc, val) => acc + val, 0) / this.data.length) /
      Math.pow(variance, 2)
    );
  }
}

// Example usage
const data = [2, 4, 4, 4, 5, 5, 7, 9];
const stats = new DescriptiveStatistics(data);

console.log('Mean:', stats.computeMean());
console.log('Median:', stats.computeMedian());
console.log('Mode:', stats.computeMode());
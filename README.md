# K-Means Clustering

## Usage
```js
const Cluster = require('kmeans-clustering').Cluster;

const dataPoints = [
    [2, 10],
    [2, 5],
    [8, 4],
    [5, 8],
    [7, 5],
    [6, 4],
    [1, 2],
    [4, 9],
];

const cluster = new Cluster(3, dataPoints);
cluster.setDistanceMethod(Cluster.DIST.MANHATTAN);
cluster.setDecimalPoints(2);
cluster.setLimit(300);

cluster
    .getClusters()
    .then(res => console.log(JSON.stringify(res)));

/*
    res = {
        "centroids": [[3.67, 9], [1.5, 3.5], [7, 4.33]],
        "clusters": [[[2, 10], [5, 8], [4, 9]], [[2, 5], [1, 2]], [[8, 4], [7, 5], [6, 4]]]
    }
*/
```

# K-Means Clustering

K-Means Clustering algorithm with integrated upper limit for iteration count

## Install

Installing with npm
`npm install --save @enigmaoffline/kmeans-clustering`

## Usage

```js
const Cluster = require("@enigmaoffline/kmeans-clustering").Cluster;

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

cluster.getClusters().then((res) => console.log(JSON.stringify(res)));

/*
    res = {
        "centroids": [[3.67, 9], [1.5, 3.5], [7, 4.33]],
        "clusters": [[[2, 10], [5, 8], [4, 9]], [[2, 5], [1, 2]], [[8, 4], [7, 5], [6, 4]]]
    }
*/
```

| Function            | Functionality                                                                                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| constructor()       | takes two parameters</br>1) number of clusters (k)</br>2) datapoints                                                                                                       |
| setDistanceMethod() | sets the distance calculation method, either euclidean</br>distance, or manhattan distance.                                                                                |
| setDecimalPoints()  | sets the number of decimal points centroids are rounded</br>to on return.                                                                                                  |
| setLimit()          | sets the upper limit of iterations the algorithm will run</br>before it quits even though the</br>values have yet to converge.                                             |
| getClusters()       | async function that groups datapoints into k clusters</br>terminates on either</br>1) all values converge and no changes happen</br>2) iteration count exceeds upper limit |

<a href="https://github.com/lochungtin/kmeans-clustering/blob/master/LICENSE">LICENSE - MIT - Lo Chung Tin</a>

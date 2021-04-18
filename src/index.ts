import { euclidean, manhattan } from './utils/distance';
import { keygen } from './utils/keygen';

export class Cluster {

    static DIST = {
        "EUCLIDEAN": "EUCLIDEAN",
        "MANHATTAN": "MANHATTAN"
    };

    clusters: number;

    iterations = 100;
    distanceM = Cluster.DIST.EUCLIDEAN;

    dataPoints: { [key: string]: Array<number> } = {};
    dataPointNo: number;

    constructor(clusters: number, dataPoints: Array<Array<number>>) {
        this.clusters = clusters;
        this.dataPointNo = dataPoints.length;
        dataPoints.forEach(pt => this.dataPoints[keygen()] = pt);
    }

    /**
     * sets upper limit of how many iterations before getClusters() force exits
     * default is 100
     * @param iterations number of iterations
     * @returns void
     */
    setLimit = (iterations: number) => this.iterations = iterations;

    /**
     * sets distance calculation method
     * either Cluster.DIST.EUCILDEAN or Cluster.DIST.MANHATTAN
     * default is Cluster.DIST.EUCILDEAN
     * @param distanceM distance calculation method
     * @returns void
     */
    setDistanceMethod = (distanceM: string) => this.distanceM = distanceM;

    /**
     * async function for converging clusters
     * ends when either:
     * 1) values converge
     * 2) iteration count exceeds upper limit
     * @returns clusters
     */
    getClusters = async () => {
        // select random points as centroid
        let rnArr: number[] = [];
        for (let i = 0; i < this.dataPointNo; ++i)
            rnArr.push(i);

        let centroidsIndex: number[] = [];
        for (let i = 0; i < this.clusters; ++i) {
            let index = (Math.random() * rnArr.length * 10) % rnArr.length;
            centroidsIndex.push(rnArr.splice(index, 1)[0]);
        }

        // assign values to centroid array
        let keyset = Object.keys(this.dataPoints);
        let centroids: number[][] = [];
        centroidsIndex.forEach(index => centroids.push(this.dataPoints[keyset[index]]));

        // iterate
        let iterationCounter: number = 0;
        let changes: boolean = false;
        while (iterationCounter++ < this.iterations && !changes) {
            keyset.forEach(key => {
                let pt: Array<number> = this.dataPoints[key];

                let nearest: number = -1;
                let nearestIndex: number = -1;

                // find nearest centroid
                centroids.forEach((centroid, index) => {
                    let distance: number;
                    if (this.distanceM === Cluster.DIST.MANHATTAN) 
                        distance = manhattan(centroid, pt);
                    else 
                        distance = euclidean(centroid, pt);
                    
                    if (nearest === -1 || distance < nearest) {
                        nearest = distance;
                        nearestIndex = index;
                    }
                });


            });
        }

        return;
    }
}

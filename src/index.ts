import { euclidean, manhattan } from './utils/distance';
import { round } from './utils/math';
import { genSequence } from './utils/random';

interface dataPointInterface {
    data: Array<number>,
    clusterIndex: number,
}

export class Cluster {

    static DIST = {
        "EUCLIDEAN": "EUCLIDEAN",
        "MANHATTAN": "MANHATTAN"
    };

    private clusters: number;

    private iterations: number = 100;
    private distanceM: string = Cluster.DIST.EUCLIDEAN;

    private dataDim: number;
    private dataPointNo: number;
    private dataPoints: Array<dataPointInterface> = [];

    private centroids: Array<Array<number>> = [];

    private decimalPoints: number = 3;

    constructor(clusters: number, dataPoints: Array<Array<number>>) {
        this.clusters = clusters;
        this.dataPointNo = dataPoints.length;
        this.dataDim = dataPoints[0].length;

        dataPoints.forEach(pt => {
            this.dataPoints.push({
                data: pt,
                clusterIndex: -1,
            });
        });
    }

    /**
     * sets upper limit of how many iterations before getClusters() force exits
     * default is 100
     * @param iterations number of iterations
     * @returns void
     */
    setLimit = (iterations: number) => this.iterations = iterations;

    /**
     * sets distance calculation method,
     * either Cluster.DIST.EUCILDEAN or Cluster.DIST.MANHATTAN,
     * default is Cluster.DIST.EUCILDEAN
     * @param distanceM distance calculation method
     * @returns void
     */
    setDistanceMethod = (distanceM: string) => this.distanceM = distanceM;

    /**
     * sets the decimal points when rounding the centroid values,
     * only applied on output to maximize precision
     * @param decimalPoints number of decimals
     * @returns void
     */
    setDecimalPoints = (decimalPoints: number) => this.decimalPoints = decimalPoints;

    /**
     * async function for converging clusters
     * ends when either:
     * 1) values converge
     * 2) iteration count exceeds upper limit
     * @returns Promise {{ centroids: [], clusters: [] }}
     */
    getClusters = async () => {
        // select initial centroids
        genSequence(this.dataPointNo, this.clusters).forEach(index => this.centroids.push(this.dataPoints[index].data));

        // iterate
        let changed: boolean = true;
        let iteration: number = 0;
        while (iteration++ < this.iterations && changed) {
            changed = false;

            // assign centroid
            this.dataPoints.forEach(obj => {
                let nearestCentroid = this.getNearestCentroid(obj.data);

                if (obj.clusterIndex != nearestCentroid) {
                    changed = true;
                    obj.clusterIndex = nearestCentroid;
                }
            });

            // recalculate new centroid
            this.centroids.length = 0;
            this.groupDataPoints().forEach(cluster => {
                let centroid = new Array(this.dataDim).fill(0);

                cluster.forEach(point => {
                    for (let i = 0; i < this.dataDim; ++i)
                        centroid[i] += point.data[i];
                });

                let len = cluster.length;
                for (let i = 0; i < this.dataDim; ++i)
                    centroid[i] /= len;

                this.centroids.push(centroid);
            });
        }

        this.centroids = this.centroids.map(centroid => centroid.map(num => round(num, this.decimalPoints)));

        return {
            centroids: this.centroids,
            clusters: this.groupDataPoints().map(cluster => cluster.map(point => point.data))
        };
    }

    private getNearestCentroid = (point: Array<number>) => {
        let nearestDist: number = -1;
        let nearestIndex: number = -1;

        this.centroids.forEach((centroid, index) => {
            let distance: number;
            if (this.distanceM == Cluster.DIST.MANHATTAN)
                distance = manhattan(centroid, point);
            else
                distance = euclidean(centroid, point);

            if (nearestDist == -1 || distance < nearestDist) {
                nearestDist = distance;
                nearestIndex = index;
            }
        });

        return nearestIndex;
    }

    private groupDataPoints = () => {
        // populate groups with K arrays
        let groups: Array<Array<dataPointInterface>> = [];
        for (let i = 0; i < this.clusters; ++i)
            groups.push(new Array());

        this.dataPoints.forEach(point => groups[point.clusterIndex].push(point));

        return groups;
    }
}

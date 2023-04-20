type Vehicle = {
  lp: string;
  type: string;
  dot: string;
  num: string;
  dam: string;
};

type Trailer = {
  type: string;
  lp: string;
  chassis: string;
  number: string;
  si: string;
  dam: string;
};

type Observation = {
  id: number;
  time: string;
  dir: string;
  vehicle: Vehicle;
  trailer: Trailer;
};

export class MergeService {
  observations: Observation[];
  count: number;

  constructor() {
    this.observations = [];
    this.count = 0;
  }

  merge(observation: Observation): void {
    if (this.count === 3) return;

    const duplicated = this.observations.find((item) =>
      this.isDuplicated(item, observation)
    );

    if (duplicated) {
      const index = this.observations
        .map((item) => item.id)
        .indexOf(duplicated.id);

      if (!observation.vehicle.type)
        duplicated.vehicle.type = observation.vehicle.type;
      if (!observation.vehicle.dam)
        duplicated.vehicle.dam = observation.vehicle.dam;

      if (!observation.trailer.type)
        duplicated.trailer.type = observation.trailer.type;
      if (!observation.trailer.dam)
        duplicated.trailer.dam = observation.trailer.dam;

      this.observations.splice(index, 1);
      this.count++;
      this.merge(duplicated);
    } else {
      this.observations.push(observation);
    }
  }

  isDuplicated(observation1: Observation, observation2: Observation): boolean {
    const timeDiff = this.timeDifferenceInMins(
      observation1.time,
      observation2.time
    );
    if (timeDiff > 15) return false;

    if (observation1.dir != observation2.dir) return false;

    if (
      observation1.vehicle.lp !== observation2.vehicle.lp ||
      observation1.vehicle.num !== observation2.vehicle.num ||
      observation1.vehicle.dot !== observation2.vehicle.dot
    )
      return false;

    if (
      observation1.trailer.lp !== observation2.trailer.lp ||
      observation1.trailer.chassis !== observation2.trailer.chassis ||
      observation1.trailer.number !== observation2.trailer.number ||
      observation1.trailer.si !== observation2.trailer.si
    )
      return false;

    return true;
  }

  timeDifferenceInMins(time1: string, time2: string): number {
    const digits1 = time1.split(":");
    const digits2 = time2.split(":");
    const hrDifference = parseInt(digits1[0]) - parseInt(digits2[0]);
    const minDifference = parseInt(digits1[1]) - parseInt(digits2[1]);
    const differnece = hrDifference * 60 + minDifference;

    return Math.abs(differnece);
  }
}

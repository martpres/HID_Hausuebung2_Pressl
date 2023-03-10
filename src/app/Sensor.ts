export interface Sensor {
    id: number;
    name: string;
    location: string;
    active: boolean;
    position: SensorPosition,
  }

  export enum SensorPosition {
      INDOOR = 1,
      OUTDOOR = 2,
      WATER = 3
  }
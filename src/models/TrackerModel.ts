import { DatabaseEntity } from '../classes/classesIndex';
import trackerSchema, { TRACKER } from '../schemas/TrackerSchema';

class Tracker extends DatabaseEntity {
  trackerId: String;
  courseId: String;

  constructor() {
    super();
    this.schema = trackerSchema;

    // this.trackerId = this.generateId();
    // this.courseId = courseId;

    // // Schema

    // // Partition keys
    // this.initializePartitionKeys(this.getPK(this.trackerId), this.getSK(this.trackerId));
  }

  getPK() {
    return `${TRACKER}_${this.trackerId}`;
  }

  getSK() {
    return `${TRACKER}_${this.trackerId}`;
  }

  getGSIKeysObject() {
    return {};
  }

  toItem() {
    return {
      trackerId: this.trackerId,
      courseId: this.courseId
    };
  }

  // TODO: Replicar esta lógica que consulta en BD la entidad a partir de su PK y su SK en vez de los GSIs
  // STATIC
  public static async getTracker(trackerId: String) {
    const tracker = new Tracker();

    tracker.trackerId = trackerId;

    tracker.initializePartitionKeys(tracker.getPK(), tracker.getSK());

    return await tracker.get();
  }
}

export { Tracker };

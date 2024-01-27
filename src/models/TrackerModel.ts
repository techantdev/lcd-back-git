import { DatabaseEntity } from '../classes/classesIndex';
import trackerSchema, { TRACKER, TrackerInterface } from '../schemas/TrackerSchema';

class Tracker extends DatabaseEntity {
  private trackerId: String;
  private courseId: String;

  constructor() {
    super();
    this.schema = trackerSchema;
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
      // FALTA trackerRows
    };
  }

  // TODO: Replicar esta lógica que consulta en BD la entidad a partir de su PK y su SK en vez de los GSIs
  // STATIC

  public static getPK(trackerId: String) {
    return `${TRACKER}_${trackerId}`;
  }

  public static getSK(trackerId: String) {
    return `${TRACKER}_${trackerId}`;
  }

  public static fromDB(item: TrackerInterface) {
    const newTracker = new Tracker();

    newTracker.trackerId = item.yearSubjectId;

    // Attributes from params
    newTracker.courseId = item.courseId;
    //newTracker.yearAreaId = item.yearAreaId;

    // Partition keys
    newTracker.initializePartitionKeys(newTracker.getPK(), newTracker.getSK());

    return newTracker.toItem();
  }

  public static async insertOne({ courseId }: { courseId: String }) {
    const newTracker = new Tracker();

    newTracker.trackerId = newTracker.generateId();

    // Attributes from params
    newTracker.courseId = courseId;
    //newTracker.yearAreaId = yearAreaId;

    // Partition keys
    newTracker.initializePartitionKeys(newTracker.getPK(), newTracker.getSK());

    await newTracker.save();

    return newTracker.toItem();
  }

  public static async insertMultiple(items: Object[]) {
    return [{}];
  }

  public static async getTracker(trackerId: String): Promise<TrackerInterface> {
    const tracker = new Tracker();

    tracker.trackerId = trackerId;

    tracker.initializePartitionKeys(tracker.getPK(), tracker.getSK());

    return await tracker.get();
  }
}

export { Tracker, TrackerInterface };

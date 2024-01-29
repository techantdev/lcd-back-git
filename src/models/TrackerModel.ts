import { DatabaseEntity } from '../classes/classesIndex';
import { TRACKER, TrackerDB, TrackerRaw, trackerSchemaDB } from '../schemas/TrackerSchema';

class Tracker extends DatabaseEntity {
  private trackerId: string;
  private courseId: string;

  constructor() {
    super();
    this.schema = trackerSchemaDB;
  }

  getPK() {
    return `${TRACKER}_${this.trackerId}`;
  }

  getSK() {
    return `${TRACKER}_${this.trackerId}`;
  }

  initializeFields(fields: TrackerRaw) {
    this.trackerId = fields.trackerId;
    this.courseId = fields.courseId;
  }

  getRawItem() {
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

  public static fromRawFields = (fields: TrackerDB) => {
    const instance = new Tracker();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({ courseId }: { courseId: string }) {
    const instance = new Tracker();
    instance.initializeFields({
      trackerId: Tracker.generateId(),
      courseId: courseId,
      trackerRows: []
    });
    return await instance.save<TrackerRaw>();
  }

  public static async insertMultiple(items: TrackerRaw[]) {
    return await Tracker.saveMultiple<TrackerRaw>(
      items.map(item => {
        const instance = new Tracker();
        instance.initializeFields({ ...item, trackerId: Tracker.generateId() });
        return instance;
      })
    );
  }

  public static async getTracker(trackerId: string) {
    const tracker = new Tracker();
    tracker.trackerId = trackerId;
    return await tracker.get();
  }
}

export { Tracker };

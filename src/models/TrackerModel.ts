import { DatabaseEntity } from '../classes/classesIndex';
import { TRACKER, TrackerDB, TrackerRaw, TrackerRows, trackerSchemaDB } from '../schemas/TrackerSchema';
import { getUpdateFields, updateItem } from '../services/dynamoService';

class Tracker extends DatabaseEntity {
  private trackerId: string;
  private courseId: string;
  private trackerRows: TrackerRows;
  private trackerCompletenessPercentage: number;

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
    this.courseId = fields.courseId || '';
    this.trackerRows = fields.trackerRows;
    this.trackerCompletenessPercentage = fields.trackerCompletenessPercentage;
  }

  getRawItem() {
    return {
      trackerId: this.trackerId,
      courseId: this.courseId,
      trackerRows: this.trackerRows,
      trackerCompletenessPercentage: this.trackerCompletenessPercentage
    };
  }

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

  public static async insertOne({
    courseId,
    rows,
    trackerCompletenessPercentage
  }: {
    courseId?: string;
    rows?: TrackerRows;
    trackerCompletenessPercentage: number;
  }) {
    const instance = new Tracker();
    instance.initializeFields({
      trackerId: Tracker.generateId(),
      courseId: courseId || '',
      trackerRows: rows || [],
      trackerCompletenessPercentage: trackerCompletenessPercentage
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
    const instance = new Tracker();
    instance.trackerId = trackerId;
    return await instance.get<TrackerDB>();
  }

  public static async updateOne(trackerId: string, data: { trackerRows: TrackerRows }) {
    // const setArray: string[] = [];
    // const keys = rows.reduce(
    //   (prev, { trackerRowIndex: _, ...properties }) => {
    //     Object.keys(properties).forEach(key => {
    //       if (!prev[`#${key}`]) {
    //         prev[`#${key}`] = key;
    //       }
    //     });
    //     return prev;
    //   },
    //   { '#trackerRows': 'trackerRows' } as Record<string, string>
    // );
    // const values: Record<string, any> = {};
    // rows.forEach(row => {
    //   const { trackerRowIndex, ...properties } = row;
    //   Object.entries(properties).forEach(([key, value]) => {
    //     const fieldKey = `#trackerRows[${trackerRowIndex}].#${key}`;
    //     const valueKey = `:${trackerRowIndex}${key}`;
    //     setArray.push(`${fieldKey} = ${valueKey}`);
    //     values[valueKey] = value;
    //   });
    // });

    // const updatedItem = await updateItem<TrackerDB>(
    //   Tracker.getPK(trackerId),
    //   Tracker.getSK(trackerId),
    //   `SET ${setArray.join(', ')}`,
    //   keys,
    //   values
    // );

    const weeksDone = data.trackerRows.filter(dato => dato.trackerRowStatus === 'DONE');
    const numberWeeksDone = weeksDone.length;
    const numberRowsTrackerRows = data.trackerRows.length;
    const percentage = (100 * numberWeeksDone) / numberRowsTrackerRows;
    const dataToUpdate = { ...data, trackerCompletenessPercentage: percentage };

    const { set, keys, values } = getUpdateFields(dataToUpdate);

    const updatedItem = await updateItem<TrackerDB>(Tracker.getPK(trackerId), Tracker.getSK(trackerId), `SET ${set}`, keys, values);

    // console.log({ updatedItem });

    return Tracker.fromRawFields(updatedItem);
  }
}

export { Tracker, TrackerRows };

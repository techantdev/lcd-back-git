import { DatabaseEntity } from '../classes/classesIndex';
import { ACADEMICYEAR } from '../schemas/AcademicYearSchema';
import { TRACKER, TrackerDB, TrackerRaw, TrackerRows, trackerSchemaDB } from '../schemas/TrackerSchema';
import { YEARGRADE } from '../schemas/YearGradeSchema';
import { GSINames } from '../schemas/schemaUtils';
import { getItemsGSI, getUpdateFields, updateItem } from '../services/dynamoService';

class Tracker extends DatabaseEntity {
  private trackerId: string;
  private courseId: string;
  private trackerRows: TrackerRows;
  private trackerCompletenessPercentage: number;
  private catalogSubjectId: string;
  private catalogGradeId: string;
  private academicYearId: string;
  private yearGradeId: string;

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

  getGSI1PK() {
    return Tracker.getGSI1PK(this.academicYearId);
  }

  getGSI1SK() {
    return Tracker.getGSI1SK(this.yearGradeId);
  }

  initializeFields(fields: TrackerRaw) {
    this.trackerId = fields.trackerId;
    this.courseId = fields.courseId || '';
    this.trackerRows = fields.trackerRows;
    this.trackerCompletenessPercentage = fields.trackerCompletenessPercentage;
    this.catalogSubjectId = fields.catalogSubjectId;
    this.catalogGradeId = fields.catalogGradeId;
    this.academicYearId = fields.academicYearId;
    this.yearGradeId = fields.yearGradeId;
  }

  getRawItem() {
    return {
      trackerId: this.trackerId,
      courseId: this.courseId,
      trackerRows: this.trackerRows,
      trackerCompletenessPercentage: this.trackerCompletenessPercentage,
      catalogSubjectId: this.catalogSubjectId,
      catalogGradeId: this.catalogGradeId,
      academicYearId: this.academicYearId,
      yearGradeId: this.yearGradeId
    };
  }

  // STATIC

  public static getPK(trackerId: String) {
    return `${TRACKER}_${trackerId}`;
  }

  public static getSK(trackerId: String) {
    return `${TRACKER}_${trackerId}`;
  }

  public static getGSI1PK(academicYearId: string) {
    return `${ACADEMICYEAR}_${academicYearId}_${TRACKER}`;
  }

  public static getGSI1SK(yearGradeId: string) {
    return `${YEARGRADE}_${yearGradeId}`;
  }

  public static fromRawFields = (fields: TrackerDB) => {
    const instance = new Tracker();
    instance.initializeFields(fields);
    return instance.getRawItem();
  };

  public static async insertOne({
    courseId,
    trackerRows,
    trackerCompletenessPercentage,
    catalogSubjectId,
    catalogGradeId,
    academicYearId,
    yearGradeId
  }: TrackerRaw) {
    const instance = new Tracker();
    instance.initializeFields({
      trackerId: Tracker.generateId(),
      courseId: courseId || '',
      trackerRows: trackerRows || [],
      trackerCompletenessPercentage: trackerCompletenessPercentage,
      catalogSubjectId,
      catalogGradeId,
      academicYearId,
      yearGradeId
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

  public static async getTrackers(academicYearId: string, yearGradeId: string) {
    const items = await getItemsGSI<TrackerDB>(GSINames.GSI1, {
      KeyConditionExpression: '#GSI1PK = :GSI1PK AND begins_with(#GSI1SK,:GSI1SK)',
      ExpressionAttributeNames: { '#GSI1PK': 'GSI1PK', '#GSI1SK': 'GSI1SK' },
      ExpressionAttributeValues: {
        ':GSI1PK': Tracker.getGSI1PK(academicYearId || ''),
        ':GSI1SK': Tracker.getGSI1SK(yearGradeId || '')
      }
    });

    return items.map(Tracker.fromRawFields);
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

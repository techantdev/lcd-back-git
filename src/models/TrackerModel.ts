import { DatabaseEntity } from '../classes/classesIndex';
import trackerSchema, { TRACKER } from '../schemas/TrackerSchema';

class Tracker extends DatabaseEntity {
  trackerId: String;
  courseId: String;

  constructor(courseId: String) {
    super();
    this.trackerId = this.generateId();
    this.courseId = courseId;

    // Schema
    this.schema = trackerSchema;

    // Partition keys
    this.initializeKeys(this.getPK(this.trackerId), this.getSK(this.trackerId));
  }

  getPK(trackerId: String) {
    return `${TRACKER}_${trackerId}`;
  }

  getSK(trackerId: String) {
    return `${TRACKER}_${trackerId}`;
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
}

export { Tracker };

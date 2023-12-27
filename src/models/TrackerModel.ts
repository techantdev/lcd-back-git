import { DatabaseEntity } from '../classes/classesIndex';

class Tracker extends DatabaseEntity {
  trackerId: String;
  courseId: String;

  constructor(courseId: String) {
    super();
    this.trackerId = this.generateId();
    this.courseId = courseId;
    this.initializeKeys(this.getPK(this.trackerId), this.getSK(this.trackerId));
  }

  getPK(trackerId: String) {
    return `TRACKER_${trackerId}`;
  }

  getSK(trackerId: String) {
    return `TRACKER_${trackerId}`;
  }

  async save() {}

  toItem() {
    return {
      trackerId: this.trackerId,
      courseId: this.courseId
    };
  }
}

export { Tracker };

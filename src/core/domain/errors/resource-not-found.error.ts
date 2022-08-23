export class ResourceNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'Resource Not Found';
    }
  }
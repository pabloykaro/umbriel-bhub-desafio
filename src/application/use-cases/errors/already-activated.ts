export class AlreadyActivated extends Error {
  constructor(message: string) {
    super(message);
  }
}

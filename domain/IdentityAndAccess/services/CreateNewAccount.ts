export class CreateNewAccount {
  private readonly data;
  private readonly repository;
  constructor(data, repository) {
    this.data = data;
    this.repository = repository;
  }
}

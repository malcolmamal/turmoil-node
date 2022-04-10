export abstract class BaseEntity {
  /**
   * @return a short string, identifying the object internally
   */
  toString(): string {
    return `${this.constructor.name}#${(this as any).id ?? '--'}`;
  }

  copy(updates: Partial<this> = {}): this {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return Object.assign(new (this.constructor as any)(), {
      ...this,
      ...updates,
    });
  }
}

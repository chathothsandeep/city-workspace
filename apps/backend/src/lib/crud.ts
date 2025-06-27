export interface CrudService<T> {
  create(data: any, file?: any): Promise<T | null>;
  findAll(params: { [key: string]: any }): Promise<T[]>;
  find(id: number): Promise<T | null>;
  update(id: number, data: any, file?: any): Promise<T | null>;
  delete(id: number): Promise<T | null>;
}

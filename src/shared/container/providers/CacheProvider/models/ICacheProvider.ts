export default interface ICacheProvider {
  save(key: string, value: unknown): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidateByPrefix(prefix: string): Promise<void>;
}

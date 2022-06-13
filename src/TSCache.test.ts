import TSCache from './TSCache';

describe("TSCache", () => {
  let cache: TSCache;
  beforeEach(() => {
    cache = new TSCache();
  });

  describe("basic", () => {
    it("set and get", () => {
      cache.set("a", 1);
      cache.set("b", 2);
      expect(cache.get("a")).toBe(1);
      expect(cache.get("b")).toBe(2);
      expect(cache.get("c")).toBe(null);

      cache.set("a", 3);
      expect(cache.get("a")).toBe(3);
    });

    it("set and unset", () => {
      cache.set("a", 1);
      expect(cache.get("a")).toBe(1);
      cache.unset("a");
      expect(cache.get("a")).toBe(null);
    });

    it("numequalto", () => {
      expect(cache.numequalto(9)).toBe(0);
      cache.set("a", 1);
      expect(cache.numequalto(1)).toBe(1);
      cache.set("b", 1);
      expect(cache.numequalto(1)).toBe(2);
    });
  });

  describe("transactions", () => {
    it("commit works", () => {
      cache.begin()

      cache.set('a', 30)
      expect(cache.get("a")).toBe(30);

      cache.begin()
      cache.set('a', 40)
      expect(cache.get("a")).toBe(40);

      cache.commit()
      expect(cache.get("a")).toBe(40);

      expect(cache.rollback()).toBe(false);
    });

    it("rollback works", () => {
      cache.begin()

      cache.set('a', 10)
      expect(cache.get("a")).toBe(10);

      cache.begin()
      cache.set('a', 20)
      expect(cache.get("a")).toBe(20);

      cache.rollback()
      expect(cache.get("a")).toBe(10);

      cache.rollback()
      expect(cache.get("a")).toBe(null);
    });

    it("commit and rollback works", () => {
      cache.begin()

      cache.set('a', 10)
      expect(cache.get("a")).toBe(10);

      cache.begin()
      expect(cache.numequalto(10)).toBe(1);

      cache.begin()
      cache.unset('a')
      expect(cache.numequalto(10)).toBe(0);

      cache.rollback()
      expect(cache.numequalto(10)).toBe(1);

      cache.commit()
      expect(cache.numequalto(10)).toBe(1);
    });
  })
});

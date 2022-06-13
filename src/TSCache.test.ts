import TSCache from './TSCache';

describe('TSCache', () => {
    let cache: TSCache
    beforeEach(() => {
        cache = new TSCache()
    })

    it('set and get', () => {
        cache.set('a', 1)
        cache.set('b', 2)
        expect(cache.get('a')).toBe(1)
        expect(cache.get('b')).toBe(2)
        expect(cache.get('c')).toBe(null)

        cache.set('a', 3)
        expect(cache.get('a')).toBe(3)
    })

    it('set and unset', () => {
        cache.set('a', 1)
        expect(cache.get('a')).toBe(1)
        cache.unset('a')
        expect(cache.get('a')).toBe(null)
    })
    
    it('numequalto', () => {
        expect(cache.numequalto(9)).toBe(0)
        cache.set('a', 1)
        expect(cache.numequalto(1)).toBe(1)
        cache.set('b', 1)
        expect(cache.numequalto(1)).toBe(2)
    })
})
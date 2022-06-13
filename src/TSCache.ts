export default class TSCache {
    _memory: Array<Map<string, any>>

    constructor() {
        this._memory = [new Map<string, any>()]
    }

    get memory() {
        return this._memory[0]
    }

    set(name: string, value: any) {
        this.memory.set(name, value)
    }

    get(name: string): any {
        return this.memory.get(name) || null
    }

    unset(name: string) {
        this.set(name, null)
    }

    numequalto(value: any): number {
        return Array.from(this.memory.values())
            .filter(val => value === val)
            .length
    }

    begin() {
        this._memory = [new Map(this.memory), ...this._memory]
    }

    rollback() {
        if (this._memory.length === 1) {
            console.log('NO TRANSACTION')
            return false
        } else {
            const [cur, ...rest] = this._memory
            this._memory = rest
            return true
        }
    }

    commit() {
        if (this._memory.length === 1) {
            console.log('NO TRANSACTION')
            return false
        } else {
            this._memory = [this._memory[0]]
            return true
        }
    }
}
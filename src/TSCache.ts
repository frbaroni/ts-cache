export default class TSCache {
    _memory: Array<{
        data: Map<string, any>,
        valueKeys: Map<any, string[]>,
    }>

    constructor() {
        this._memory = [{
            data: new Map<string, any>(),
            valueKeys: new Map<any, string[]>(),
        }]
    }

    get memory() {
        return this._memory[0].data
    }

    get valueKeys() {
        return this._memory[0].valueKeys
    }

    set(name: string, value: any) {
        if (this.memory.has(name)) {
            const oldValue = this.memory.get(name)
            const keysMappingToOldValue = this.valueKeys.get(oldValue) || []
            this.valueKeys.set(oldValue, keysMappingToOldValue.filter(k => k !== name))
        }
        this.memory.set(name, value)
        this.valueKeys.set(value, [...(this.valueKeys.get(value) || []), name])
    }

    get(name: string): any {
        return this.memory.get(name) || null
    }

    unset(name: string) {
        this.set(name, null)
    }

    numequalto(value: any): number {
      return new Set(this.valueKeys.get(value)).size
    }

    begin() {
        this._memory = [{
            data: new Map(this.memory),
            valueKeys: new Map(this.valueKeys),
        }, ...this._memory]
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
export default class TSCache {
    memory: Map<string, any>

    constructor() {
        this.memory = new Map<string, any>()
    }

    set(name: string, value: any) {
        this.memory.set(name, value)
    }

    get(name: string): any {
        return this.memory.get(name)
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

    }

    rollback() {

    }

    commit() {

    }
}
class Store {

    public state: Map<string, any>;

    constructor() {
        this.state = new Map();
    }

    public setState(key: string, value: any) {
        this.state.set(key, value);
        this.state[key] = value;
    }

    public getState(key: string) {
        return (this.state.has(key)) ? this.state.get(key) : null;
    }
}

const store = new Store();

window['store'] = store;

export { store };
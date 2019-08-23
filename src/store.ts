type SubscriptionHandler = (value: string, key?: string) => void;

let subscriptions: Map<SubscriptionHandler, Set<string>> = new Map();

export function save(key: string, value: string): void {
    if (value) {
        localStorage.setItem(key, value);
    }
    else {
        localStorage.removeItem(key);
    }

    for (let [handler, keys] of subscriptions) {
        if (keys.has(key)) {
            handler(value, key);
        }
    }
}

export function load(key: string): string {
    return localStorage.getItem(key);
}

// todo: observe should return something "observable" instead of relying on the callback pattern.
export function observe(key: string, handler: SubscriptionHandler) {
    if (!subscriptions.has(handler)) {
        subscriptions.set(handler, new Set());
    }

    subscriptions.get(handler).add(key);
}
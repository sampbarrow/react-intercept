import { ComponentType } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

export function intercept<I extends {}, O extends {}>(mapper: (props: I) => ValueOrFactory<JSX.Element, [ComponentType<O>]>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            return callOrGet(mapper(props), component)
        }
    }
}
/*
export function pass<P extends {}>(mapper: (props: P) => ValueOrFactory<JSX.Element, [JSX.Element]>) {
    return (component: ComponentType<P>) => {
        return (props: P) => {
            return callOrGet(mapper(props), createElement(component, props))
        }
    }
}
export function transform<I extends {}, O extends {}>(mapper: (props: I) => O) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            return createElement(component, mapper(props))
        }
    }
}
export function discard() {
    return (component: ComponentType<{}>) => {
        return () => {
            return createElement(component)
        }
    }
}
*/
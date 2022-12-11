import { ComponentType, createElement } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

/**
 * Returns a function that is applied to the next component.
 */
export function intercept<I extends {}, O extends {}>(mapper: (props: I) => ValueOrFactory<JSX.Element, [ComponentType<O>]>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            return callOrGet(mapper(props), component)
        }
    }
}

/**
 * Transforms the incoming props and passes them to the next component.
 */
export function transform<I extends {}, O extends {}>(mapper: (props: I) => O) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            return createElement(component, mapper(props))
        }
    }
}

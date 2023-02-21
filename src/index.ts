import { ComponentType, createElement, Fragment, ReactNode } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

/**
 * Returns a function that is applied to the next component.
 */
export function intercept<I extends {}, O extends {}>(mapper: (props: I) => ValueOrFactory<ReactNode, [ComponentType<O>]>) {
    return (component: ComponentType<O>) => {
        return (props: I) => createElement(Fragment, { children: callOrGet(mapper(props), component) })
    }
}

/**
 * Transforms the incoming props and passes them to the next component.
 */
export function transform<I extends {}, O extends {}>(mapper: (props: I) => O) {
    return (component: ComponentType<O>) => {
        return (props: I) => createElement(component, mapper(props))
    }
}

type InterceptType<P> = {
    type: "element",
    element: ReactNode
} | {
    type: "transform",
    props: P
} | {
    type: "custom",
    function: (component: ComponentType<P>) => ReactNode
}

/**
 * Transforms the incoming props and passes them to the next component.
 */
export function multicept<I extends {}, O extends {}>(mapper: (props: I) => ValueOrFactory<InterceptType<O>, [ComponentType<O>]>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            const result = callOrGet(mapper(props), component)
            if (result.type === "element") {
                return createElement(Fragment, { children: result.element })
            }
            else if (result.type === "transform") {
                return createElement(component, result.props)
            }
            else {
                return createElement(Fragment, { children: result.function(component) })
            }
        }
    }
}

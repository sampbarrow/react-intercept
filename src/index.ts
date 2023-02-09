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

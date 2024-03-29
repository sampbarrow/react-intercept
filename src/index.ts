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

/**
 * Wraps the transformed component as a child of another.
 */
export function wrapped<I extends {}, W extends {}>(wrapper: ComponentType<W>, wrapperProps: ValueOrFactory<W, [I]>) {
    return (component: ComponentType<I>) => {
        return (props: I) => {
            return createElement(wrapper, {
                ...callOrGet(wrapperProps, props),
                children: createElement(component, props)
            })
        }
    }
}

type InterceptType<P extends {}> = {
    type: "replace"
    element: ValueOrFactory<ReactNode, [ComponentType<P>]>
} | {
    type: "transform"
    props: P
}

export function multicept<I extends {}, O extends {}>(mapper: (props: I) => InterceptType<O>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            const result = callOrGet(mapper(props), component)
            if (result.type === "replace") {
                return createElement(Fragment, { children: callOrGet(result.element, component) })
            }
            else {
                return createElement(component, result.props)
            }
        }
    }
}

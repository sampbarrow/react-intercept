import { ComponentType } from "react"
import { callOrGet, ValueOrFactory } from "value-or-factory"

export function intercept<I extends {}, O extends {}>(mapper: (props: I) => ValueOrFactory<JSX.Element, [ComponentType<O>]>) {
    return (component: ComponentType<O>) => {
        return (props: I) => {
            return callOrGet(mapper(props), component)
        }
    }
}
'use strict'
import React, { PureComponent } from 'react'
import RouteHelper from './RouteHelper'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const addToRouteStack = (OldComponent) => {

    class NewComponent extends PureComponent {
        
        static displayName = `addToRouteStack(${OldComponent.displayName ||
            OldComponent.name})`;

        componentDidMount() {
            console.log('componentDidMount')
            requestAnimationFrame(() => {
                console.log('componentDidMount--requestAnimationFrame')

            })
            InteractionManager.runAfterInteractions(() => {
                console.log('addToRouteStackcomponentDidMount--runAfterInteractions')
                RouteHelper.addStack(this.props.navigation);
                this.subscriptions = [
                    this.props.navigation.addListener('willBlur', (payload) => {
                        console.log('willBlur')
                        this.oldComponent && this.oldComponent.componentWillBlur && this.oldComponent.componentWillBlur(payload)
                    }),
                    this.props.navigation.addListener('willFocus', (payload) => {
                        this.oldComponent && this.oldComponent.componentWillFocus && this.oldComponent.componentWillFocus(payload)
                    }),
                    this.props.navigation.addListener('didFocus', (payload) => {
                        this.oldComponent && this.oldComponent.componentDidFocus && this.oldComponent.componentDidFocus(payload)
                    }),
                    this.props.navigation.addListener('didBlur', (payload) => {
                        console.log('didBlur')
                        console.log(this.props.navigation)
                        this.oldComponent && this.oldComponent.componentDidBlur && this.oldComponent.componentDidBlur(payload)
                    }),
                ]
            })
        }

        componentWillUnmount() {
            // console.log('componentWillUnmount', this)
            // 
            requestAnimationFrame(() => {
                this.subscriptions.forEach(sub => sub.remove());
                RouteHelper.remove(this.props.navigation);
            })
            // requestAnimationFrame(() => {
            //     console.log('componentWillUnmount--requestAnimationFrame', this)

            // })
            // InteractionManager.runAfterInteractions(() => {
            //     console.log('componentWillUnmount--runAfterInteractions', this)
            // })
        }

        render() {
            return (
                <OldComponent
                    ref={v => this.oldComponent = v}
                    {...this.props}
                // {...this.props.navigation.state.params}
                />
            )
        }
    }

    return hoistNonReactStatics(NewComponent, OldComponent)
};

export const configRoute = (routeConfig) => {
    for (let name in routeConfig) {
        let Component = routeConfig[name].screen;
        routeConfig[name].screen = addToRouteStack(Component)
    }
    return routeConfig
}
import React, { Component, isValidElement } from 'react'

class VariantComponent extends Component {
  render () {
    if (isValidElement(this.props.children)) {
      return this.props.children
    } else {
      const props = {children: this.props.children}
      return <span {...props} />
    }
  }
}

VariantComponent.displayName = 'VariantComponent'

export default VariantComponent

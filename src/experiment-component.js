import React, { Component, isValidElement } from 'react'
import { path, pathOr } from 'ramda'

class ExperimentComponent extends Component {
  constructor (props) {
    super(props)

    this.state = {
      nodes: [],
      variantsGroups: [],
      default: undefined,
      first: undefined
    }
  }

  componentWillMount () { /* initializeChildren */
    const nodes = []
    const allVariants = []
    const variantsGroups = []
    let children = pathOr([], ['props', 'children'], this)
    children = isValidElement(children)
      ? [ children ]
      : children

    children
      .forEach(
        (child, key) => {
          if (path(['type', 'displayName'], child) === 'VariantComponent') {
            allVariants[key] = child
          } else {
            nodes[key] = child
          }
        })

    let first, defaultElm
    allVariants
      .forEach(
        (child, key) => {
          const name = path(['props', 'name'], child)
          const defaultProps = path(['props', 'default'], child)

          if (!variantsGroups[name]) {
            variantsGroups[name] = []
          }
          variantsGroups[name][key] = child

          if (!first && name) {
            first = name
          }
          if (!defaultElm && defaultProps) {
            defaultElm = name
          }
        })

    this.setState({
      nodes,
      variantsGroups,
      default: defaultElm,
      first
    })
  }

  filterVariants () {
    let mode = pathOr('DEFAULT', [this.props.name], this.props.abTest)
    let variantName, variants = []
    if (mode !== 'DEFAULT') {
      variantName = mode
    } else {
      mode = this.state.defaultElm ? 'DEFAULT' : 'FIRST'
      variantName = this.state.defaultElm ? this.state.defaultElm : this.state.first
    }
    variants = pathOr([], [variantName], this.state.variantsGroups)

    const children = []
    this.state.nodes
      .forEach(
        (child, key) => children[key] = child)
    variants
      .forEach(
        (child, key) => children[key] = child)

    return {
      mode,
      variantName,
      children
    }
  }

  render () {
    const { mode, variantName, children } = this.filterVariants()
    const name = mode === 'DEFAULT' || mode === 'FIRST'
      ? `${this.props.name}:${variantName}[${mode}]`
      : `${this.props.name}:${variantName}`
    return (
      <span name={name} className={this.props.className}>
        { children }
      </span>
    )
  }
}

export default ExperimentComponent

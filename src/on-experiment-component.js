import React, { Component } from 'react'
import ExperimentComponent from './experiment-component'
import VariantComponent from './variant-component'

class OnExperimentComponent extends Component {
  render () {
    return (
      <ExperimentComponent {...this.props}>
        <VariantComponent name={this.props.var}>
          { this.props.children }
        </VariantComponent>
      </ExperimentComponent>
    )
  }
}

export default OnExperimentComponent

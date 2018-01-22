# SIMPLE AND FAST AB TEST REACT COMPONENT
Simple and fast Ab Test React component

## INIT
```javascript
import {
  Variant,
  Experiment as ExperimentComponent,
  OnExperiment as OnExperimentComponent
} from 'fast-ab-test'
import { pathOr } from 'ramda'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ abTest: pathOr({}, ['abTest'], state) })

Experiment = connect(mapStateToProps)(ExperimentComponent)
OnExperiment = connect(mapStateToProps)(OnExperimentComponent)
```

## USE
```javascript
<OnExperiment name='buy' var='A'>
  OnExperiment
</OnExperiment>

/* Case abTest: { ... buy: 'A', ... } */
/* Result */
  <span name='buy:A'>
    <span>
      OnExperiment
    </span>
  </span>
/* Result */

<Experiment name='buy'>
  x1
  <Variant name='A'>
    out
  </Variant>
  <b> x2 </b>
  <Variant name='B'>
    OnExperiment
  </Variant>
  x3
</Experiment>

/* Case abTest: { ... buy: 'B', ... } */
/* Result */
  <span name='buy:A'>
    x1
    <b> x2 </b>
    <span>
      OnExperiment
    </span>
    x3
  </span>
/* Result */
```

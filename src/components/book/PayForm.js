import React from 'react'

const PayForm = ({show}) => {
  console.log(show)
  const componentClasses = ['pay-form']
  if (show) { componentClasses.push('show')}
  return (
    <div className={componentClasses.join(' ')}>
      <div>
        Make it Happen!
      </div>
    </div>
  )
}

export default PayForm;
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import Avatar from './avatar'
import { Bell, Check, X, AlertTriangle, Info } from 'react-feather'
//import { Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap'

const PrimaryToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='primary' icon={<Bell size={12} />} />
        <h6 className='toast-title'>Default!</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
      {props.message}
      </span>
    </div>
  </Fragment>
)

const SuccessToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success!</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
        {props.message}
      </span>
    </div>
  </Fragment>
)

const ErrorToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='danger' icon={<X size={12} />} />
        <h6 className='toast-title'>Error!</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
      {props.message}
      </span>
    </div>
  </Fragment>
)

const WarningToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<AlertTriangle size={12} />} />
        <h6 className='toast-title'>Warning!</h6>
      </div>
      <small className='text-muted'>11 Min Ago</small>
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
      {props.message}
      </span>
    </div>
  </Fragment>
)

const InfoToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='info' icon={<Info size={12} />} />
        <h6 className='toast-title'>Info!</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
      {props.message}
      </span>
    </div>
  </Fragment>
)

const SuccessProgressToast = (props) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title'>Success</h6>
      </div>
      {/* <small className='text-muted'>11 Min Ago</small> */}
    </div>
    <div className='toastify-body'>
      <span role='img' aria-label='toast-text'>
       {props.message}
      </span>
    </div>
  </Fragment>
)

export {
    SuccessProgressToast,
    SuccessToast,
    InfoToast,
    WarningToast,
    ErrorToast
}
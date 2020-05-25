import React from 'react'

type Props = {
  className?: string
  onClick: () => void
}

export class ClickOutside extends React.PureComponent<Props> {
  wrapperRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  handleClick = (event: MouseEvent) => {
    const { onClick } = this.props

    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target as Element)) {
      onClick()
    }
  }
  render() {
    const { children, className } = this.props

    return (
      <div ref={this.wrapperRef} className={className}>
        {children}
      </div>
    )
  }
}
